import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faqPage } from "@/content/faq";
import { finalCta } from "@/content/home";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("FAQ", "/faq");

export default function FaqPage() {
  return (
    <>
      <section className="py-24">
        <Container className="space-y-10">
          <SectionHeader as="h1" {...faqPage.hero} />
          <div className="grid gap-4">
            {faqPage.items.map((item) => (
              <Card className="shadow-none" key={item.question}>
                <details className="group">
                  <summary className="cursor-pointer list-none font-serif text-2xl text-ink">{item.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-graphite">{item.answer}</p>
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
