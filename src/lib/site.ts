export type CTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "inverted" | "text";
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export type FeatureItem = {
  title: string;
  body: string;
  icon?: string;
};

export type PageSection = SectionIntro & {
  items?: FeatureItem[];
};

export type ProductPageContent = {
  hero: SectionIntro;
  objectModel: SectionIntro & { items: FeatureItem[] };
  capabilities: SectionIntro & { items: FeatureItem[] };
  serviceFit: SectionIntro & { steps: string[] };
  deployment: SectionIntro & { items: FeatureItem[] };
};

export type VisionPageContent = {
  hero: SectionIntro;
  category: SectionIntro & { items: FeatureItem[] };
  beachhead: SectionIntro & { items: FeatureItem[] };
  roadmapIntro: SectionIntro;
  futureSignals: FeatureItem[];
};

export type RoadmapStage = {
  horizon: "Current wedge" | "Near term" | "Operational layer" | "Long term";
  title: string;
  body: string;
};

export type AboutPageContent = {
  hero: SectionIntro & { items: FeatureItem[] };
  founders: FounderProfile[];
  founderFit: SectionIntro & { items: FeatureItem[] };
  domainComplement: SectionIntro & { items: FeatureItem[] };
  operatingStyle: SectionIntro & { items: FeatureItem[] };
  currentFocus: SectionIntro;
  closingCta: SectionIntro & { cta: CTA };
};

export type FounderPortrait = {
  src?: string;
  alt: string;
  initials: string;
  placeholder: string;
};

export type FounderProfile = {
  name: string;
  role: string;
  linkedin: string;
  summary: string;
  focusAreas: string[];
  portrait: FounderPortrait;
};

export type ContactPageContent = {
  hero: SectionIntro;
  deliveryNote: string;
  inquiryTypes: readonly string[];
};

export type AssetBriefItem = {
  id: string;
  title: string;
  section: string;
  purpose: string;
  placement: string;
  acceptance: string[];
};

export type AssetBrief = {
  categories: {
    renders: string[];
    images: string[];
    icons: string[];
    diagrams: string[];
  };
  placeholders: {
    hero: { title: string; description: string };
    objectReveal: { title: string; description: string };
    founder: { title: string; description: string };
    categoryGap: { title: string; description: string };
    serviceFlow: { title: string; description: string };
    futureLayer: { title: string; description: string };
  };
  required: AssetBriefItem[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQPageContent = {
  hero: SectionIntro;
  items: FAQItem[];
};

export type FuturePageContent = {
  hero: SectionIntro;
  framing: SectionIntro;
  stageLanguage: string[];
  roadmapNotes: FAQItem[];
};

export const siteConfig = {
  name: "TailorTaste",
  alternateName: "Tailor Taste",
  description:
    "A leather bound physical menu system for premium restaurants and hotels, controlled by staff before and during service.",
  productDefinition:
    "TailorTaste keeps the menu physical for guests while staff update languages, service states, availability, dietary notes, and prices from their side.",
  primaryCTA: "Discuss a pilot",
  url: "https://tailortaste.ch",
  officialDomain: "tailortaste.ch",
  contactEmail: "ty@tailortaste.ch",
  location: {
    locality: "Zurich",
    countryName: "Switzerland",
    countryCode: "CH",
  },
  founders: [
    {
      name: "Ty Stevens",
      url: "https://www.linkedin.com/in/ty-stevens-/",
      role: "Cofounder",
    },
    {
      name: "Bucur Andrei Borcoman",
      role: "Cofounder",
    },
  ],
  ecosystemLinks: ["https://www.entrepreneur-club.org/", "https://sph.ethz.ch/"],
  keywords: [
    "TailorTaste",
    "Tailor Taste",
    "TailorTaste Switzerland",
    "TailorTaste Zurich",
    "physical menu system",
    "restaurant menu technology",
    "hotel menu technology",
    "premium hospitality",
    "digital restaurant menu",
    "staff controlled menu",
    "menu language switching",
    "restaurant pilot",
  ],
  socialImage: {
    url: "/menu-table-premium.png",
    width: 1402,
    height: 1122,
    alt: "TailorTaste physical menu object on a premium restaurant table",
  },
};
