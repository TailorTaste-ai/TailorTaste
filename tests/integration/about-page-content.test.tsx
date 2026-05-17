import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";

describe("About page content boundaries", () => {
  it("starts with a founder-focused heading and both founder cards", () => {
    render(<AboutPage />);

    const hero = screen.getByRole("heading", {
      level: 1,
      name: /Two founders covering the two hard parts/i,
    });
    expect(hero).toBeInTheDocument();

    const ty = screen.getByRole("link", { name: "Ty Stevens" });
    const bucur = screen.getByRole("link", { name: "Bucur Andrei Borcoman" });
    expect(hero.compareDocumentPosition(ty) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hero.compareDocumentPosition(bucur) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders exact Cofounder roles and founder-only proof sections without fake metrics", () => {
    render(<AboutPage />);

    expect(screen.getAllByText("Cofounder")).toHaveLength(2);
    expect(screen.getByText(/The founding split matches the product risk/i)).toBeInTheDocument();
    expect(screen.queryByText("[team size]")).not.toBeInTheDocument();
    expect(screen.queryByText("[events led]")).not.toBeInTheDocument();
    expect(screen.queryByText("[sponsors/partners]")).not.toBeInTheDocument();
    expect(screen.getByText(/The current work is evidence, not polish\./i)).toBeInTheDocument();
  });

  it("does not render the old generic About manifesto sections", () => {
    render(<AboutPage />);

    expect(screen.queryByText(/Premium hospitality should not have to choose/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/In premium hospitality, the menu is part of the experience/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/A clear set of principles guides every product decision/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Deliberate non-goals protect the premium table experience/i)).not.toBeInTheDocument();
  });

  it("renders a founder-conversation closing cta", () => {
    render(<AboutPage />);

    expect(screen.getByText(/Talk to the Cofounders/i)).toBeInTheDocument();
    const pilotLinks = screen.getAllByRole("link", {
      name: /Discuss a pilot/i,
    });
    expect(pilotLinks.length).toBeGreaterThan(0);
  });

  it("keeps founder links secure external links", () => {
    render(<AboutPage />);

    const ty = screen.getByRole("link", { name: "Ty Stevens" });
    const bucur = screen.getByRole("link", { name: "Bucur Andrei Borcoman" });

    for (const link of [ty, bucur]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(within(ty.closest("article") as HTMLElement).getByText("Cofounder")).toBeInTheDocument();
    expect(within(bucur.closest("article") as HTMLElement).getByText("Cofounder")).toBeInTheDocument();
  });
});
