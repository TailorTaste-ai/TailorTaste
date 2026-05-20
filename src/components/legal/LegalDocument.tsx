import Link from "next/link";
import { Container } from "@/components/primitives/Container";

export type LegalSection = {
  title: string;
  body?: string;
  items?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalDocument({ eyebrow, title, intro, updated, sections }: LegalDocumentProps) {
  return (
    <section className="section-y">
      <Container className="max-w-4xl space-y-10">
        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          <div className="space-y-4">
            <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl dark:text-chalk">
              {title}
            </h1>
            <p className="tt-fluid-body max-w-3xl text-graphite dark:text-chalk/75">{intro}</p>
            <p className="text-sm text-graphite/70 dark:text-chalk/60">Last updated: {updated}</p>
          </div>
        </header>

        <div className="space-y-5">
          {sections.map((section) => (
            <article className="border-t border-ink/10 pt-6 dark:border-chalk/15" key={section.title}>
              <h2 className="font-serif text-2xl font-medium text-ink dark:text-chalk">{section.title}</h2>
              {section.body ? (
                <p className="mt-3 text-sm leading-7 text-graphite dark:text-chalk/75">
                  <RichText text={section.body} />
                </p>
              ) : null}
              {section.items ? (
                <ul className="mt-4 space-y-2 text-sm leading-7 text-graphite dark:text-chalk/75">
                  {section.items.map((item) => (
                    <li className="pl-4 [text-indent:-1rem]" key={item}>
                      <span aria-hidden="true">- </span>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {parts.map((part) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) {
          return part;
        }

        const [, label, href] = match;
        return (
          <Link className="underline decoration-ink/30 underline-offset-4 hover:text-ink" href={href} key={part}>
            {label}
          </Link>
        );
      })}
    </>
  );
}
