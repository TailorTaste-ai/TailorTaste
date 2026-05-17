import Image from "next/image";
import type { FounderProfile } from "@/lib/site";

type FounderTeamProps = {
  founders: FounderProfile[];
};

export function FounderTeam({ founders }: FounderTeamProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {founders.map((founder) => (
        <article
          className="tt-luxury-card rounded-[8px] p-4 sm:p-5"
          key={founder.linkedin}
        >
          <FounderPortrait founder={founder} />

          <div className="px-1 pt-5 sm:px-2">
            <h3 className="font-serif text-2xl leading-tight text-ink dark:text-chalk">
              <a
                className="underline decoration-accent/50 underline-offset-4 transition hover:text-accent hover:decoration-accent"
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {founder.name}
              </a>
            </h3>
            <p className="tt-rail-label mt-3 text-accent">{founder.role}</p>
            <p className="mt-4 text-sm leading-6 text-graphite dark:text-chalk/75">{founder.summary}</p>

            <div className="mt-5 border-t border-ink/10 pt-5 dark:border-chalk/15">
              <p className="tt-rail-label text-graphite/70 dark:text-chalk/50">
                Founder edge
              </p>
              <ul className="mt-3 grid gap-2">
                {founder.focusAreas.map((focusArea) => (
                  <li className="flex gap-3 text-sm leading-6 text-graphite dark:text-chalk/75" key={focusArea}>
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{focusArea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function FounderPortrait({ founder }: { founder: FounderProfile }) {
  const { portrait } = founder;

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-ink/10 bg-mist dark:border-chalk/15 dark:bg-ink/80">
      {portrait.src ? (
        <Image
          alt={portrait.alt}
          className="object-cover"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          src={portrait.src}
        />
      ) : (
        <div
          aria-label={portrait.alt}
          className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
          role="img"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-ink/10 bg-chalk font-serif text-3xl text-ink dark:border-chalk/15 dark:bg-chalk/10 dark:text-chalk">
            {portrait.initials}
          </div>
          <p className="tt-rail-label tt-founder-portrait-label">
            {portrait.placeholder}
          </p>
        </div>
      )}
    </div>
  );
}
