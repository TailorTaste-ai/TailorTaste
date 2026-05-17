import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

export function CategoryGap({
  eyebrow,
  title,
  body,
  items,
}: SectionIntro & { items: FeatureItem[] }) {
  return (
    <section className="tt-reveal tt-reveal-delay-1 tt-section-panel section-y">
      <Container className="space-y-10 sm:space-y-12">
        <div className="relative">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} align="center" />
        </div>

        <div className="relative mx-auto grid max-w-6xl border border-ink/10 bg-paper/55 shadow-[0_32px_80px_rgba(20,23,21,0.09)] md:grid-cols-3">
          {items.map((item, index) => (
            <CategoryPosition
              emphasis={item.title === "TailorTaste"}
              index={index}
              item={item}
              key={item.title}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryPosition({
  emphasis,
  index,
  item,
}: {
  emphasis: boolean;
  index: number;
  item: FeatureItem;
}) {
  return (
    <article
      className={`tt-category-tile relative p-6 text-left sm:p-8 md:p-10 ${
        emphasis ? "tt-category-tile-emphasis bg-ink text-chalk" : ""
      } ${
        index > 0 ? "border-t border-ink/10 md:border-l md:border-t-0" : ""
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          emphasis ? "text-chalk/55" : "text-graphite/60"
        }`}
      >
        {item.title}
      </p>
      <p
        className={`mt-4 max-w-[24ch] font-serif text-2xl leading-tight sm:text-3xl ${
          emphasis ? "font-medium text-chalk" : "font-normal text-ink"
        }`}
      >
        {item.body}
      </p>
    </article>
  );
}
