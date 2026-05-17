import type { ProductPageContent } from "@/lib/site";

export const productPage = {
  hero: {
    eyebrow: "Product",
    title: "A front of house menu object controlled from the staff side.",
    body: "TailorTaste is designed for venues that need language changes, service states, and menu updates without putting a tablet or QR flow between the guest and the table.",
  },
  objectModel: {
    eyebrow: "What it is",
    title: "The product has one job at the table: be read.",
    body: "Guest interaction is intentionally limited. The product value comes from what staff can control before and during service, not from asking the guest to navigate an interface.",
    items: [
      {
        title: "Paper like feel",
        body: "Leather bound exterior, cream menu face, and a format that reads as a physical menu.",
      },
      {
        title: "Read only for guests",
        body: "No guest tapping, swiping, ordering, or account flow in the first product direction.",
      },
      {
        title: "Monochrome clarity",
        body: "Text first layout for menus, wine pairings, event cards, and service specific versions.",
      },
    ],
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "Staff controlled flexibility, live.",
    body: "The demo shows the first control layer: language, menu state, brightness, upload mode, and item visibility.",
    items: [
      {
        title: "Language switching",
        body: "Prepare a menu in English, French, or German without swapping physical sets.",
      },
      {
        title: "Menu states",
        body: "Move between lunch, dinner, and event menus from the staff dashboard.",
      },
      {
        title: "Low light presets",
        body: "Adjust display brightness for darker dining rooms.",
      },
      {
        title: "PDF upload",
        body: "Represent the path from existing menu files to a controlled menu object.",
      },
      {
        title: "Item toggling",
        body: "Hide unavailable dishes without rebuilding the whole menu.",
      },
    ],
  },
  serviceFit: {
    eyebrow: "Service fit",
    title: "The service team decides what the guest sees.",
    body: "TailorTaste keeps menu control with staff before and during service. Some changes happen before handout; others, like hiding an unavailable dish, can happen during service.",
    steps: [
      "Select or update the language and service state from the staff side",
      "Present the object with the same rhythm as a traditional menu",
      "Adjust content during service when operations require it",
    ],
  },
  deployment: {
    eyebrow: "Operational discipline",
    title: "A pilot has to prove the boring parts too.",
    body: "The menu object only works if teams can store it, charge it, cleanly prepare it, and recover from unavailable units during service.",
    items: [
      {
        title: "Charging and storage",
        body: "Units need a back of house home for charging, storage, and service preparation.",
      },
      {
        title: "Spare unit readiness",
        body: "Pilots should include spare units so service can continue when one object is unavailable.",
      },
      {
        title: "Update discipline",
        body: "Teams need clear rules for which updates can happen live and which should wait until the menu returns from the table.",
      },
    ],
  },
} satisfies ProductPageContent;
