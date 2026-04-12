import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

type ObjectRevealProps = {
  eyebrow: string;
  title: string;
  body: string;
  principles: string[];
  mediaLabel?: string;
  mediaDescription?: string;
};

export function ObjectReveal({ eyebrow, title, body, principles, mediaLabel, mediaDescription }: ObjectRevealProps) {
  return (
    <section className="tt-reveal py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-md border border-ink/10 bg-chalk p-5 shadow-soft">
          <div className="flex min-h-[420px] items-center justify-center rounded-md border border-dashed border-ink/20 bg-paper text-center">
            <div className="max-w-xs space-y-3 px-5">
              <p className="font-serif text-3xl">{mediaLabel ?? "Object reveal placeholder"}</p>
              <p className="text-sm leading-6 text-graphite">{mediaDescription ?? "Side profile, close-up details, or e-paper concept render."}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-8">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
          <div className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <div className="rounded-md border border-ink/10 bg-chalk px-4 py-3 text-sm font-medium text-ink" key={principle}>
                {principle}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
