import type { CTA } from "@/lib/site";
import { ButtonCluster } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { HeroMedia } from "@/components/three/HeroMedia";

type HeroManifestoProps = {
  eyebrow: string;
  title: string;
  body: string;
  ctas: CTA[];
  mediaLabel?: string;
  mediaDescription?: string;
};

export function HeroManifesto({ eyebrow, title, body, ctas }: HeroManifestoProps) {
  return (
    <section className="tt-reveal relative overflow-hidden bg-ink py-24 text-chalk sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]" width="wide">
        <div className="space-y-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="space-y-6">
            <h1 className="max-w-4xl font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-chalk/75">{body}</p>
          </div>
          <ButtonCluster ctas={ctas} />
        </div>
        <HeroMedia />
      </Container>
    </section>
  );
}
