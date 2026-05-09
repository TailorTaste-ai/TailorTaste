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
          className="rounded-[8px] border border-ink/10 bg-chalk p-4 shadow-soft sm:p-5"
          key={founder.linkedin}
        >
          <FounderPortrait founder={founder} />

          <div className="px-1 pt-5 sm:px-2">
            <h3 className="font-serif text-2xl leading-tight text-ink">
              <a
                className="underline decoration-accent/50 underline-offset-4 transition hover:text-accent hover:decoration-accent"
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {founder.name}
              </a>
            </h3>
            <p className="mt-2 text-sm font-medium leading-6 text-accent">{founder.role}</p>
            <p className="mt-4 text-sm leading-6 text-graphite">{founder.summary}</p>

            <div className="mt-5 border-t border-ink/10 pt-5">
              <p className="text-xs font-medium uppercase text-graphite">
                Founder edge
              </p>
              <ul className="mt-3 grid gap-2">
                {founder.focusAreas.map((focusArea) => (
                  <li className="flex gap-3 text-sm leading-6 text-graphite" key={focusArea}>
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
    <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] border border-ink/10 bg-mist">
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
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-ink/10 bg-chalk font-serif text-3xl text-ink">
            {portrait.initials}
          </div>
          <p className="text-xs font-medium uppercase text-graphite">
            {portrait.placeholder}
          </p>
        </div>
      )}
    </div>
  );
}
