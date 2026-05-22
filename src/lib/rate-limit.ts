export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  store: "memory" | "redis";
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

  if (config) {
    try {
      return await takeRedisSlot(key, limit, windowMs, config);
    } catch (error) {
      if (!hasWarnedRedisFallback) {
        hasWarnedRedisFallback = true;
        console.warn(
          `[tailor-taste] Redis rate limiting failed; falling back to in-memory limits. ${
            error instanceof Error ? error.message : "Unknown error."
          }`,
        );
      }
    }
  }

  return takeMemorySlot(key, limit, windowMs);
}

export function resetRateLimitForTests() {
  memoryStore.clear();
  hasWarnedRedisFallback = false;
}
