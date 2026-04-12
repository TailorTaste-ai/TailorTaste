import { describe, expect, it } from "vitest";
import { aboutPage } from "@/content/about";

describe("about content founder profile contract", () => {
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
