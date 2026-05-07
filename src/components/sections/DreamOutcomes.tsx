import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function DreamOutcomes({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal section-y">
      <Container className="grid gap-10 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="divide-y divide-ink/10 rounded-md border border-ink/10 bg-chalk">
          {items.map((item) => (
            <div className="p-5 sm:p-6" key={item.title}>
              <h3 className="text-base font-semibold text-ink sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
