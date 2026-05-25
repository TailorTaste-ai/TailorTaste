import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { legalUpdated, termsSections } from "@/content/legal";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(
  "Terms",
  "/terms",
  "Terms for using the TailorTaste website.",
);

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms"
      title="Terms of Use"
      intro="These terms govern use of the TailorTaste website while the product and pilot program are being developed."
      updated={legalUpdated}
      sections={termsSections}
    />
  );
}
