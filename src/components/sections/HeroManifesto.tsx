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
    <section className="tt-reveal relative overflow-hidden bg-ink py-16 text-chalk sm:py-24 lg:py-28">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,250,241,0.08), transparent 34%), repeating-linear-gradient(90deg, rgba(255,250,241,0.055) 0 1px, transparent 1px 72px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent dark:from-ink" aria-hidden />
      <Container
        className="relative grid items-center gap-10 sm:gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        width="wide"
      >
        <div className="space-y-7 sm:space-y-9">
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="space-y-5 sm:space-y-6">
            <h1 className="tt-fluid-display max-w-4xl text-balance font-serif font-medium">
              {title}
            </h1>
            <p className="tt-fluid-body max-w-lg text-pretty text-chalk/74">
              {body}
            </p>
          </div>
          <ButtonCluster ctas={ctas} />
          <div className="grid max-w-xl grid-cols-3 border-y border-chalk/15 py-4 text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-chalk/55 lg:text-[0.68rem] lg:tracking-[0.18em]">
            <span className="flex min-h-10 items-center justify-center px-3">Paper ritual</span>
            <span className="flex min-h-10 items-center justify-center border-x border-chalk/15 px-3">
              Live control
            </span>
            <span className="flex min-h-10 items-center justify-center px-3">Premium table</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-5 border border-chalk/10" aria-hidden />
          <HeroMedia />
        </div>
      </Container>
    </section>
  );
}
