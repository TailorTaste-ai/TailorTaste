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
    <section className="tt-reveal bg-chalk py-24">
      <Container width="narrow">
        <div className="rounded-md border border-ink/10 bg-paper p-8 shadow-soft sm:p-10">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
          <p className="mt-8 text-sm font-medium text-accent">{visualLabel ?? "Founder note placeholder"}</p>
        </div>
      </Container>
    </section>
  );
}
