import { Eyebrow } from "@/components/primitives/Eyebrow";
import type { FeatureItem, SectionIntro } from "@/lib/site";

type FounderFitProps = SectionIntro & {
  items: FeatureItem[];
};

export function FounderFit({ eyebrow, title, body, items }: FounderFitProps) {
  return (
    <div className="space-y-8 border-t border-ink/10 pt-12">
      <div className="max-w-2xl space-y-4">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h3 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">{title}</h3>
        {body ? <p className="text-sm leading-6 text-graphite sm:text-base sm:leading-7">{body}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <article className="tt-luxury-card rounded-[8px] p-5" key={item.title}>
            <p className="tt-rail-label text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-4 font-serif text-xl leading-tight text-ink">{item.title}</h4>
            <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
