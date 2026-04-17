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
    <section className="tt-reveal relative overflow-hidden bg-ink py-16 text-chalk sm:py-24 lg:py-32">
      <Container
        className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        width="wide"
      >
        <div className="space-y-6 sm:space-y-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="space-y-5 sm:space-y-6">
            <h1 className="max-w-4xl text-balance font-serif text-[2.25rem] leading-[1.08] sm:text-5xl sm:leading-[1.05] lg:text-6xl xl:text-7xl xl:leading-none">
              {title}
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-7 text-chalk/75 sm:text-lg sm:leading-8">
              {body}
            </p>
          </div>
          <ButtonCluster ctas={ctas} />
        </div>
        <HeroMedia />
      </Container>
    </section>
  );
}
