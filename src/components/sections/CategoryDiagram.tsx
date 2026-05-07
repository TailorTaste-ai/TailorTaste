type Entry = {
  label: string;
  icon: string;
  accent?: boolean;
  signals: { name: string; level: number }[];
  caption: string;
};

const ENTRIES: Entry[] = [
  {
    label: "Paper menus",
    icon: "📄",
    signals: [
      { name: "Atmosphere", level: 3 },
      { name: "Flexibility", level: 1 },
      { name: "Guest feel", level: 3 },
      { name: "Adaptability", level: 0 },
    ],
    caption: "Beautiful on the table, but impossible to update quickly.",
  },
  {
    label: "TailorTaste",
    icon: "TT",
    accent: true,
    signals: [
      { name: "Atmosphere", level: 3 },
      { name: "Flexibility", level: 3 },
      { name: "Guest feel", level: 3 },
      { name: "Adaptability", level: 3 },
    ],
    caption: "Looks like paper. Works like software. Controlled by staff.",
  },
  {
    label: "QR & tablets",
    icon: "📱",
    signals: [
      { name: "Atmosphere", level: 1 },
      { name: "Flexibility", level: 3 },
      { name: "Guest feel", level: 1 },
      { name: "Adaptability", level: 2 },
    ],
    caption: "Easy to update, but pulls guests into a screen.",
  },
];

export function CategoryDiagram() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-[12px] border border-ink/10 bg-chalk p-5 sm:p-8 md:p-10">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-graphite/60 sm:mb-6 sm:text-sm sm:tracking-[0.2em]">
          How menus work today — and where the gap is
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
          {ENTRIES.map((entry) => (
            <Column key={entry.label} entry={entry} />
          ))}
        </div>
      </div>

      <p className="text-center text-sm leading-relaxed text-graphite">
        Paper can&rsquo;t adapt. Screens break the mood. TailorTaste is the only option that keeps{" "}
        <strong className="text-ink">premium atmosphere</strong> and gives operators{" "}
        <strong className="text-ink">full live control</strong>.
      </p>
    </div>
  );
}

function Column({ entry }: { entry: Entry }) {
  const { label, icon, accent, signals, caption } = entry;
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full border-2 sm:h-24 sm:w-24 ${
          accent
            ? "border-accent bg-accent/10 shadow-[0_0_24px_6px_rgba(31,107,91,0.15)]"
            : "border-ink/15 bg-paper"
        }`}
      >
        <span
          className={`text-2xl sm:text-3xl ${accent ? "font-bold text-accent" : ""}`}
          aria-hidden={icon.length <= 2 && !accent ? true : undefined}
        >
          {icon}
        </span>
      </div>
      <h3
        className={`mt-4 text-sm font-bold sm:text-base ${
          accent ? "text-accent" : "text-ink"
        }`}
      >
        {label}
      </h3>
      <div className="mt-3 space-y-1.5">
        {signals.map((s) => (
          <Row key={s.name} label={s.name} level={s.level} accent={accent} />
        ))}
      </div>
      <p
        className={`mt-4 max-w-[28ch] text-xs leading-relaxed sm:text-sm ${
          accent ? "font-medium text-accent" : "text-graphite"
        }`}
      >
        {caption}
      </p>
    </div>
  );
}

function Row({ label, level, accent }: { label: string; level: number; accent?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:justify-start">
      <span className="w-[74px] text-left text-[11px] text-graphite/70 sm:w-20 sm:text-xs">
        {label}
      </span>
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`block h-1.5 w-4 rounded-full sm:h-2 sm:w-5 ${
              i < level ? (accent ? "bg-accent" : "bg-ink/30") : "bg-ink/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
