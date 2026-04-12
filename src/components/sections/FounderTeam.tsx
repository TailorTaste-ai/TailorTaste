import type { FounderProfile } from "@/lib/site";

type FounderTeamProps = {
  founders: FounderProfile[];
};

export function FounderTeam({ founders }: FounderTeamProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {founders.map((founder) => (
        <article className="rounded-[8px] border border-ink/10 bg-chalk p-6 shadow-soft" key={founder.linkedin}>
          <h3 className="font-serif text-2xl text-ink">
            <a
              className="underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink"
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${founder.name} LinkedIn profile in a new tab`}
            >
              {founder.name}
            </a>
          </h3>
          <p className="mt-2 text-sm leading-6 text-graphite">{founder.role}</p>
        </article>
      ))}
    </div>
  );
}
