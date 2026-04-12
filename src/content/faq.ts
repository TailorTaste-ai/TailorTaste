import type { FAQPageContent } from "@/lib/site";

export const faqPage = {
  hero: {
    eyebrow: "FAQ",
    title: "Direct answers for practical questions.",
    body: "Tailor Taste is early and ambitious. This page keeps scope, stage, and service model expectations clear.",
  },
  items: [
    {
      question: "Is Tailor Taste already a mature, deployed product?",
      answer:
        "No. Tailor Taste is pre-pilot. The current focus is validating the paper-like menu object, staff-led workflow, and core operational value.",
    },
    {
      question: "Is this a tablet in disguise?",
      answer: "No. The product direction is a paper-like hospitality object with a restrained, text-first display and no tablet-style UI chrome.",
    },
    {
      question: "Does the guest interact with the menu in the MVP?",
      answer: "No. The MVP story is read-only for guests. Staff control language and menu-state selection.",
    },
    {
      question: "Does MVP include ordering?",
      answer: "No. Ordering is intentionally excluded to keep the first product focused and hospitality-led.",
    },
    {
      question: "What is included in the first product direction?",
      answer:
        "Core direction includes language switching, preset service-state menus, low-light readability support, and practical menu upload/conversion workflows.",
    },
    {
      question: "What remains future only?",
      answer:
        "Inventory-linked updates, pricing suggestions, deeper intelligence layers, and wider integration surfaces are future-stage opportunities.",
    },
    {
      question: "Who is the first target segment?",
      answer: "The beachhead is premium hotels and hotel restaurants with multilingual, high-touch service contexts.",
    },
    {
      question: "How would a pilot work in practice?",
      answer:
        "Pilot direction typically centers on one outlet first, with active units plus spares, and an operating model that prefers inactive-menu updates.",
    },
    {
      question: "What if a unit is unavailable during service?",
      answer:
        "Operational planning includes charging/storage discipline and spare-unit readiness. Reliability concerns are treated as core product work, not afterthoughts.",
    },
    {
      question: "Who should reach out now?",
      answer:
        "Pilot-minded venue operators, thoughtful investors/advisors, strategic partners, and builders aligned with service-first hospitality technology.",
    },
  ],
} satisfies FAQPageContent;
