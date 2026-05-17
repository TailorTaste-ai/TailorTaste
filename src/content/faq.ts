import type { FAQPageContent } from "@/lib/site";

export const faqPage = {
  hero: {
    eyebrow: "FAQ",
    title: "What is included, what is not, and why.",
    body: "TailorTaste is early. The useful questions are about scope, workflow, target venues, and what still needs proof.",
  },
  items: [
    {
      question: "Is TailorTaste already a mature, deployed product?",
      answer:
        "No. TailorTaste is pre pilot. The current work is proving the object, staff workflow, and venue value.",
    },
    {
      question: "Is this a tablet in disguise?",
      answer: "No. The direction is a leather bound menu object with a restrained menu face, not app chrome or guest navigation.",
    },
    {
      question: "Does the guest interact with the menu in the MVP?",
      answer: "No. Guests read the menu. Staff handle language, service state, and content changes before or during service.",
    },
    {
      question: "Does MVP include ordering?",
      answer: "No. Ordering would turn TailorTaste into a transaction product. The first version is about menu presentation, staff control, and service fit.",
    },
    {
      question: "What is included in the first product direction?",
      answer:
        "Language switching, preset service state menus, low light readability, and a practical path from existing menu files into the object.",
    },
    {
      question: "What remains future only?",
      answer:
        "Inventory linked updates, pricing suggestions, broader integrations, and deeper intelligence stay future only until the service workflow is proven.",
    },
    {
      question: "Who is the first target segment?",
      answer: "The beachhead is premium hotels and hotel restaurants where language, service states, events, and atmosphere all matter at once.",
    },
    {
      question: "How would a pilot work in practice?",
      answer:
        "A sensible pilot would start in one outlet, use active menus plus spare units, and test the workflow around real service moments before expanding.",
    },
    {
      question: "What if a unit is unavailable during service?",
      answer:
        "That risk has to be designed for. Charging, storage, spares, and service recovery are part of the product requirements, not operational afterthoughts.",
    },
    {
      question: "Who should reach out now?",
      answer:
        "Operators with real menu workflow pain, investors or advisors with hospitality experience, strategic partners, and builders who can help with hardware or service operations.",
    },
  ],
} satisfies FAQPageContent;
