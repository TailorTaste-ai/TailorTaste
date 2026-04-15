import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

type ServiceFitProps = {
  eyebrow: string;
  title: string;
  body: string;
  steps: string[];
};

export function ServiceFit({ eyebrow, title, body, steps }: ServiceFitProps) {
  return (
    <section className="tt-reveal bg-chalk py-24">
      <Container className="space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} align="center" />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div className="rounded-md border border-ink/10 bg-paper p-6 text-center" key={step}>
              <p className="mx-auto mb-5 flex size-10 items-center justify-center rounded-md bg-ink text-sm text-chalk">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-2xl text-ink">{step}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
