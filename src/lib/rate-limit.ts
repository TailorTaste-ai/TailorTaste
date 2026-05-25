import "server-only";

import { createHash, createHmac } from "node:crypto";

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  store: "memory" | "memory_degraded" | "redis";
};

type RedisConfig = {
  token: string;
  url: string;
};

const redisRateLimitScript = `
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("PTTL", KEYS[1])
return { current, ttl }
`;

const memoryStore = new Map<string, { count: number; resetAt: number }>();
let hasWarnedRedisFallback = false;
const REDIS_TIMEOUT_MS = 4_000;
const MAX_MEMORY_STORE_ENTRIES = 1_000;
const DEGRADED_GLOBAL_LIMIT_MULTIPLIER = 10;

function getRedisConfig(): RedisConfig | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim() || process.env.KV_REST_API_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || process.env.KV_REST_API_TOKEN?.trim();

  if (!url || !token) {
    return null;
  }

  return {
    token,
    url: url.replace(/\/+$/, ""),
  };
}

function takeMemorySlot(key: string, limit: number, windowMs: number, now = Date.now()): RateLimitResult {
  const current = memoryStore.get(key);

  if (!current || current.resetAt <= now) {
    pruneMemoryStore(now);
    memoryStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, retryAfterSeconds: 0, store: "memory" };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
      store: "memory",
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0, store: "memory" };
}

function pruneMemoryStore(now = Date.now()) {
  for (const [key, value] of memoryStore) {
    if (value.resetAt <= now) {
      memoryStore.delete(key);
    }
  }

  while (memoryStore.size >= MAX_MEMORY_STORE_ENTRIES) {
    const oldestKey = memoryStore.keys().next().value as string | undefined;
    if (!oldestKey) {
      break;
    }
    memoryStore.delete(oldestKey);
  }
}

function asDegradedResult(result: RateLimitResult): RateLimitResult {
  return {
    ...result,
    store: "memory_degraded",
  };
}

function takeDegradedMemorySlot(storageKey: string, limit: number, windowMs: number): RateLimitResult {
  const perKeyResult = takeMemorySlot(storageKey, limit, windowMs);
  if (!perKeyResult.allowed) {
    return asDegradedResult(perKeyResult);
  }

  const globalLimit = limit * DEGRADED_GLOBAL_LIMIT_MULTIPLIER;
  const globalResult = takeMemorySlot(getRateLimitKeyDigest("contact:degraded:global"), globalLimit, windowMs);
  if (!globalResult.allowed) {
    return asDegradedResult(globalResult);
  }

  return asDegradedResult(perKeyResult);
}

function getRateLimitKeyDigest(key: string) {
  const secret = process.env.RATE_LIMIT_KEY_SECRET?.trim();
  const digest = secret
    ? createHmac("sha256", secret).update(key).digest("base64url")
    : createHash("sha256").update(key).digest("base64url");

  return `rl:v1:${digest}`;
}

function parseRedisResult(result: unknown): [number, number] | null {
  if (!Array.isArray(result) || result.length < 2) {
    return null;
  }

  const count = Number(result[0]);
  const ttlMs = Number(result[1]);

  if (!Number.isFinite(count) || !Number.isFinite(ttlMs)) {
    return null;
  }

  return [count, ttlMs];
}

async function takeRedisSlot(key: string, limit: number, windowMs: number, config: RedisConfig): Promise<RateLimitResult> {
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["EVAL", redisRateLimitScript, "1", key, String(windowMs)]),
    cache: "no-store",
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Redis rate limit request failed with ${response.status}.`);
  }

  const payload = (await response.json()) as { result?: unknown; error?: string };
  if (payload.error) {
    throw new Error(payload.error);
  }

  const parsed = parseRedisResult(payload.result);
  if (!parsed) {
    throw new Error("Redis rate limit response was malformed.");
  }

  const [count, ttlMs] = parsed;
  if (count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(ttlMs / 1000)),
      store: "redis",
    };
  }

  return { allowed: true, retryAfterSeconds: 0, store: "redis" };
}

export async function takeRateLimitSlot(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const config = getRedisConfig();
  const storageKey = getRateLimitKeyDigest(key);

  if (config) {
    try {
      return await takeRedisSlot(storageKey, limit, windowMs, config);
    } catch (error) {
      if (!hasWarnedRedisFallback) {
        hasWarnedRedisFallback = true;
        console.warn(
          `[tailor-taste] Redis rate limiting failed; using degraded in-memory limits. ${
            error instanceof Error ? error.message : "Unknown error."
          }`,
        );
      }
      return takeDegradedMemorySlot(storageKey, limit, windowMs);
    }
  }

  return takeMemorySlot(storageKey, limit, windowMs);
}

export function resetRateLimitForTests() {
  memoryStore.clear();
  hasWarnedRedisFallback = false;
}
