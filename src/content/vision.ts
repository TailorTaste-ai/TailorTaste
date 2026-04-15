import type { VisionPageContent } from "@/lib/site";

export const visionPage = {
  hero: {
    eyebrow: "Vision",
    title: "Between static paper and intrusive screens, a new category is forming.",
    body: "Menus sit between brand, service, operations, and guest expectation. TailorTaste exists because this object should be more adaptive without becoming more distracting.",
  },
  category: {
    eyebrow: "Category logic",
    title: "Paper elegance. Software control.",
    body: "The menu can become a live service layer while preserving the ritual and atmosphere premium hospitality depends on.",
    items: [
      {
        title: "Why the gap exists",
        body: "Paper keeps atmosphere but resists change. Typical digital menus enable updates but pull attention into interfaces.",
      },
      {
        title: "What changes with TailorTaste",
        body: "A premium physical object becomes the delivery layer for a restrained software system.",
      },
    ],
  },
  beachhead: {
    eyebrow: "Why now",
    title: "Timing favors premium operators with complex service realities.",
    body: "Hotels and destination restaurants now carry multilingual demand, frequent menu transitions, and higher guest expectations for both clarity and atmosphere.",
    items: [
      {
        title: "Premium hospitality beachhead",
        body: "This segment values service ritual and has enough operational complexity to justify a better menu layer.",
      },
      {
        title: "Operational pressure is real",
        body: "Language shifts, lunch-to-dinner transitions, and event service expose the limits of static print workflows.",
      },
      {
        title: "Technology must stay in its place",
        body: "The goal is not more screens at the table. The goal is better hospitality decisions behind the menu.",
      },
    ],
  },
  roadmapIntro: {
    eyebrow: "Object to system",
    title: "The menu is the wedge, not the endpoint.",
    body: "The first phase is a credible hardware object. Over time, the supporting software layer can expand carefully into operations and intelligence.",
  },
  futureSignals: [
    {
      title: "Menu scheduling and templates",
      body: "Near-term software can support planned menu states and reusable content structures.",
    },
    {
      title: "Operational controls over time",
      body: "Service-state and content controls can deepen without changing the guest interaction model.",
    },
    {
      title: "Future intelligence layer",
      body: "Inventory-linked updates and pricing suggestions remain longer-term opportunities, not current capabilities.",
    },
  ],
} satisfies VisionPageContent;
