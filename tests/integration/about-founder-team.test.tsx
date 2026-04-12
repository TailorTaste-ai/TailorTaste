import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FounderTeam } from "@/components/sections/FounderTeam";
import { aboutPage } from "@/content/about";

describe("FounderTeam", () => {
  it("renders founder links with secure external link attributes", () => {
    render(<FounderTeam founders={aboutPage.founders} />);

    const ty = screen.getByRole("link", { name: /Open Ty Stevens LinkedIn profile in a new tab/i });
    const bucur = screen.getByRole("link", { name: /Open Bucur Andrei Borcoman LinkedIn profile in a new tab/i });

    expect(ty).toHaveAttribute("href", "https://www.linkedin.com/in/ty-stevens-/");
    expect(ty).toHaveAttribute("target", "_blank");
    expect(ty).toHaveAttribute("rel", "noopener noreferrer");

    expect(bucur).toHaveAttribute("href", "https://www.linkedin.com/in/bucur-andrei-borcoman/");
    expect(bucur).toHaveAttribute("target", "_blank");
    expect(bucur).toHaveAttribute("rel", "noopener noreferrer");
  });
});
