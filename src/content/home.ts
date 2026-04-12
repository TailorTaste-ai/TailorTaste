import type { FeatureItem, SectionIntro } from "@/lib/site";
import { finalCtas, primaryCta, secondaryCta } from "./ctas";
import { assetBrief } from "./assets";

export const hero = {
  eyebrow: "A new category for premium hospitality menus",
  title: "Menus should be as dynamic as the hospitality behind them.",
  body: "Tailor Taste is building a paper-like digital menu system for premium hospitality that preserves the elegance of a physical menu while unlocking the flexibility of software.",
  ctas: [primaryCta, secondaryCta],
  mediaLabel: assetBrief.placeholders.hero.title,
  mediaDescription: assetBrief.placeholders.hero.description,
};

export const categoryGap: SectionIntro & { items: FeatureItem[]; diagramPlaceholder: string } = {
  eyebrow: "The missing middle",
  title: "Between static paper and intrusive screens, there should be something better.",
  body: "Premium hospitality should not have to choose between beauty and control.",
  items: [
    {
      title: "Paper is elegant",
      body: "It fits the room and the ritual, but it is slow to change.",
    },
    {
      title: "Most digital menus are flexible",
      body: "QR menus and tablets solve updates while pulling attention into devices.",
    },
    {
      title: "Tailor Taste is the third path",
      body: "A premium physical object with a restrained software layer underneath.",
    },
  ],
  diagramPlaceholder: `${assetBrief.placeholders.categoryGap.title}: ${assetBrief.placeholders.categoryGap.description}`,
};

export const whyNow: SectionIntro & { items: FeatureItem[] } = {
  eyebrow: "Why now",
  title: "The timing is becoming visible.",
  body: "Service expectations, menu operations, and paper-like hardware are meeting in one practical opening.",
  items: [
    {
      title: "Atmosphere and flexibility",
      body: "Premium venues want adaptive service without losing the feel of the room.",
    },
    {
      title: "Rising language expectations",
      body: "Hotels and destination restaurants increasingly serve international guests.",
    },
    {
      title: "Weak existing answers",
      body: "QR menus and conventional tablets often feel wrong for high-touch service.",
    },
    {
      title: "A new object is possible",
      body: "Paper-like hardware and restrained software can upgrade the menu itself.",
    },
  ],
};

export const objectReveal = {
  eyebrow: "The object",
  title: "A premium menu object, not generic restaurant technology.",
  body: "The current product direction is thin, paper-like, monochrome, text-first, and staff-controlled. The guest reads while the service team controls the menu state. Guest-side touch and ordering are intentionally excluded from the MVP direction.",
  principles: ["Paper-like presence", "Staff-controlled state", "Monochrome clarity", "Built for tableside service"],
  mediaLabel: assetBrief.placeholders.objectReveal.title,
  mediaDescription: assetBrief.placeholders.objectReveal.description,
};

export const possibilities: SectionIntro & { items: FeatureItem[] } = {
  eyebrow: "What becomes possible",
  title: "Software flexibility without a software mood.",
  items: [
    {
      title: "Language switching",
      body: "Serve international guests with a considered menu experience.",
    },
    {
      title: "Lunch and dinner states",
      body: "Move between service moments without stacks of printed menus.",
    },
    {
      title: "Low-light readability",
      body: "Support legibility while preserving the atmosphere of the room.",
    },
    {
      title: "Staff-controlled flexibility",
      body: "Let the team adjust menu states without exposing guests to interface work.",
    },
    {
      title: "Future dietary support",
      body: "Over time, build toward dietary and allergy support without narrowing the full table experience.",
    },
  ],
};

export const dreamOutcomes: SectionIntro & { items: FeatureItem[] } = {
  eyebrow: "Dream outcomes",
  title: "Premium hospitality becomes more adaptive without becoming less beautiful.",
  items: [
    {
      title: "For operators",
      body: "More control over menu states, languages, and service moments.",
    },
    {
      title: "For guests",
      body: "A clearer, more considered menu experience that still feels like hospitality.",
    },
    {
      title: "For the category",
      body: "The menu becomes a live service layer instead of a static artifact.",
    },
  ],
};

export const serviceFit = {
  eyebrow: "Service fit",
  title: "Waiter-led by design.",
  body: "Tailor Taste supports the handout ritual instead of replacing it. Staff select the appropriate menu state; guests simply receive and read a beautiful object.",
  steps: ["Ask or infer the service context", "Set the language or menu state", "Hand out the menu like a traditional card"],
  diagramPlaceholder: `${assetBrief.placeholders.serviceFlow.title}: ${assetBrief.placeholders.serviceFlow.description}`,
};

export const futureLayer = {
  eyebrow: "Future layer",
  title: "Today a menu object. Over time, a hospitality software layer.",
  body: "The first wedge is a premium physical menu. The longer-term opportunity is the system behind it: templates, scheduling, operational controls, and, over time, richer menu intelligence.",
  steps: ["Menu object", "Content control", "Operational layer", "Hospitality intelligence"],
  roadmapPlaceholder: `${assetBrief.placeholders.futureLayer.title}: ${assetBrief.placeholders.futureLayer.description}`,
};

export const founderNote = {
  eyebrow: "Founder note",
  title: "Built from a simple refusal.",
  body: "Premium venues should not have to choose between a beautiful table and an adaptable operation. Tailor Taste starts with the menu because it shapes the first decision, the first tactile impression, and one of hospitality's most visible moments.",
  visualLabel: assetBrief.placeholders.founder.title,
};

export const finalCta = {
  eyebrow: "First wave",
  title: "For venues, partners, and investors who see the category forming.",
  body: "Tailor Taste is early, focused, and looking for the right conversations.",
  ctas: finalCtas,
};
