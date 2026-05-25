import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildConfirmationHtml,
  buildConfirmationPlainText,
  buildHtml,
  buildInquirySubject,
  sendContactInquiry,
} from "@/lib/contact-delivery";

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("contact delivery builders", () => {
  it("escapes user-provided HTML in the internal inquiry email", () => {
    const html = buildHtml({
      name: "<b>Ty</b>",
      email: "guest@example.com",
      organization: "Tailor <script>alert(1)</script>",
      inquiryType: "Pilot venue / hotel",
      message: "<a href=\"https://phish.example\">Click me</a>",
    });

    expect(html).toContain("&lt;b&gt;Ty&lt;/b&gt;");
    expect(html).toContain("Tailor &lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("&lt;a href=&quot;https://phish.example&quot;&gt;Click me&lt;/a&gt;");
    expect(html).not.toContain("<script>alert(1)</script>");
  });

  it("keeps the confirmation email generic", () => {
    const values = { name: "Ty" };
    const plainText = buildConfirmationPlainText(values);
    const html = buildConfirmationHtml(values);

    expect(plainText).toContain("Dear Ty,");
    expect(plainText).toContain("Thank you for contacting TailorTaste.");
    expect(plainText).toContain("We have received your inquiry and will review it shortly.");
    expect(plainText).not.toContain("@tailortaste.ch");
    expect(plainText).not.toContain("Message:");
    expect(html).toContain("Dear Ty,");
    expect(html).toContain("Thank you for contacting us");
    expect(html).not.toContain("@tailortaste.ch");
    expect(html).not.toContain("Your inquiry");
  });

  it("escapes the recipient name in the confirmation email", () => {
    const html = buildConfirmationHtml({ name: "<b>Ty</b>" });

    expect(html).toContain("Dear &lt;b&gt;Ty&lt;/b&gt;,");
    expect(html).not.toContain("<b>Ty</b>");
  });

  it("removes header line breaks from the inquiry subject", () => {
    expect(buildInquirySubject("TailorTaste Inquiry\r\nBcc: hidden", "Pilot venue / hotel\nInjected"))
      .toBe("TailorTaste Inquiry Bcc: hidden | Pilot venue / hotel Injected");
  });

  it("sets timeout signals on Resend delivery requests", async () => {
    vi.stubEnv("RESEND_API_KEY", "secret-key");
    vi.stubEnv("CONTACT_FROM_EMAIL", "hello@tailortaste.com");
    vi.stubEnv("CONTACT_TO_EMAILS", "team@tailortaste.com");

    const fetchMock = vi.fn(async () => Response.json({ id: "email_123" }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendContactInquiry({
      name: "Ty",
      email: "guest@example.com",
      organization: "Tailor Taste",
      inquiryType: "Pilot venue / hotel",
      message: "Ready to pilot",
    });

    expect(result).toMatchObject({ ok: true, provider: "resend" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    for (const [, requestInit] of fetchMock.mock.calls) {
      expect(requestInit?.signal).toBeInstanceOf(AbortSignal);
    }
  });
});
