import type { ContactPageContent } from "@/lib/site";

export const contactInquiryTypes = [
  "Pilot venue / hotel",
  "Investor / advisor",
  "Strategic partner",
  "Builder / collaborator",
  "Press / media",
  "Other",
] as const;

export const contactPage = {
  hero: {
    eyebrow: "Contact",
    title: "Bring a real service context.",
    body: "The most useful conversations are specific: a venue, a pilot constraint, a partnership angle, or a question about whether TailorTaste belongs in a premium hospitality workflow.",
  },
  deliveryNote:
    "Share enough context to make the follow up concrete: venue type, service setting, guest mix, or the decision you are trying to make.",
  inquiryTypes: contactInquiryTypes,
} satisfies ContactPageContent;
