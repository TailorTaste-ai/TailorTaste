import { describe, expect, it } from "vitest";
import {
  buildConfirmationHtml,
  buildConfirmationPlainText,
  buildHtml,
  buildInquirySubject,
} from "@/lib/contact-delivery";

describe("contact delivery builders", () => {
  it("escapes user-provided HTML in the internal inquiry email", () => {
    const html = buildHtml({
      name: "<b>Ty</b>",
      email: "ty@tailortaste.com",
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
    expect(plainText).toContain("ty@tailortaste.ch");
    expect(plainText).not.toContain("Message:");
    expect(html).toContain("Dear Ty,");
    expect(html).toContain("Thank you for contacting us");
    expect(html).toContain("ty@tailortaste.ch");
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
});
