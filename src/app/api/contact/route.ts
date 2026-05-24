import { NextResponse } from "next/server";
import { sendContactInquiry } from "@/lib/contact-delivery";
import { resetRateLimitForTests, takeRateLimitSlot } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";
import {
  hasContactFormErrors,
  normalizeContactFormValues,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/validation";

type ContactApiErrorCode =
  | "invalid_json"
  | "payload_too_large"
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

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
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

export async function POST(request: Request) {
  let json: unknown;

  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > CONTACT_MAX_BODY_BYTES) {
      return NextResponse.json<ContactApiErrorResponse>(
        {
          ok: false,
          error: "payload_too_large",
          message: "Request body is too large.",
        },
        { status: 413 },
      );
    }

    json = JSON.parse(body);
  } catch {
    return NextResponse.json<ContactApiErrorResponse>(
      {
        ok: false,
        error: "invalid_json",
        message: "Request body must be valid JSON.",
      },
      { status: 400 },
    );
  }

  const { values: rawValues, companyWebsite, startedAt } = parseBody(json);
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
        message: "Too many inquiries were submitted from this connection. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

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
            ? `Contact delivery is not configured yet. Please try again soon or email ${siteConfig.contactEmail} directly.`
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
