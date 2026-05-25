import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { legalNoticeSections, legalUpdated } from "@/content/legal";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(
  "Legal",
  "/legal",
  "Legal notice and website operator information for TailorTaste.",
);

export default function LegalPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Legal Notice"
      intro="This page gives the operator and rights information for the TailorTaste website."
      updated={legalUpdated}
      sections={legalNoticeSections}
    />
  );
}
