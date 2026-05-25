import type { Metadata } from "next";
import Script from "next/script";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faqPage } from "@/content/faq";
import { finalCta } from "@/content/home";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(
  "FAQ",
  "/faq",
  "Answers about TailorTaste pilots, staff controls, menu language switching, dietary notes, guest experience, and restaurant workflow fit.",
  {
    keywords: ["menu pilot FAQ", "restaurant menu FAQ", "staff controlled menu FAQ"],
  }
);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqPage.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Script
        id="tailor-taste-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="section-y">
        <Container className="space-y-8 sm:space-y-10">
          <SectionHeader as="h1" {...faqPage.hero} />
          <div className="grid gap-4">
            {faqPage.items.map((item) => (
              <Card className="shadow-none" key={item.question}>
                <details className="group">
                  <summary className="cursor-pointer list-none font-serif text-xl text-ink sm:text-2xl dark:text-chalk">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-graphite dark:text-chalk/75">{item.answer}</p>
                </details>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <FinalCTA {...finalCta} />
    </>
  );
}
