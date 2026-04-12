export type CTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "text";
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
  boundaries: FeatureItem[];
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
  hero: SectionIntro;
  founderNote: SectionIntro;
  founders: FounderProfile[];
  sections: SectionIntro[];
};

export type FounderProfile = {
  name: string;
  role: string;
  linkedin: string;
};

export type ContactPageContent = {
  hero: SectionIntro;
  deliveryNote: string;
  inquiryTypes: string[];
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
  name: "Tailor Taste",
  description: "A paper-like digital menu system for premium hospitality.",
  productDefinition:
    "Tailor Taste is a paper-like digital menu system for premium hospitality that gives restaurants and hotels the flexibility of software without sacrificing the elegance, readability, and immersive feel of a physical menu.",
  primaryCTA: "Discuss a pilot",
  url: "https://tailortaste.com",
};
