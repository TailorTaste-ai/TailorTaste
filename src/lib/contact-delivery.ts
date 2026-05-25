import type { ContactFormValues } from "@/lib/validation";
import { getContactEnvStatus, warnIfContactEnvMissing } from "@/lib/env";

export type ContactDeliveryConfigError = {
  ok: false;
  reason: "config";
  message: string;
};

export type ContactDeliveryProviderError = {
  ok: false;
  reason: "provider" | "network";
  message: string;
};

export type ContactDeliverySuccess = {
  ok: true;
  provider: "resend";
  messageId?: string;
};

export type ContactDeliveryResult =
  | ContactDeliveryConfigError
  | ContactDeliveryProviderError
  | ContactDeliverySuccess;

type ContactDeliveryConfig = {
  apiKey: string;
  from: string;
  to: string[];
  subjectPrefix: string;
};

function sanitizeHeaderValue(input: string) {
  return input.replace(/[\r\n]+/g, " ").trim();
}

export function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseRecipients(value: string | undefined): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

function getResendConfig(): ContactDeliveryConfig | ContactDeliveryConfigError {
  warnIfContactEnvMissing();
  const envStatus = getContactEnvStatus();

  if (!envStatus.configured) {
    return {
      ok: false,
      reason: "config",
      message: `Missing ${envStatus.missingVars.join(", ")}.`,
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = parseRecipients(process.env.CONTACT_TO_EMAILS);
  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX?.trim() || "TailorTaste Inquiry";

  if (!from || !to.length) {
    return {
      ok: false,
      reason: "config",
      message: "Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAILS.",
    };
  }

  return {
    apiKey: apiKey as string,
    from,
    to,
    subjectPrefix,
  };
}

function buildPlainText(values: ContactFormValues) {
  return [
    "TailorTaste contact inquiry",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organization: ${values.organization}`,
    `Inquiry type: ${values.inquiryType}`,
    "",
    "Message:",
    values.message,
  ].join("\n");
}

export function buildHtml(values: ContactFormValues) {
  const rows = [
    ["Name", values.name],
    ["Email", values.email],
    ["Organization", values.organization],
    ["Inquiry type", values.inquiryType],
  ];

  const metadata = rows
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 0;font-weight:600">${key}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const message = escapeHtml(values.message);

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111827">
      <h2 style="margin:0 0 12px">TailorTaste contact inquiry</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">${metadata}</table>
      <h3 style="margin:0 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${message}</p>
    </div>
  `;
}

export function buildConfirmationPlainText(values: Pick<ContactFormValues, "name">) {
  return [
    `Dear ${values.name},`,
    "",
    "Thank you for contacting TailorTaste.",
    "",
    "We have received your inquiry and will review it shortly.",
    "",
    "Best regards,",
    "Ty Stevens",
    "TailorTaste",
  ].join("\n");
}

export function buildConfirmationHtml(values: Pick<ContactFormValues, "name">) {
  const name = escapeHtml(values.name);

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#141715;max-width:560px;margin:0 auto;padding:24px">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a6f3d">
        TailorTaste
      </p>
      <h2 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:#141715">Thank you for contacting us</h2>
      <p style="margin:0 0 14px;color:#3c443d">
        Dear ${name},
      </p>
      <p style="margin:0 0 14px;color:#3c443d">
        We have received your inquiry and will review it shortly.
      </p>
      <p style="margin:0;font-size:13px;color:#3c443d">
        Best regards,<br/>Ty Stevens<br/>TailorTaste
      </p>
    </div>
  `;
}

export function buildInquirySubject(subjectPrefix: string, inquiryType: string) {
  return `${sanitizeHeaderValue(subjectPrefix)} | ${sanitizeHeaderValue(inquiryType)}`;
}

async function sendViaResend(
  config: ContactDeliveryConfig,
  to: string[],
  subject: string,
  text: string,
  html: string,
  replyTo?: string,
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const payload: Record<string, unknown> = {
    from: config.from,
    to,
    subject,
    text,
    html,
  };
  if (replyTo) {
    payload.reply_to = replyTo;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = (await response.text()).slice(0, 400);
    return { ok: false, error: `Resend request failed (${response.status}). ${errorText}` };
  }

  const result = (await response.json()) as { id?: string };
  return { ok: true, id: result.id };
}

export async function sendContactInquiry(values: ContactFormValues): Promise<ContactDeliveryResult> {
  const config = getResendConfig();
  if ("ok" in config) {
    return config;
  }

  const subject = buildInquirySubject(config.subjectPrefix, values.inquiryType);

  try {
    const mainResult = await sendViaResend(
      config,
      config.to,
      subject,
      buildPlainText(values),
      buildHtml(values),
      values.email,
    );

    if (!mainResult.ok) {
      return {
        ok: false,
        reason: "provider",
        message: mainResult.error ?? "Failed to deliver inquiry.",
      };
    }

    const confirmationResult = await sendViaResend(
      config,
      [values.email],
      "TailorTaste — We received your inquiry",
      buildConfirmationPlainText(values),
      buildConfirmationHtml(values),
    );

    if (!confirmationResult.ok) {
      console.warn(`[tailor-taste] Confirmation email failed: ${confirmationResult.error ?? "Unknown error."}`);
    }

    return {
      ok: true,
      provider: "resend",
      messageId: mainResult.id,
    };
  } catch (error) {
    return {
      ok: false,
      reason: "network",
      message: error instanceof Error ? error.message : "Unknown network error.",
    };
  }
}
