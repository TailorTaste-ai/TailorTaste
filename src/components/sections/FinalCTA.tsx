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
    <section className="tt-reveal bg-ink py-24 text-chalk">
      <Container className="space-y-8 text-center" width="narrow">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
        <p className="mx-auto max-w-2xl text-base leading-7 text-chalk/75">{body}</p>
        <div className="flex justify-center">
          <ButtonCluster ctas={ctas} />
        </div>
      </Container>
    </section>
  );
}
