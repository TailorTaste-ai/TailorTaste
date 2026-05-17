import Image from "next/image";
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

export function ObjectReveal({ eyebrow, title, body, principles }: ObjectRevealProps) {
  return (
    <section className="tt-reveal section-y">
      <Container className="grid gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16" width="wide">
        <div className="relative overflow-hidden border border-ink/10 bg-ink shadow-[0_40px_100px_rgba(20,23,21,0.18)] dark:border-chalk/15">
          <Image
            src="/menu-table-premium.png"
            alt="TailorTaste premium digital menu held at a fine dining table"
            width={800}
            height={600}
            className="aspect-[5/4] h-full w-full object-cover opacity-95"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden />
          <p className="tt-rail-label absolute bottom-5 left-5 text-chalk/75">
            Physical object. Software underneath.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-6 sm:gap-8">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <li
                className="border-l border-accent bg-chalk/60 px-4 py-3 text-sm font-semibold text-ink shadow-[0_14px_35px_rgba(20,23,21,0.06)] dark:bg-chalk/10 dark:text-chalk"
                key={principle}
              >
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
