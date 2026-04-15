import type { SectionIntro, FeatureItem } from "@/lib/site";

export type AboutPageData = {
  hero: SectionIntro;
  mission: SectionIntro;
  vision: SectionIntro & { items: FeatureItem[] };
  founderNote: SectionIntro;
  founders: { name: string; role: string; linkedin: string }[];
  whyNow: SectionIntro & { items: FeatureItem[] };
  stage: SectionIntro;
  conversationFit: SectionIntro;
};

export const aboutPage: AboutPageData = {
  hero: {
    eyebrow: "About",
    title: "Founder conviction behind TailorTaste.",
    body: "TailorTaste is led by Ty Stevens and Bucur Andrei Borcoman. The project is early and pre-pilot, with a focused thesis: premium hospitality should gain software flexibility without making the table feel more digital.",
  },
  mission: {
    eyebrow: "Mission",
    title: "Make premium hospitality more adaptive without making it feel more digital.",
    body: "The menu is one of hospitality's smallest objects with the biggest emotional weight. It shapes the first decision, the first tactile moment, and the guest's first sense of being considered. We started here because changing this object changes the entire service experience. The product starts narrow on purpose: one object, one workflow, one credible wedge for long-term product development.",
  },
  vision: {
    eyebrow: "Vision",
    title: "Paper elegance. Software control.",
    body: "Between static paper and intrusive screens, a new category is forming. Menus sit between brand, service, operations, and guest expectation. TailorTaste exists because this object should be more adaptive without becoming more distracting.",
    items: [
      {
        title: "Why the gap exists",
        body: "Paper keeps atmosphere but resists change. Typical digital menus enable updates but pull attention into interfaces.",
      },
      {
        title: "What changes with TailorTaste",
        body: "A premium physical object becomes the delivery layer for a restrained software system.",
      },
      {
        title: "Technology stays in its place",
        body: "The goal is not more screens at the table. The goal is better hospitality decisions behind the menu.",
      },
    ],
  },
  founderNote: {
    eyebrow: "Founder thesis",
    title: "The menu is one of hospitality's smallest objects with the biggest emotional weight.",
    body: "It shapes the first decision, the first tactile moment, and the guest's first sense of being considered. We kept returning to that object because changing it changes the whole service experience.",
  },
  founders: [
    {
      name: "Ty Stevens",
      role: "Co-founder",
      linkedin: "https://www.linkedin.com/in/ty-stevens-/",
    },
    {
      name: "Bucur Andrei Borcoman",
      role: "Co-founder",
      linkedin: "https://www.linkedin.com/in/bucur-andrei-borcoman/",
    },
  ],
  whyNow: {
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
    ],
  },
  stage: {
    eyebrow: "Current stage",
    title: "Pre-pilot and deliberately focused.",
    body: "The current objective is to validate form factor, staff-led flow, and practical menu-control value before expanding into deeper software layers.",
  },
  conversationFit: {
    eyebrow: "Get involved",
    title: "Looking for high-quality early partners.",
    body: "TailorTaste is currently looking for pilot-minded premium venues, thoughtful investors/advisors, and collaborators who care about service craft as much as software rigor.",
  },
};
