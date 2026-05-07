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
    title: "Start the right conversation.",
    body: "Reach out if you are exploring pilot hospitality deployments, strategic partnership, or early-stage support around the TailorTaste category.",
  },
  deliveryNote:
    "Inquiries are delivered through a server-side contact pipeline. If delivery is temporarily unavailable, the form will show a clear retry message.",
  inquiryTypes: contactInquiryTypes,
} satisfies ContactPageContent;
