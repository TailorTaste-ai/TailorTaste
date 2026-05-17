import type { CTA } from "@/lib/site";
import { ButtonCluster } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";

type FinalCTAProps = {
  eyebrow: string;
  title: string;
  body: string;
  ctas: CTA[];
};

export function FinalCTA({ eyebrow, title, body, ctas }: FinalCTAProps) {
  return (
    <section className="tt-reveal relative overflow-hidden bg-ink section-y text-chalk">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,250,241,0.055) 0 1px, transparent 1px 80px), linear-gradient(130deg, rgba(138,91,55,0.18), transparent 38%, rgba(18,58,52,0.28))",
        }}
        aria-hidden
      />
      <Container className="relative space-y-6 text-center sm:space-y-8" width="narrow">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="tt-fluid-display text-balance font-serif font-medium">
          {title}
        </h2>
        <p className="tt-fluid-body mx-auto max-w-2xl text-pretty text-chalk/75">{body}</p>
        <div className="flex justify-center">
          <ButtonCluster ctas={ctas} />
        </div>
      </Container>
    </section>
  );
}
