import { describe, expect, it } from "vitest";
import { contactFormLimits, validateContactForm } from "@/lib/validation";

describe("validateContactForm", () => {
  it("returns required field errors for empty input", () => {
    const errors = validateContactForm({
      name: "",
      email: "",
      organization: "",
      inquiryType: "",
      message: "",
    });

    expect(errors).toMatchObject({
      name: "Name is required.",
      email: "Email is required.",
      organization: "Organization is required.",
      inquiryType: "Choose an inquiry type.",
      message: "Message is required.",
    });
  });

  it("rejects invalid email format", () => {
    const errors = validateContactForm({
      name: "Ty",
      email: "invalid-email",
      organization: "Tailor Taste",
      inquiryType: "Investor / advisor",
      message: "Hello",
    });

    expect(errors.email).toBe("Use a valid email address.");
  });

  it("enforces max field lengths", () => {
    const errors = validateContactForm({
      name: "n".repeat(contactFormLimits.name + 1),
      email: `${"e".repeat(300)}@mail.com`,
      organization: "o".repeat(contactFormLimits.organization + 1),
      inquiryType: "i".repeat(contactFormLimits.inquiryType + 1),
      message: "m".repeat(contactFormLimits.message + 1),
    });

    expect(errors.name).toContain("characters or fewer");
    expect(errors.email).toBeDefined();
    expect(errors.organization).toContain("characters or fewer");
    expect(errors.inquiryType).toBe("Inquiry type is too long.");
    expect(errors.message).toContain("characters or fewer");
  });
});
