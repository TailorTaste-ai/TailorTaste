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
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Tailor Taste <onboarding@resend.dev>";
  const to = parseRecipients(process.env.CONTACT_TO_EMAILS);
  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX?.trim() || "Tailor Taste Inquiry";

  if (!to.length) {
    return {
      ok: false,
      reason: "config",
      message: "Missing CONTACT_TO_EMAILS.",
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
    "Tailor Taste contact inquiry",
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

function buildHtml(values: ContactFormValues) {
  const rows = [
    ["Name", values.name],
    ["Email", values.email],
    ["Organization", values.organization],
    ["Inquiry type", values.inquiryType],
  ];

  const metadata = rows
    .map(([key, value]) => `<tr><td style="padding:4px 0;font-weight:600">${key}</td><td style="padding:4px 0">${value}</td></tr>`)
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111827">
      <h2 style="margin:0 0 12px">Tailor Taste contact inquiry</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">${metadata}</table>
      <h3 style="margin:0 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${values.message}</p>
    </div>
  `;
}

export async function sendContactInquiry(values: ContactFormValues): Promise<ContactDeliveryResult> {
  const config = getResendConfig();
  if ("ok" in config) {
    return config;
  }

  const subject = `${config.subjectPrefix} | ${values.inquiryType}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject,
        text: buildPlainText(values),
        html: buildHtml(values),
        reply_to: values.email,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = (await response.text()).slice(0, 400);
      return {
        ok: false,
        reason: "provider",
        message: `Resend request failed (${response.status}). ${errorText}`,
      };
    }

    const payload = (await response.json()) as { id?: string };
    return {
      ok: true,
      provider: "resend",
      messageId: payload.id,
    };
  } catch (error) {
    return {
      ok: false,
      reason: "network",
      message: error instanceof Error ? error.message : "Unknown network error.",
    };
  }
}
