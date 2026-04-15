export function CategoryDiagram() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Diagram */}
      <div className="rounded-[12px] border border-ink/10 bg-chalk p-5 sm:p-8 md:p-10">

        {/* Top axis label */}
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-graphite/50 sm:text-sm">
          How menus work today — and where the gap is
        </p>

        {/* Three-column comparison */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5">

          {/* Paper */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink/15 bg-paper sm:h-24 sm:w-24">
              <span className="text-2xl sm:text-3xl">📄</span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-ink sm:text-base">Paper menus</h3>
            <div className="mt-3 space-y-1.5">
              <Row label="Atmosphere" level={3} />
              <Row label="Flexibility" level={1} />
              <Row label="Guest feel" level={3} />
              <Row label="Adaptability" level={0} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-graphite sm:text-sm">
              Beautiful on the table, but impossible to update quickly.
            </p>
          </div>

          {/* TailorTaste — center, highlighted */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-accent/10 shadow-[0_0_24px_6px_rgba(31,107,91,0.15)] sm:h-24 sm:w-24">
              <span className="text-2xl font-bold text-accent sm:text-3xl">TT</span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-accent sm:text-base">TailorTaste</h3>
            <div className="mt-3 space-y-1.5">
              <Row label="Atmosphere" level={3} accent />
              <Row label="Flexibility" level={3} accent />
              <Row label="Guest feel" level={3} accent />
              <Row label="Adaptability" level={3} accent />
            </div>
            <p className="mt-4 text-xs font-medium leading-relaxed text-accent sm:text-sm">
              Looks like paper. Works like software. Controlled by staff.
            </p>
          </div>

          {/* QR / Tablets */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink/15 bg-paper sm:h-24 sm:w-24">
              <span className="text-2xl sm:text-3xl">📱</span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-ink sm:text-base">QR &amp; tablets</h3>
            <div className="mt-3 space-y-1.5">
              <Row label="Atmosphere" level={1} />
              <Row label="Flexibility" level={3} />
              <Row label="Guest feel" level={1} />
              <Row label="Adaptability" level={2} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-graphite sm:text-sm">
              Easy to update, but pulls guests into a screen.
            </p>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-sm leading-relaxed text-graphite">
        Paper can&rsquo;t adapt. Screens break the mood. TailorTaste is the only option that
        keeps <strong className="text-ink">premium atmosphere</strong> and gives operators <strong className="text-ink">full live control</strong>.
      </p>
    </div>
  );
}

function Row({ label, level, accent }: { label: string; level: number; accent?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 text-left text-[10px] text-graphite/70 sm:w-20 sm:text-xs">{label}</span>
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`block h-1.5 w-4 rounded-full sm:h-2 sm:w-5 ${
              i < level
                ? accent
                  ? "bg-accent"
                  : "bg-ink/30"
                : "bg-ink/8"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
