import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function DreamOutcomes({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal section-y">
      <Container className="grid gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="tt-luxury-card divide-y divide-ink/10 rounded-[8px]">
          {items.map((item) => (
            <div className="tt-micro-block p-5 sm:p-6" key={item.title}>
              <h3 className="font-serif text-xl font-medium leading-tight text-ink sm:text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
