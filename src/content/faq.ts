import type { FAQPageContent } from "@/lib/site";

export const faqPage = {
  hero: {
    eyebrow: "FAQ",
    title: "Questions a venue should ask before testing TailorTaste.",
    body: "Short answers about the guest experience, staff controls, pilot scope, and what stays future until the workflow is proven.",
  },
  items: [
    {
      question: "Is this a tablet menu?",
      answer:
        "No. TailorTaste is based on e-ink style display technology, not the LED screens used in normal tablets or iPads. That makes the object thinner, quieter, and closer to paper, so it supports the dining experience instead of pulling the guest out of it.",
    },
    {
      question: "Can guests order from it?",
      answer:
        "No. The first pilot is not an ordering or payment product. Ordering stays with staff and existing systems; TailorTaste focuses on presentation, clarity, and controlled menu updates.",
    },
    {
      question: "What can staff change during service?",
      answer:
        "Staff can control the active menu state, language version, readability, availability, specials, and approved menu text. Some updates can happen live; others should be approved before the menu goes back to a table.",
    },
    {
      question: "Can menus switch languages?",
      answer:
        "Yes. A venue can prepare approved language versions and switch the menu for international guests without maintaining separate printed sets.",
    },
    {
      question: "How are dietary and allergen needs handled?",
      answer:
        "The goal is to help staff surface approved dietary notes, allergen information, and suitable dishes without narrowing the whole menu unnecessarily. It should support staff judgment, not replace it.",
    },
    {
      question: "Does it support price changes or dynamic pricing?",
      answer:
        "Controlled price and availability updates are part of the direction. Autonomous AI pricing is not part of the first pilot; any pricing change should remain deliberate and staff-approved.",
    },
    {
      question: "What does a pilot measure?",
      answer:
        "A pilot should measure whether staff can prepare, hand out, update, charge, store, and recover the menu object naturally during service. It should also track reduced menu work, fewer version mistakes, and guest acceptance.",
    },
    {
      question: "Does it integrate with POS, PMS, or inventory systems?",
      answer:
        "Not in the first test. Integrations can matter later, but the first proof is simpler: can the physical menu object and staff-side workflow create value before deeper automation is added?",
    },
  ],
} satisfies FAQPageContent;
