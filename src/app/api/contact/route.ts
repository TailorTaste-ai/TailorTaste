import { NextResponse } from "next/server";
import { isIP } from "node:net";
import { sendContactInquiry } from "@/lib/contact-delivery";
import { resetRateLimitForTests, takeRateLimitSlot } from "@/lib/rate-limit";
import {
  hasContactFormErrors,
  normalizeContactFormValues,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/validation";

type ContactApiErrorCode =
  | "invalid_json"
  | "invalid_request"
  | "payload_too_large"
  | "unsupported_media_type"
  | "validation_failed"
  | "spam_detected"
  | "rate_limited"
  | "delivery_unavailable"
  | "delivery_failed";

type ContactApiErrorResponse = {
  ok: false;
  error: ContactApiErrorCode;
  message: string;
  fieldErrors?: Record<string, string>;
};

type ContactApiSuccessResponse = {
  ok: true;
  message: string;
};

export const runtime = "nodejs";

const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 5;
const CONTACT_MIN_SUBMIT_DURATION_MS = 2_000;
const CONTACT_MAX_BODY_BYTES = 16 * 1024;
const MAX_PROXY_HEADER_BYTES = 512;

type ParsedContactBody = {
  values: ContactFormValues;
  companyWebsite: string;
  startedAt: number | null;
};

function toStringField(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toNumberField(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function parseBody(value: unknown): ParsedContactBody {
  if (!value || typeof value !== "object") {
    return {
      values: {
        name: "",
        email: "",
        organization: "",
        inquiryType: "",
        message: "",
      },
      companyWebsite: "",
      startedAt: null,
    };
  }

  const body = value as Record<string, unknown>;
  return {
    values: {
      name: toStringField(body.name),
      email: toStringField(body.email),
      organization: toStringField(body.organization),
      inquiryType: toStringField(body.inquiryType),
      message: toStringField(body.message),
    },
    companyWebsite: toStringField(body.companyWebsite),
    startedAt: toNumberField(body.startedAt),
  };
}

function parseBoolean(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no"].includes(normalized)) {
    return false;
  }

  return undefined;
}

function shouldTrustProxyHeaders() {
  const override = parseBoolean(process.env.TRUST_PROXY_HEADERS);
  if (typeof override === "boolean") {
    return override;
  }

  return process.env.VERCEL === "1" || process.env.NODE_ENV !== "production";
}

function getBoundedHeader(headers: Headers, name: string) {
  const value = headers.get(name)?.trim();
  if (!value || new TextEncoder().encode(value).byteLength > MAX_PROXY_HEADER_BYTES) {
    return null;
  }

  return value;
}

function firstValidIp(value: string) {
  for (const candidate of value.split(",").slice(0, 8)) {
    const ip = candidate.trim();
    if (isIP(ip)) {
      return ip;
    }
  }

  return null;
}

function getClientIp(request: Request) {
  if (!shouldTrustProxyHeaders()) {
    return "unknown";
  }

  const forwardedFor = getBoundedHeader(request.headers, "x-forwarded-for");
  if (forwardedFor) {
    const ip = firstValidIp(forwardedFor);
    if (ip) {
      return ip;
    }
  }

  const realIp = getBoundedHeader(request.headers, "x-real-ip");
  return realIp && isIP(realIp) ? realIp : "unknown";
}

function isLikelyBotSubmission(companyWebsite: string, startedAt: number | null, now = Date.now()) {
  if (companyWebsite.trim()) {
    return true;
  }

  if (startedAt === null || startedAt > now) {
    return true;
  }

  return now - startedAt < CONTACT_MIN_SUBMIT_DURATION_MS;
}

export function resetContactRateLimitForTests() {
  resetRateLimitForTests();
}

function isJsonContentType(request: Request) {
  return request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() === "application/json";
}

function hasOversizedContentLength(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) {
    return false;
  }

  const size = Number(contentLength);
  return Number.isFinite(size) && size > CONTACT_MAX_BODY_BYTES;
}

function getFirstHeaderValue(request: Request, name: string) {
  return getBoundedHeader(request.headers, name)?.split(",")[0]?.trim() || null;
}

function addOriginCandidate(candidates: Set<string>, protocol: string, host: string | null) {
  if (!host) {
    return;
  }

  try {
    candidates.add(new URL(`${protocol}://${host}`).origin);
  } catch {
    // Ignore malformed proxy metadata.
  }
}

function getRequestOriginCandidates(request: Request) {
  const requestUrl = new URL(request.url);
  const candidates = new Set([requestUrl.origin]);
  const trustProxyHeaders = shouldTrustProxyHeaders();
  const forwardedProto = trustProxyHeaders ? getFirstHeaderValue(request, "x-forwarded-proto") : null;
  const protocol = forwardedProto === "http" || forwardedProto === "https" ? forwardedProto : requestUrl.protocol.slice(0, -1);

  addOriginCandidate(candidates, protocol, getFirstHeaderValue(request, "host"));
  if (trustProxyHeaders) {
    addOriginCandidate(candidates, protocol, getFirstHeaderValue(request, "x-forwarded-host"));
  }

  return candidates;
}

function isAllowedBrowserOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (!getRequestOriginCandidates(request).has(new URL(origin).origin)) {
        return false;
      }
    } catch {
      return false;
    }
  }

  const fetchSite = request.headers.get("sec-fetch-site")?.trim().toLowerCase();
  if (!fetchSite) {
    return true;
  }

  return fetchSite === "same-origin" || fetchSite === "same-site" || fetchSite === "none";
}

async function readBodyWithLimit(request: Request) {
  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = "";
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      totalBytes += value.byteLength;
      if (totalBytes > CONTACT_MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return null;
      }

      body += decoder.decode(value, { stream: true });
    }

    return body + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

function jsonError(error: ContactApiErrorCode, message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json<ContactApiErrorResponse>(
    {
      ok: false,
      error,
      message,
    },
    { status, headers },
  );
}

export async function POST(request: Request) {
  if (!isJsonContentType(request)) {
    return jsonError("unsupported_media_type", "Request body must be application/json.", 415);
  }

  if (!isAllowedBrowserOrigin(request)) {
    return jsonError("invalid_request", "Request origin is not allowed.", 403);
  }

  if (hasOversizedContentLength(request)) {
    return jsonError("payload_too_large", "Request body is too large.", 413);
  }

  const rateLimit = await takeRateLimitSlot(
    `contact:${getClientIp(request)}`,
    CONTACT_RATE_LIMIT_MAX_REQUESTS,
    CONTACT_RATE_LIMIT_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json<ContactApiErrorResponse>(
      {
        ok: false,
        error: "rate_limited",
        message:
          rateLimit.store === "memory_degraded"
            ? "Contact submissions are busier than usual. Please wait a few minutes and try again."
            : "Too many inquiries were submitted from this connection. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  let json: unknown;

  try {
    const body = await readBodyWithLimit(request);
    if (body === null) {
      return jsonError("payload_too_large", "Request body is too large.", 413);
    }

    json = JSON.parse(body);
  } catch {
    return jsonError("invalid_json", "Request body must be valid JSON.", 400);
  }

  const { values: rawValues, companyWebsite, startedAt } = parseBody(json);
  const values = normalizeContactFormValues(rawValues);
  const validationErrors = validateContactForm(values);

  if (hasContactFormErrors(validationErrors)) {
    return NextResponse.json<ContactApiErrorResponse>(
      {
        ok: false,
        error: "validation_failed",
        message: "Please fix the highlighted fields and try again.",
        fieldErrors: validationErrors,
      },
      { status: 422 },
    );
  }

  if (isLikelyBotSubmission(companyWebsite, startedAt)) {
    return NextResponse.json<ContactApiErrorResponse>(
      {
        ok: false,
        error: "spam_detected",
        message: "We could not submit your inquiry right now. Please try again in a moment.",
      },
      { status: 400 },
    );
  }

  const deliveryResult = await sendContactInquiry(values);

  if (!deliveryResult.ok) {
    const status = deliveryResult.reason === "config" ? 503 : 502;
    const errorCode: ContactApiErrorCode = deliveryResult.reason === "config" ? "delivery_unavailable" : "delivery_failed";

    return NextResponse.json<ContactApiErrorResponse>(
      {
        ok: false,
        error: errorCode,
        message:
          deliveryResult.reason === "config"
            ? "Contact delivery is not configured yet. Please try again soon."
            : "We could not deliver this inquiry right now. Please try again in a moment.",
      },
      { status },
    );
  }

  return NextResponse.json<ContactApiSuccessResponse>({
    ok: true,
    message: "Thanks. Your inquiry has been sent and the team will follow up.",
  });
}
