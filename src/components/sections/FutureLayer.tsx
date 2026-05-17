import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

type FutureLayerProps = {
  eyebrow: string;
  title: string;
  body: string;
  steps: Array<{
    title: string;
    body: string;
  }>;
};

export function FutureLayer({ eyebrow, title, body, steps }: FutureLayerProps) {
  return (
    <section className="tt-reveal section-y">
      <Container className="space-y-10 sm:space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div className="tt-luxury-card rounded-[8px] p-5" key={step.title}>
              <p className="tt-rail-label text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-serif text-xl leading-tight text-ink dark:text-chalk">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-graphite dark:text-chalk/70">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
