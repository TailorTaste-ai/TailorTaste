import { NextResponse } from "next/server";
import { sendContactInquiry } from "@/lib/contact-delivery";
import {
  hasContactFormErrors,
  normalizeContactFormValues,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/validation";

type ContactApiErrorCode = "invalid_json" | "validation_failed" | "delivery_unavailable" | "delivery_failed";

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

function toStringField(value: unknown) {
  return typeof value === "string" ? value : "";
}

function parseBody(value: unknown): ContactFormValues {
  if (!value || typeof value !== "object") {
    return {
      name: "",
      email: "",
      organization: "",
      inquiryType: "",
      message: "",
    };
  }

  const body = value as Record<string, unknown>;
  return {
    name: toStringField(body.name),
    email: toStringField(body.email),
    organization: toStringField(body.organization),
    inquiryType: toStringField(body.inquiryType),
    message: toStringField(body.message),
  };
}

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
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

  const values = normalizeContactFormValues(parseBody(json));
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
            ? "Contact delivery is not configured yet. Please try again soon or email the team directly."
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
