import type { FeatureItem, SectionIntro } from "@/lib/site";
import { finalCtas, primaryCta, secondaryCta } from "./ctas";
import { assetBrief } from "./assets";

export const hero = {
  eyebrow: "A new category for premium hospitality menus",
  title: "A physical menu staff can control before and during service.",
  body: "TailorTaste is a leather bound menu object for restaurants and hotels. Staff control language, service state, and content while guests simply read a premium menu.",
  ctas: [primaryCta, secondaryCta],
  mediaLabel: assetBrief.placeholders.hero.title,
  mediaDescription: assetBrief.placeholders.hero.description,
};

export const categoryGap: SectionIntro & { items: FeatureItem[] } = {
  eyebrow: "The missing middle",
  title: "Paper protects the table.\nQR solves updates.\nTailorTaste combines the useful parts.",
  body: "The problem is practical: menus change by service, language, event, availability, and lighting conditions. TailorTaste keeps the guest-facing object physical while giving staff controlled ways to update what it shows.",
  items: [
    {
      title: "Paper menus",
      body: "Good for atmosphere, expensive and slow when content changes.",
    },
    {
      title: "TailorTaste",
      body: "A physical object controlled by staff, updated through software, read like a menu.",
    },
    {
      title: "QR & tablets",
      body: "Easy to update, but they move attention away from the room and into a device.",
    },
  ],
};

export const whyNow: SectionIntro & { items: FeatureItem[] } = {
  eyebrow: "Why now",
  title: "Menu operations are becoming too complex for static print.",
  body: "Premium teams now manage more translations, dietary questions, event formats, service states, and last minute changes. The menu has become operational infrastructure, even if it still looks like paper.",
  items: [
    {
      title: "Atmosphere and flexibility",
      body: "Operators need faster changes without adding visible restaurant tech to the table.",
    },
    {
      title: "Rising language expectations",
      body: "Hotels and destination restaurants often serve the same table in different languages.",
    },
    {
      title: "Weak existing answers",
      body: "QR codes and tablets optimize access, not presentation, handout, or staff control.",
    },
    {
      title: "A new object is possible",
      body: "Low power displays make a calm, readable, menu shaped object technically realistic.",
    },
  ],
};

export const objectReveal = {
  eyebrow: "The object",
  title: "The guest should not have to operate the product.",
  body: "The menu is read only for guests. Staff handle language, menu state, and content before or during service, so the product supports the room instead of becoming a guest interface.",
  principles: ["Read only for guests", "Prepared by staff", "Monochrome menu face", "Built for handout"],
  mediaLabel: assetBrief.placeholders.objectReveal.title,
  mediaDescription: assetBrief.placeholders.objectReveal.description,
};

export const possibilities: SectionIntro & { items: FeatureItem[] } = {
  eyebrow: "What becomes possible",
  title: "The first useful controls are the ones teams already need.",
  body: "The product should first reduce manual menu work, not add new guest behavior.",
  items: [
    {
      title: "Language switching",
      body: "Use one object for multiple guest languages instead of maintaining separate printed sets.",
    },
    {
      title: "Lunch and dinner states",
      body: "Prepare lunch, dinner, event, or tasting menu states from the staff side.",
    },
    {
      title: "Low light readability",
      body: "Tune readability for darker rooms without turning the menu into a bright screen.",
    },
    {
      title: "Staff controlled flexibility",
      body: "Keep menu changes in staff hands instead of asking guests to tap through options.",
    },
    {
      title: "Future dietary support",
      body: "Later versions can help staff surface suitable dishes without narrowing the full menu for everyone.",
    },
  ],
};

export const dreamOutcomes: SectionIntro & { items: FeatureItem[] } = {
  eyebrow: "Operational value",
  title: "Fewer menu workarounds before and during service.",
  items: [
    {
      title: "For operators",
      body: "Reduce reprints, version mismatches, and last minute menu substitutions.",
    },
    {
      title: "For guests",
      body: "Receive the correct menu in a format that still feels like part of the restaurant.",
    },
    {
      title: "For the category",
      body: "Treat the menu as an object staff can manage, not a static file sent to print.",
    },
  ],
};

export const serviceFit = {
  eyebrow: "Service fit",
  title: "The workflow stays with the staff.",
  body: "Staff choose the relevant state, hand out the object, and make controlled updates when service needs them.",
  steps: ["Read the table context", "Set or update the menu state", "Present it like a traditional menu"],
};

export const futureLayer = {
  eyebrow: "Menu changes",
  title: "Change the menu without reprinting the ritual.",
  body: "Whatever a venue needs to adjust, TailorTaste should make it a controlled staff-side update. The pilot helps decide which changes matter first.",
  steps: [
    {
      title: "Translations",
      body: "Switch language versions for international tables without maintaining separate printed sets.",
    },
    {
      title: "Service states",
      body: "Move between lunch, dinner, tasting, event, or room-service menus from the staff side.",
    },
    {
      title: "Menu edits",
      body: "Update dish text, specials, sold-out items, and dietary notes without another print cycle.",
    },
    {
      title: "Price and availability",
      body: "Support controlled price or availability changes later, once the pilot proves the workflow.",
    },
  ],
};

export const founderNote = {
  eyebrow: "Founder note",
  title: "Why start with the menu?",
  body: "Because the menu is where guest experience and daily operations meet. Every guest sees it, staff handle it constantly, and small mistakes in language, availability, allergens, or price create real service friction.",
};

export const finalCta = {
  eyebrow: "Pilot conversations",
  title: "Useful feedback needs a real venue context.",
  body: "Reach out with the service setting, menu workflow, or pilot constraint you would want TailorTaste to solve.",
  ctas: finalCtas,
};
