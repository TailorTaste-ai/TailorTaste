import type { FuturePageContent } from "@/lib/site";

export const futurePage = {
  hero: {
    eyebrow: "Future",
    title: "The first product must prove the later roadmap.",
    body: "Future software only matters if the first menu object becomes useful in real service. Until then, roadmap items are assumptions to test, not promises.",
  },
  framing: {
    eyebrow: "Roadmap discipline",
    title: "What is current, what is next, and what is not MVP.",
    body: "The first version focuses on the object and staff workflow. Later layers should only be built when they solve a confirmed venue problem.",
  },
  stageLanguage: ["Current", "Built toward", "Exploring", "Over time", "Future layer", "Not yet part of MVP"],
  roadmapNotes: [
    {
      question: "Current wedge",
      answer: "A physical menu object controlled by staff and read by guests without touch interaction.",
    },
    {
      question: "Near term software",
      answer: "Language handling, menu upload, reusable templates, and service state scheduling.",
    },
    {
      question: "Operational layer",
      answer: "Outlet controls, team permissions, timing rules, and consistency across services.",
    },
    {
      question: "Long term intelligence",
      answer: "Inventory links, pricing suggestions, and integrations only after venues trust the core workflow.",
    },
  ],
} satisfies FuturePageContent;
