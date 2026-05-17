import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { finalCta } from "@/content/home";
import { futurePage } from "@/content/future";
import { roadmapStages } from "@/content/roadmap";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("Future", "/future");

export default function FuturePage() {
  return (
    <>
      <section className="section-y">
        <Container className="space-y-10 sm:space-y-12">
          <SectionHeader as="h1" {...futurePage.hero} />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {roadmapStages.map((stage) => (
              <Card className="shadow-none" key={stage.title}>
                <p className="text-xs font-semibold uppercase text-accent">{stage.horizon}</p>
                <h2 className="mt-3 font-serif text-xl text-ink sm:text-2xl">{stage.title}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite">{stage.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-chalk section-y">
        <Container className="space-y-8 sm:space-y-10">
          <SectionHeader {...futurePage.framing} />
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {futurePage.stageLanguage.map((label) => (
              <span
                className="tt-micro-block rounded-[8px] border border-ink/10 bg-paper px-3 py-2 text-xs font-medium uppercase text-ink"
                key={label}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {futurePage.roadmapNotes.map((item) => (
              <Card className="shadow-none" key={item.question}>
                <h3 className="font-serif text-xl text-ink sm:text-2xl">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{item.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA {...finalCta} />
    </>
  );
}
