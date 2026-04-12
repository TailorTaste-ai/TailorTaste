import type { FuturePageContent } from "@/lib/site";

export const futurePage = {
  hero: {
    eyebrow: "Future",
    title: "A staged roadmap from menu object to software-backed hospitality layer.",
    body: "This roadmap separates current direction, near-term build targets, and longer-term opportunities without implying features are live today.",
  },
  framing: {
    eyebrow: "Roadmap discipline",
    title: "Ambition is explicit. Timing is explicit too.",
    body: "The object wedge comes first. Each later layer must earn credibility through operational value, not feature inflation.",
  },
  stageLanguage: ["Current", "Built toward", "Exploring", "Over time", "Future layer", "Not yet part of MVP"],
  roadmapNotes: [
    {
      question: "Current wedge",
      answer: "Premium paper-like menu object with staff-led state control and hospitality-first table behavior.",
    },
    {
      question: "Near-term software",
      answer: "Menu upload/conversion, language logic, templates, and service-state scheduling around real operations.",
    },
    {
      question: "Operational layer",
      answer: "Deeper outlet controls, service context configuration, and cross-service consistency tools.",
    },
    {
      question: "Long-term intelligence",
      answer: "Inventory-linked changes, pricing suggestions, and broader integrations remain future-direction items only.",
    },
  ],
} satisfies FuturePageContent;
