import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

type ServiceFitProps = {
  eyebrow: string;
  title: string;
  body: string;
  steps: string[];
  diagramPlaceholder?: string;
};

export function ServiceFit({ eyebrow, title, body, steps, diagramPlaceholder }: ServiceFitProps) {
  return (
    <section className="tt-reveal bg-chalk section-y">
      <Container className="space-y-10 sm:space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} align="center" />
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div className="rounded-md border border-ink/10 bg-paper p-5 text-center sm:p-6" key={step}>
              <p className="mx-auto mb-4 flex size-9 items-center justify-center rounded-md bg-ink text-sm text-chalk sm:mb-5 sm:size-10">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-xl text-ink sm:text-2xl">{step}</h3>
            </div>
          ))}
        </div>
        {diagramPlaceholder ? (
          <div className="rounded-[8px] border border-dashed border-ink/20 bg-paper px-5 py-4 text-sm text-graphite">
            {diagramPlaceholder}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
