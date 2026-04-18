import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderTeam } from "@/components/sections/FounderTeam";
import { aboutPage } from "@/content/about";
import { finalCta } from "@/content/home";
import { roadmapStages } from "@/content/roadmap";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("About", "/about");

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-y">
        <Container className="space-y-6">
          <SectionHeader as="h1" {...aboutPage.hero} />
        </Container>
      </section>

      {/* Mission — full-width accent band */}
      <section className="bg-cypress section-y-tight text-chalk">
        <Container className="space-y-4 sm:space-y-6">
          <p className="text-xs font-semibold uppercase text-chalk/60">
            {aboutPage.mission.eyebrow}
          </p>
          <h2 className="tt-fluid-heading max-w-3xl text-balance font-serif text-chalk">
            {aboutPage.mission.title}
          </h2>
          <p className="tt-fluid-body max-w-2xl text-pretty text-chalk/75">
            {aboutPage.mission.body}
          </p>
        </Container>
      </section>

      {/* Vision */}
      <section className="section-y">
        <Container className="space-y-10 sm:space-y-12">
          <SectionHeader {...aboutPage.vision} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.vision.items.map((item) => (
              <div
                className="rounded-[8px] border border-ink/10 bg-chalk px-5 py-5"
                key={item.title}
              >
                <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why now */}
      <section className="border-y border-ink/10 bg-chalk section-y">
        <Container className="space-y-10 sm:space-y-12">
          <SectionHeader {...aboutPage.whyNow} />
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutPage.whyNow.items.map((item) => (
              <Card className="shadow-none" key={item.title}>
                <h3 className="font-serif text-lg text-ink sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Roadmap */}
      <section className="bg-ink section-y text-chalk">
        <Container className="space-y-8 sm:space-y-10">
          <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
            <SectionHeader
              eyebrow="Object to system"
              title="The menu is the wedge, not the endpoint."
              body="The first phase is a credible hardware object. Over time, the supporting software layer can expand carefully into operations and intelligence."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {roadmapStages.map((stage) => (
              <div
                className="rounded-[8px] border border-chalk/10 bg-chalk/[0.06] p-5 sm:p-6"
                key={stage.title}
              >
                <p className="text-xs font-semibold uppercase text-chalk/60">{stage.horizon}</p>
                <h3 className="mt-3 font-serif text-lg text-chalk sm:text-xl">{stage.title}</h3>
                <p className="mt-3 text-sm leading-6 text-chalk/70">{stage.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Founders */}
      <section className="section-y">
        <Container className="space-y-10 sm:space-y-12">
          <SectionHeader {...aboutPage.founderNote} />
          <FounderTeam founders={aboutPage.founders} />
        </Container>
      </section>

      {/* Stage + Conversation fit */}
      <section className="border-t border-ink/10 bg-chalk section-y">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div className="space-y-4">
              <Eyebrow>{aboutPage.stage.eyebrow!}</Eyebrow>
              <h3 className="tt-fluid-subheading font-serif text-ink">{aboutPage.stage.title}</h3>
              <p className="text-sm leading-6 text-graphite">{aboutPage.stage.body}</p>
            </div>
            <div className="space-y-4">
              <Eyebrow>{aboutPage.conversationFit.eyebrow!}</Eyebrow>
              <h3 className="tt-fluid-subheading font-serif text-ink">
                {aboutPage.conversationFit.title}
              </h3>
              <p className="text-sm leading-6 text-graphite">{aboutPage.conversationFit.body}</p>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA {...finalCta} />
    </>
  );
}
