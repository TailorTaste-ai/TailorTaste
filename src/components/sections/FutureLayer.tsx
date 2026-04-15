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
    <section className="tt-reveal py-24">
      <Container className="space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <div className="grid gap-3 md:grid-cols-4">
          {steps.map((step) => (
            <div className="rounded-md border border-ink/10 bg-chalk p-5" key={step}>
              <p className="text-sm font-medium text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
