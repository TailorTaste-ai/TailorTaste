import { describe, expect, it } from "vitest";
import { aboutPage } from "@/content/about";

describe("about content contract", () => {
  it("uses the founder-first about sections", () => {
    const requiredSections = [
      "hero",
      "founders",
      "founderFit",
      "domainComplement",
      "operatingStyle",
      "currentFocus",
      "closingCta",
    ] as const;

    for (const sectionKey of requiredSections) {
      expect(aboutPage).toHaveProperty(sectionKey);
      expect(aboutPage[sectionKey as keyof typeof aboutPage]).toBeTruthy();
    }
  });

  it("does not keep generic company-manifesto about sections", () => {
    expect("opening" in aboutPage).toBe(false);
    expect("whyWeCare" in aboutPage).toBe(false);
    expect("whatWeSaw" in aboutPage).toBe(false);
    expect("whatWeBelieve" in aboutPage).toBe(false);
    expect("buildPhilosophy" in aboutPage).toBe(false);
    expect("whatItIsNot" in aboutPage).toBe(false);
  });

  it("does not ship visible proof placeholders before metrics are real", () => {
    expect("trackRecord" in aboutPage).toBe(false);
    expect(JSON.stringify(aboutPage)).not.toMatch(/\[(team size|events led|attendance|sponsors\/partners|budget|outcome)\]/);
  });

  it("includes both founders with exact temporary Cofounder roles", () => {
    const founders = aboutPage.founders.map((founder) => ({
      name: founder.name,
      role: founder.role,
    }));

    expect(founders).toEqual([
      { name: "Ty Stevens", role: "Cofounder" },
      { name: "Bucur Andrei Borcoman", role: "Cofounder" },
    ]);
  });

  it("gives each founder scannable ownership and portrait placeholder content", () => {
    for (const founder of aboutPage.founders) {
      expect(founder.summary.length).toBeGreaterThan(20);
      expect(founder.focusAreas.length).toBeGreaterThanOrEqual(3);
      expect(founder.portrait.initials.length).toBeGreaterThanOrEqual(2);
      expect(founder.portrait.placeholder).toBe("Cofounder portrait");
    }
  });

  it("uses https linkedin profile links", () => {
    for (const founder of aboutPage.founders) {
      expect(founder.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/.+\/?$/);
    }
  });
});
