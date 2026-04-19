import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";

describe("About page content boundaries", () => {
  it("does not render roadmap-overlap copy on /about", () => {
    render(<AboutPage />);

    expect(
      screen.queryByRole("heading", {
        name: /The menu is the wedge, not the endpoint\./i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Object to system/i),
    ).not.toBeInTheDocument();
  });

  it("renders a pilot-focused closing cta", () => {
    render(<AboutPage />);

    const pilotLinks = screen.getAllByRole("link", {
      name: /Discuss a pilot/i,
    });
    expect(pilotLinks.length).toBeGreaterThan(0);
  });
});
