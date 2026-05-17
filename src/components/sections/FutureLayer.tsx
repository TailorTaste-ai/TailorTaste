import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

type FutureLayerProps = {
  eyebrow: string;
  title: string;
  body: string;
  steps: string[];
};

export function FutureLayer({ eyebrow, title, body, steps }: FutureLayerProps) {
  return (
    <section className="tt-reveal section-y">
      <Container className="space-y-10 sm:space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div className="tt-luxury-card rounded-[8px] p-5" key={step}>
              <p className="tt-rail-label text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
