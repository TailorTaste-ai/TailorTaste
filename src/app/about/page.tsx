import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderFit } from "@/components/sections/FounderFit";
import { FounderTeam } from "@/components/sections/FounderTeam";
import { aboutPage } from "@/content/about";
import { buildPageMetadata } from "@/lib/metadata";
import type { FeatureItem, SectionIntro } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata("About", "/about");

export default function AboutPage() {
  const closingCta = {
    eyebrow: aboutPage.closingCta.eyebrow ?? "Closing",
    title: aboutPage.closingCta.title,
    body: aboutPage.closingCta.body ?? "",
    ctas: [aboutPage.closingCta.cta],
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 py-16 sm:py-20 lg:py-24 dark:border-chalk/10">
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-chalk/70 to-transparent dark:hidden" aria-hidden />
        <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="relative space-y-8">
            <SectionHeader as="h1" {...aboutPage.hero} />
            <div className="grid gap-3">
              {aboutPage.hero.items.map((item, index) => (
                <article className="tt-micro-block tt-about-hero-card border-l border-accent p-5 shadow-[0_18px_45px_rgba(20,23,21,0.07)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.22)]" key={item.title}>
                  <p className="tt-rail-label mb-4 text-accent/70">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="font-serif text-xl leading-tight text-ink dark:text-chalk">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-graphite dark:text-chalk/70">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <FounderTeam founders={aboutPage.founders} />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="space-y-14">
          <FounderFit {...aboutPage.founderFit} />
        </Container>
      </section>

      <section className="tt-section-panel tt-section-panel-clean py-24">
        <Container className="space-y-16">
          <FeatureGrid {...aboutPage.domainComplement} />
          <FeatureGrid {...aboutPage.operatingStyle} />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeader {...aboutPage.currentFocus} />
        </Container>
      </section>

      <FinalCTA {...closingCta} />
    </>
  );
}

function FeatureGrid({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <div className="space-y-8">
      <SectionHeader eyebrow={eyebrow} title={title} body={body} />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article className="tt-luxury-card rounded-[8px] p-6" key={item.title}>
            <h3 className="font-serif text-xl leading-tight text-ink dark:text-chalk">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-graphite dark:text-chalk/75">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
