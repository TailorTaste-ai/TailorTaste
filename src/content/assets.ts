import type { AssetBrief } from "@/lib/site";

export const assetBrief = {
  categories: {
    renders: ["Hero product render", "Object close-up studies", "Service scene concept"],
    images: ["Founder portrait or signature", "Hospitality atmosphere support visuals"],
    icons: ["Feature and capability icon set"],
    diagrams: ["Category gap", "Service flow", "Future-layer roadmap"],
  },
  placeholders: {
    hero: {
      title: "Hero Render Placeholder",
      description: "Use a cinematic premium-menu render that reads as a paper-like object, not a tablet screen.",
    },
    objectReveal: {
      title: "Object Study Placeholder",
      description: "Replace with thin-profile and close-up object studies emphasizing monochrome readability and material detail.",
    },
    founder: {
      title: "Founder Visual Placeholder",
      description: "Optional founder portrait or signature lockup to humanize conviction without fake team signals.",
    },
    categoryGap: {
      title: "Category Diagram Placeholder",
      description: "Paper vs intrusive digital vs TailorTaste diagram for quick category comprehension.",
    },
    serviceFlow: {
      title: "Service Flow Placeholder",
      description: "Staff sets state, guest reads, menu returns. Keep ritual-led and operationally credible.",
    },
    futureLayer: {
      title: "Roadmap Graphic Placeholder",
      description: "Object to content control to operational layer to intelligence. Present as staged direction.",
    },
  },
  required: [
    {
      id: "hero-render",
      title: "Hero product render",
      section: "Home / HeroManifesto",
      purpose: "Create immediate product recognition and premium atmosphere.",
      placement: "Primary hero visual region",
      acceptance: ["Paper-like object silhouette", "No tablet chrome", "No colorful app UI"],
    },
    {
      id: "object-closeups",
      title: "Object close-up studies",
      section: "Home / ObjectReveal",
      purpose: "Show thinness, material, and monochrome readability.",
      placement: "Object reveal media container",
      acceptance: ["Multiple angles", "Text-first display", "No ordering interface"],
    },
    {
      id: "category-diagram",
      title: "Category gap diagram",
      section: "Home / CategoryGap",
      purpose: "Clarify positioning between paper and intrusive digital systems.",
      placement: "Below category comparison cards",
      acceptance: ["Three-state comparison", "Readable at mobile sizes", "No exaggerated claims"],
    },
    {
      id: "service-flow-diagram",
      title: "Service flow diagram",
      section: "Home / ServiceFit",
      purpose: "Reinforce waiter-led operating model in one visual.",
      placement: "Below service flow steps",
      acceptance: ["Staff-controlled sequence", "No guest-side touch depiction", "Hospitality-first tone"],
    },
    {
      id: "future-roadmap-graphic",
      title: "Future-layer graphic",
      section: "Home / FutureLayer and Vision",
      purpose: "Depict staged ambition without implying current maturity.",
      placement: "Roadmap/future sections",
      acceptance: ["Clear stage labels", "Future claims marked as directional", "No false proof"],
    },
    {
      id: "founder-visual",
      title: "Founder portrait or signature",
      section: "Home / FounderNote and About",
      purpose: "Support human conviction while staying early-stage credible.",
      placement: "Founder note footer area",
      acceptance: ["Authentic source only", "Optional usage", "No fabricated team identity"],
    },
  ],
} satisfies AssetBrief;
