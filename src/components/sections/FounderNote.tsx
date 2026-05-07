import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";

type FounderNoteProps = {
  eyebrow: string;
  title: string;
  body: string;
  visualLabel?: string;
};

export function FounderNote({ eyebrow, title, body, visualLabel }: FounderNoteProps) {
  return (
    <section className="tt-reveal bg-chalk section-y">
      <Container width="narrow">
        <div className="rounded-md border border-ink/10 bg-paper p-6 shadow-soft sm:p-8 md:p-10">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
          {visualLabel ? (
            <p className="mt-6 text-sm font-medium text-accent sm:mt-8">{visualLabel}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
