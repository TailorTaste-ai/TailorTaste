import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function PossibilityGrid({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal bg-cypress py-24 text-chalk">
      <Container className="space-y-12">
        <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card className="border-chalk/10 bg-chalk/8 shadow-none" key={item.title}>
              <h3 className="font-serif text-2xl text-chalk">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-chalk/70">{item.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
