import type { Metadata } from "next";
import { ButtonCluster } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { finalCta } from "@/content/home";
import { partnershipCta, primaryCta } from "@/content/ctas";
import { roadmapStages } from "@/content/roadmap";
import { visionPage } from "@/content/vision";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("Vision", "/vision");

export default function VisionPage() {
  return (
    <>
      <section className="py-24">
        <Container className="space-y-12">
          <SectionHeader as="h1" {...visionPage.hero} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="space-y-8 shadow-none">
              <SectionHeader {...visionPage.category} />
              <div className="space-y-3">
                {visionPage.category.items.map((item) => (
                  <div className="rounded-[8px] border border-ink/10 bg-paper px-4 py-3" key={item.title}>
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="space-y-8 shadow-none">
              <SectionHeader {...visionPage.beachhead} />
              <div className="space-y-3">
                {visionPage.beachhead.items.map((item) => (
                  <div className="rounded-[8px] border border-ink/10 bg-paper px-4 py-3" key={item.title}>
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-cypress py-24 text-chalk">
        <Container className="space-y-10">
          <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
            <SectionHeader {...visionPage.roadmapIntro} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roadmapStages.map((stage) => (
              <Card className="border-chalk/10 bg-chalk/8 shadow-none" key={stage.title}>
                <p className="text-xs font-semibold uppercase text-chalk/75">{stage.horizon}</p>
                <h3 className="mt-3 font-serif text-2xl text-chalk">{stage.title}</h3>
                <p className="mt-3 text-sm leading-6 text-chalk/70">{stage.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Future discipline"
            title="Ambition is real, timing is disciplined."
            body="Future software expansion follows the product wedge. Inventory-linked changes, pricing suggestions, and deeper intelligence are long-term directions."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {visionPage.futureSignals.map((item) => (
              <Card className="shadow-none" key={item.title}>
                <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
              </Card>
            ))}
          </div>
          <ButtonCluster ctas={[partnershipCta, primaryCta]} />
        </Container>
      </section>

      <FinalCTA {...finalCta} />
    </>
  );
}
