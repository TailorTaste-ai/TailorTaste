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
      <Container className="grid gap-10 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="overflow-hidden rounded-[12px] border border-ink/10 bg-chalk shadow-soft">
          <Image
            src="/menu-table.png"
            alt="TailorTaste premium digital menu held at a fine dining table"
            width={800}
            height={600}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-6 sm:gap-8">
          <SectionHeader eyebrow={eyebrow} title={title} body={body} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <li
                className="rounded-[8px] border border-ink/10 bg-chalk px-4 py-3 text-sm font-medium text-ink"
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
