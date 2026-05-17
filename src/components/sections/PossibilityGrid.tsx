import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function PossibilityGrid({ eyebrow, title, body, items }: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal relative overflow-hidden bg-cypress section-y text-chalk">
      <div className="absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(90deg, rgba(255,250,241,0.12) 0 1px, transparent 1px 88px)" }} aria-hidden />
      <Container className="relative space-y-10 sm:space-y-12">
        <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              className="border border-chalk/15 bg-chalk/[0.055] p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-chalk/[0.08] sm:p-6"
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
