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
    <section className="tt-reveal bg-ink section-y text-chalk">
      <Container className="space-y-6 text-center sm:space-y-8" width="narrow">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-balance font-serif text-[2rem] leading-[1.1] sm:text-4xl sm:leading-tight md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-base leading-7 text-chalk/75">{body}</p>
        <div className="flex justify-center">
          <ButtonCluster ctas={ctas} />
        </div>
      </Container>
    </section>
  );
}
