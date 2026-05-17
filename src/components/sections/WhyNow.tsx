import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function WhyNow({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal tt-reveal-delay-2 section-y">
      <Container className="space-y-10 sm:space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <Card className="shadow-none" key={item.title}>
              <p className="tt-rail-label text-accent/75">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
