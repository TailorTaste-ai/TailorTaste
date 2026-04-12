import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function WhyNow({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal tt-reveal-delay-2 bg-chalk py-24">
      <Container className="space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <Card className="shadow-none" key={item.title}>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
