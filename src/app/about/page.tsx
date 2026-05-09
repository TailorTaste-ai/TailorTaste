import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderFit } from "@/components/sections/FounderFit";
import { FounderTeam } from "@/components/sections/FounderTeam";
import { aboutPage } from "@/content/about";
import { buildPageMetadata } from "@/lib/metadata";
import type { FeatureItem, MetricItem, SectionIntro } from "@/lib/site";

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
      <section className="border-b border-ink/10 py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="space-y-8">
            <SectionHeader as="h1" {...aboutPage.hero} />
            <div className="grid gap-3">
              {aboutPage.hero.items.map((item) => (
                <article className="rounded-[8px] border border-ink/10 bg-chalk p-5" key={item.title}>
                  <h2 className="font-serif text-xl leading-tight text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
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
          <MetricGrid {...aboutPage.trackRecord} />
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-chalk py-24">
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
          <article className="rounded-[8px] border border-ink/10 bg-paper p-6" key={item.title}>
            <h3 className="font-serif text-xl leading-tight text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function MetricGrid({ eyebrow, title, body, items }: SectionIntro & { items: MetricItem[] }) {
  return (
    <div className="space-y-8 border-t border-ink/10 pt-12">
      <div className="max-w-3xl space-y-4">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="tt-fluid-heading text-balance font-serif text-ink">{title}</h2>
        {body ? <p className="tt-fluid-body text-pretty text-graphite">{body}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article className="rounded-[8px] border border-ink/10 bg-chalk p-5" key={item.label}>
            <p className="text-xs font-medium uppercase text-accent">{item.label}</p>
            <p className="mt-3 font-serif text-3xl leading-tight text-ink">{item.value}</p>
            <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
