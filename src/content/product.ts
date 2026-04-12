import type { ProductPageContent } from "@/lib/site";

export const productPage = {
  hero: {
    eyebrow: "Product",
    title: "A paper-like digital menu system for premium hospitality.",
    body: "Tailor Taste is a staff-controlled menu object that preserves the elegance of paper while giving teams software-level flexibility behind the service ritual.",
  },
  objectModel: {
    eyebrow: "What it is",
    title: "An elegant object with a disciplined interaction model.",
    body: "The menu is designed to feel physical, premium, and familiar at the table. The guest reads; staff choose the right menu state before and during service.",
    items: [
      {
        title: "Paper-like presentation",
        body: "Thin object profile and text-first experience for premium tableside service.",
      },
      {
        title: "Read-only guest model",
        body: "Guest-side touch is intentionally excluded from the MVP direction.",
      },
      {
        title: "Monochrome clarity",
        body: "Black-and-white readability supports calm presentation in varied lighting.",
      },
    ],
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "Practical flexibility for live hospitality operations.",
    body: "The first capability set focuses on service reliability and staff control, not feature sprawl.",
    items: [
      {
        title: "Language switching",
        body: "Staff can present the menu in the right language for each guest context.",
      },
      {
        title: "Preset menu states",
        body: "Switch between lunch, dinner, and event menus without reprint cycles.",
      },
      {
        title: "Low-light readability presets",
        body: "Maintain legibility without breaking atmosphere in evening service.",
      },
      {
        title: "Menu upload and conversion",
        body: "PDF-based menu workflows are part of the intended MVP operating model.",
      },
      {
        title: "Item activation if feasible",
        body: "Individual item toggling is valuable and explored where implementation remains practical.",
      },
    ],
  },
  serviceFit: {
    eyebrow: "Service fit",
    title: "Built for waiter-led hospitality, not self-service interaction.",
    body: "The object supports existing service choreography while giving teams more control behind the scenes.",
    steps: [
      "Staff set language or service state before handout",
      "Guest receives and reads a premium menu object",
      "Updates are handled deliberately, with inactive-menu updates preferred",
    ],
  },
  deployment: {
    eyebrow: "Deployment thinking",
    title: "Operational details are treated as product requirements.",
    body: "Charging, storage, spares, and update behavior are part of the product direction from day one.",
    items: [
      {
        title: "Charging and storage",
        body: "Dock and charging concepts are directional, not final hardware claims.",
      },
      {
        title: "Spare-unit readiness",
        body: "Pilot operations should include active units plus spares for service continuity.",
      },
      {
        title: "Update discipline",
        body: "Inactive-menu updates are preferred to avoid disrupting active guest experiences.",
      },
    ],
  },
  boundaries: [
    {
      title: "No guest ordering in MVP",
      body: "Ordering belongs to a different category and is intentionally excluded at this stage.",
    },
    {
      title: "No guest-side touch in the MVP",
      body: "The menu should feel like an upgraded physical object, not a mini tablet.",
    },
    {
      title: "No inventory-linked automation in MVP",
      body: "Inventory-linked changes remain part of a future software layer only.",
    },
  ],
} satisfies ProductPageContent;
