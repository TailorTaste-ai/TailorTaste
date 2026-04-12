import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function DreamOutcomes({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="divide-y divide-ink/10 rounded-md border border-ink/10 bg-chalk">
          {items.map((item) => (
            <div className="p-6" key={item.title}>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
