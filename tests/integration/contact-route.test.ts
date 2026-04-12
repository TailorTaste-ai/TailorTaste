// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { sendContactInquiry } from "@/lib/contact-delivery";

vi.mock("@/lib/contact-delivery", () => ({
  sendContactInquiry: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

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
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

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

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ty",
        email: "ty@tailortaste.com",
        organization: "Tailor Taste",
        inquiryType: "Pilot venue / hotel",
        message: "Ready to pilot",
      }),
    });

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

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ty",
        email: "ty@tailortaste.com",
        organization: "Tailor Taste",
        inquiryType: "Pilot venue / hotel",
        message: "Ready to pilot",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ ok: true });
  });
});
