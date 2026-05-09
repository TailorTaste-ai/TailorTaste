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
    <section className="tt-reveal tt-reveal-delay-1 section-y">
      <Container className="space-y-10 sm:space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} align="center" />

        <div className="mx-auto grid max-w-5xl border-y border-ink/10 md:grid-cols-3">
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
      className={`py-7 text-left sm:py-8 md:px-8 md:py-10 ${
        index > 0 ? "border-t border-ink/10 md:border-l md:border-t-0" : ""
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          emphasis ? "text-accent" : "text-graphite/60"
        }`}
      >
        {item.title}
      </p>
      <p
        className={`mt-4 max-w-[24ch] font-serif text-2xl leading-tight sm:text-3xl ${
          emphasis ? "font-semibold text-accent" : "font-normal text-ink"
        }`}
      >
        {item.body}
      </p>
    </article>
  );
}
