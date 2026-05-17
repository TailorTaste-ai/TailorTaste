import type { VisionPageContent } from "@/lib/site";

export const visionPage = {
  hero: {
    eyebrow: "Vision",
    title: "Menu updates should not force guests into a QR flow.",
    body: "Restaurants already treat menus as brand, service, and operations. TailorTaste keeps that object physical while making updates controllable from the staff side.",
  },
  category: {
    eyebrow: "Category logic",
    title: "Keep the guest object familiar. Change the control layer behind it.",
    body: "The opportunity is not another guest interface. It is a staff controlled menu object for content that changes across service.",
    items: [
      {
        title: "Why the gap exists",
        body: "Paper works at the table but creates reprint work. Typical digital menus solve updates by moving the experience onto a personal device.",
      },
      {
        title: "What changes with TailorTaste",
        body: "A physical menu object becomes the delivery layer for staff controlled content.",
      },
    ],
  },
  beachhead: {
    eyebrow: "Why now",
    title: "Premium operators have more menu complexity than the table should reveal.",
    body: "Hotels and destination restaurants manage multilingual guests, shifting service states, event menus, dietary expectations, and last minute availability changes. The guest should see clarity, not the operational mess behind it.",
    items: [
      {
        title: "Premium hospitality beachhead",
        body: "High touch venues care enough about ritual and have enough complexity to feel the pain first.",
      },
      {
        title: "Operational pressure is real",
        body: "Every translation, event menu, and service transition exposes how brittle static print can be.",
      },
      {
        title: "Guest behavior should stay familiar",
        body: "The guest should receive, read, and decide. Staff should handle the operational logic before that moment.",
      },
    ],
  },
  roadmapIntro: {
    eyebrow: "Object to system",
    title: "The menu is the wedge because staff handle it every service.",
    body: "If the object works, the software behind it can expand into templates, scheduling, outlet controls, and later intelligence.",
  },
  futureSignals: [
    {
      title: "Menu scheduling and templates",
      body: "Teams should be able to prepare common service moments instead of rebuilding menus manually.",
    },
    {
      title: "Operational controls over time",
      body: "Controls can become richer while the guest experience remains the same: receive, read, decide.",
    },
    {
      title: "Future intelligence layer",
      body: "Inventory and pricing intelligence should wait until the product has earned trust in daily service.",
    },
  ],
} satisfies VisionPageContent;
