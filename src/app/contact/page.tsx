import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { contactPage } from "@/content/contact";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("Contact", "/contact");

export default function ContactPage() {
  return (
    <section className="py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-8">
          <SectionHeader as="h1" {...contactPage.hero} />
          <div className="rounded-[8px] border border-ink/10 bg-chalk p-6 text-sm leading-6 text-graphite">
            {contactPage.deliveryNote}
          </div>
        </div>
        <ContactForm inquiryTypes={contactPage.inquiryTypes} />
      </Container>
    </section>
  );
}
