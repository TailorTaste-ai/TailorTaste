import { describe, expect, it } from "vitest";
import { aboutPage } from "@/content/about";

describe("about content contract", () => {
  it("includes the new about sections with structured content", () => {
    const requiredSections = [
      "opening",
      "whyWeCare",
      "whatWeSaw",
      "whatWeBelieve",
      "buildPhilosophy",
      "whatItIsNot",
      "foundersIntro",
      "whereWeAreNow",
      "closingCta",
    ] as const;

    for (const sectionKey of requiredSections) {
      expect(aboutPage).toHaveProperty(sectionKey);
      expect(aboutPage[sectionKey as keyof typeof aboutPage]).toBeTruthy();
    }

    expect(aboutPage.whatWeBelieve.items.length).toBeGreaterThan(0);
    expect(aboutPage.whatItIsNot.items.length).toBeGreaterThan(0);
  });

  it("includes both founders with linkedin links", () => {
    const founders = aboutPage.founders.map((founder) => founder.name);
    expect(founders).toEqual(["Ty Stevens", "Bucur Andrei Borcoman"]);
  });

  it("uses https linkedin profile links", () => {
    for (const founder of aboutPage.founders) {
      expect(founder.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/.+\/?$/);
    }
  });
});
