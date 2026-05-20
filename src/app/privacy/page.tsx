import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { legalUpdated, privacySections } from "@/content/legal";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(
  "Privacy Policy",
  "/privacy",
  "How TailorTaste handles contact inquiries, analytics, cookies, and related website data.",
);

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy explains what data this website collects, why it is used, and how to contact us about it."
      updated={legalUpdated}
      sections={privacySections}
    />
  );
}
