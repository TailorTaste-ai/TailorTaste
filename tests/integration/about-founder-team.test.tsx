import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FounderTeam } from "@/components/sections/FounderTeam";
import { aboutPage } from "@/content/about";

describe("FounderTeam", () => {
  it("renders founder links with secure external link attributes", () => {
    render(<FounderTeam founders={aboutPage.founders} />);

    const ty = screen.getByRole("link", { name: "Ty Stevens" });
    const bucur = screen.getByRole("link", { name: "Bucur Andrei Borcoman" });

    expect(ty).toHaveAttribute("href", "https://www.linkedin.com/in/ty-stevens-/");
    expect(ty).toHaveAttribute("target", "_blank");
    expect(ty).toHaveAttribute("rel", "noopener noreferrer");

    expect(bucur).toHaveAttribute("href", "https://www.linkedin.com/in/bucur-andrei-borcoman/");
    expect(bucur).toHaveAttribute("target", "_blank");
    expect(bucur).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Cofounder portrait placeholders and scan-friendly focus areas", () => {
    render(<FounderTeam founders={aboutPage.founders} />);

    expect(screen.getByRole("img", { name: /Portrait placeholder for Ty Stevens/i })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Portrait placeholder for Bucur Andrei Borcoman/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Strategy, positioning, and go-to-market judgment/i)).toBeInTheDocument();
    expect(screen.getByText(/Robotics, machinery, and technical prototyping/i)).toBeInTheDocument();
  });
});
