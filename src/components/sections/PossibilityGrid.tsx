import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function PossibilityGrid({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal bg-cypress section-y text-chalk">
      <Container className="space-y-10 sm:space-y-12">
        <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              className="rounded-[8px] border border-chalk/15 bg-chalk/[0.04] p-5 backdrop-blur-sm sm:p-6"
              key={item.title}
            >
              <h3 className="font-serif text-xl text-chalk sm:text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-chalk/70">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
