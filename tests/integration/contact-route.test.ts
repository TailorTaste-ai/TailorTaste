// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";
import { POST, resetContactRateLimitForTests } from "@/app/api/contact/route";
import { sendContactInquiry } from "@/lib/contact-delivery";

vi.mock("@/lib/contact-delivery", () => ({
  sendContactInquiry: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
  resetContactRateLimitForTests();
});

const validPayload = {
  name: "Ty",
  email: "ty@tailortaste.com",
  organization: "Tailor Taste",
  inquiryType: "Pilot venue / hotel",
  message: "Ready to pilot",
  companyWebsite: "",
  startedAt: Date.now() - 5_000,
};

function createRequest(body: Record<string, unknown>, headers?: HeadersInit) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("returns invalid_json for malformed payload", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toMatchObject({ ok: false, error: "invalid_json" });
  });

  it("returns validation_failed when required fields are missing", async () => {
    const request = createRequest({});

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body).toMatchObject({ ok: false, error: "validation_failed" });
    expect(body.fieldErrors).toBeDefined();
  });

  it("returns delivery_unavailable when provider is not configured", async () => {
    vi.mocked(sendContactInquiry).mockResolvedValue({
      ok: false,
      reason: "config",
      message: "missing",
    });

    const request = createRequest(validPayload);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toMatchObject({ ok: false, error: "delivery_unavailable" });
  });

  it("returns success when delivery succeeds", async () => {
    vi.mocked(sendContactInquiry).mockResolvedValue({
      ok: true,
      provider: "resend",
      messageId: "msg_123",
    });

    const request = createRequest(validPayload);

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ ok: true });
  });

  it("rejects inquiry types outside the allowlist", async () => {
    const request = createRequest({
      ...validPayload,
      inquiryType: "Definitely not allowed",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body).toMatchObject({ ok: false, error: "validation_failed" });
    expect(body.fieldErrors).toMatchObject({
      inquiryType: "Choose an inquiry type.",
    });
  });

  it("rejects honeypot submissions before delivery", async () => {
    const request = createRequest({
      ...validPayload,
      companyWebsite: "https://spam.example",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toMatchObject({ ok: false, error: "spam_detected" });
    expect(sendContactInquiry).not.toHaveBeenCalled();
  });

  it("rejects submissions that arrive too quickly", async () => {
    const request = createRequest({
      ...validPayload,
      startedAt: Date.now(),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toMatchObject({ ok: false, error: "spam_detected" });
    expect(sendContactInquiry).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions from the same IP", async () => {
    vi.mocked(sendContactInquiry).mockResolvedValue({
      ok: true,
      provider: "resend",
      messageId: "msg_123",
    });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(
        createRequest(validPayload, {
          "x-forwarded-for": "203.0.113.9",
        }),
      );

      expect(response.status).toBe(200);
    }

    const response = await POST(
      createRequest(validPayload, {
        "x-forwarded-for": "203.0.113.9",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBeTruthy();
    expect(body).toMatchObject({ ok: false, error: "rate_limited" });
  });
});
