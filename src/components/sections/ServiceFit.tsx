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
    <section className="tt-reveal tt-section-panel section-y">
      <Container className="space-y-10 sm:space-y-12">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} align="center" />
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div className="tt-luxury-card rounded-[8px] bg-paper/70 p-5 text-center shadow-[0_18px_45px_rgba(20,23,21,0.07)] sm:p-6 dark:bg-chalk/10" key={step}>
              <p className="mx-auto mb-4 flex size-9 items-center justify-center rounded-full bg-ink text-sm text-chalk sm:mb-5 sm:size-10 dark:bg-chalk dark:text-ink">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-xl text-ink sm:text-2xl dark:text-chalk">{step}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
