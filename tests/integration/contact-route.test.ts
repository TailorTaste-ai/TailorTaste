// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";
import { POST, resetContactRateLimitForTests } from "@/app/api/contact/route";
import { sendContactInquiry } from "@/lib/contact-delivery";

vi.mock("@/lib/contact-delivery", () => ({
  sendContactInquiry: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
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

  it("rejects oversized payloads before parsing form fields", async () => {
    const request = createRequest({
      ...validPayload,
      message: "x".repeat(20_000),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(413);
    expect(body).toMatchObject({ ok: false, error: "payload_too_large" });
    expect(sendContactInquiry).not.toHaveBeenCalled();
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

  it("uses Redis rate limiting when Upstash REST config is available", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "secret-token");
    vi.mocked(sendContactInquiry).mockResolvedValue({
      ok: true,
      provider: "resend",
      messageId: "msg_123",
    });

    let count = 0;
    const fetchMock = vi.fn(async () => {
      count += 1;
      return Response.json({ result: [count, 15 * 60 * 1000] });
    });
    vi.stubGlobal("fetch", fetchMock);

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(
        createRequest(validPayload, {
          "x-forwarded-for": "203.0.113.10",
        }),
      );

      expect(response.status).toBe(200);
    }

    const response = await POST(
      createRequest(validPayload, {
        "x-forwarded-for": "203.0.113.10",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body).toMatchObject({ ok: false, error: "rate_limited" });
    expect(fetchMock).toHaveBeenCalledTimes(6);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://redis.example.com",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer secret-token",
        }),
      }),
    );
  });

  it("falls back to memory rate limiting if Redis is unavailable", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "secret-token");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ error: "temporarily unavailable" }, { status: 503 })),
    );
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.mocked(sendContactInquiry).mockResolvedValue({
      ok: true,
      provider: "resend",
      messageId: "msg_123",
    });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(
        createRequest(validPayload, {
          "x-forwarded-for": "203.0.113.11",
        }),
      );

      expect(response.status).toBe(200);
    }

    const response = await POST(
      createRequest(validPayload, {
        "x-forwarded-for": "203.0.113.11",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body).toMatchObject({ ok: false, error: "rate_limited" });
  });
});
