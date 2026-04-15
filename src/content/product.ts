import type { ProductPageContent } from "@/lib/site";

export const productPage = {
  hero: {
    eyebrow: "Product",
    title: "A paper-like digital menu system for premium hospitality.",
    body: "TailorTaste is a staff-controlled menu object that preserves the elegance of paper while giving teams software-level flexibility behind the service ritual.",
  },
  objectModel: {
    eyebrow: "What it is",
    title: "A premium object, not generic restaurant tech.",
    body: "The guest reads a beautiful menu. Staff control what it shows.",
    items: [
      {
        title: "Paper-like feel",
        body: "Thin, text-first, designed for the table.",
      },
      {
        title: "Read-only for guests",
        body: "No touch interaction. No tablet behaviour.",
      },
      {
        title: "Monochrome clarity",
        body: "Clean readability in any lighting.",
      },
    ],
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "Staff-controlled flexibility, live.",
    body: "Focused on reliability and control — not feature sprawl.",
    items: [
      {
        title: "Language switching",
        body: "Present the menu in the right language, per guest.",
      },
      {
        title: "Menu states",
        body: "Lunch, dinner, event — no reprints needed.",
      },
      {
        title: "Low-light presets",
        body: "Readable in dim rooms without breaking mood.",
      },
      {
        title: "PDF upload",
        body: "Upload and convert existing menu files.",
      },
      {
        title: "Item toggling",
        body: "Activate or hide individual items on the fly.",
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
