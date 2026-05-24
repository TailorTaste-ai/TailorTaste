import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { contactPage } from "@/content/contact";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(
  "Contact for Restaurant and Hotel Pilots",
  "/contact",
  "Contact TailorTaste about pilot venues, hotel and restaurant workflows, partnerships, investor questions, or collaboration.",
  {
    keywords: ["restaurant pilot", "hotel pilot", "hospitality partnership", "TailorTaste contact"],
  }
);

export default function ContactPage() {
  return (
    <section className="section-y">
      <Container className="grid gap-10 md:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="space-y-6 sm:space-y-8">
          <SectionHeader as="h1" {...contactPage.hero} />
          <div className="tt-micro-block rounded-[8px] border border-ink/10 bg-chalk p-5 text-sm leading-6 text-graphite sm:p-6">
            {contactPage.deliveryNote}
          </div>
        </div>
        <ContactForm inquiryTypes={contactPage.inquiryTypes} />
      </Container>
    </section>
  );
}
