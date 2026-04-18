import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderTeam } from "@/components/sections/FounderTeam";
import { aboutPage } from "@/content/about";
import { buildPageMetadata } from "@/lib/metadata";

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
      <section className="py-24">
        <Container className="space-y-6">
          <SectionHeader as="h1" {...aboutPage.opening} />
        </Container>
      </section>

      <section className="bg-cypress py-20 text-chalk">
        <Container className="space-y-6">
          <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
            <SectionHeader {...aboutPage.whyWeCare} />
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="space-y-12">
          <SectionHeader {...aboutPage.whatWeSaw} />
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-chalk py-24">
        <Container className="space-y-12">
          <SectionHeader {...aboutPage.whatWeBelieve} />
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutPage.whatWeBelieve.items.map((item) => (
              <Card className="shadow-none" key={item.title}>
                <h3 className="font-serif text-xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="space-y-10">
          <SectionHeader {...aboutPage.buildPhilosophy} />
        </Container>
      </section>

      <section className="bg-ink py-24 text-chalk">
        <Container className="space-y-12">
          <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
            <SectionHeader {...aboutPage.whatItIsNot} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutPage.whatItIsNot.items.map((item) => (
              <div
                className="rounded-[8px] border border-chalk/10 bg-chalk/8 p-6"
                key={item.title}
              >
                <h3 className="font-serif text-xl text-chalk">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-chalk/75">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="space-y-12">
          <SectionHeader {...aboutPage.foundersIntro} />
          <FounderTeam founders={aboutPage.founders} />
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-chalk py-24">
        <Container className="space-y-12">
          <SectionHeader {...aboutPage.whereWeAreNow} />
        </Container>
      </section>

      <FinalCTA {...closingCta} />
    </>
  );
}
