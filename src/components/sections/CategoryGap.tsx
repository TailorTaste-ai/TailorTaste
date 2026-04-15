import type { FeatureItem, SectionIntro } from "@/lib/site";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { CategoryDiagram } from "./CategoryDiagram";

export function CategoryGap({
  eyebrow,
  title,
  body,
  items,
}: SectionIntro & { items: FeatureItem[]; diagramPlaceholder?: string }) {
  return (
    <section className="tt-reveal tt-reveal-delay-1 py-24">
      <Container className="space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} align="center" />
        <CategoryDiagram />
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Card className="space-y-3" key={item.title}>
              <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
              <p className="text-sm leading-6 text-graphite">{item.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
