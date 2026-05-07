"use client";

import { useId, useState, type ReactNode } from "react";
import type { Diet, LocalizedDish, MenuLanguage, MenuState } from "@/content/menuDemo";

type SegmentOption<T extends string> = { value: T; label: string };

type Props = {
  language: MenuLanguage;
  onLanguageChange: (lang: MenuLanguage) => void;
  state: MenuState;
  onStateChange: (state: MenuState) => void;
  brightness: number;
  onBrightnessChange: (value: number) => void;
  pdfMode: boolean;
  onPdfModeChange: (on: boolean) => void;
  hiddenItems: ReadonlySet<string>;
  onToggleItem: (id: string) => void;
  diet: Diet;
  onDietChange: (diet: Diet) => void;
  dishes: LocalizedDish[];
};

const LANGUAGES: SegmentOption<MenuLanguage>[] = [
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
  { value: "de", label: "DE" },
];

const STATES: SegmentOption<MenuState>[] = [
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "event", label: "Event" },
];

const DIETS: SegmentOption<Diet>[] = [
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "omnivore", label: "Omnivore" },
];

function SectionHeader({ number, title, hint }: { number: string; title: string; hint?: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[10px] font-semibold tracking-[0.18em] text-accent/70">{number}</span>
      <div className="flex-1">
        <h3 className="font-serif text-[15px] leading-tight text-ink">{title}</h3>
        {hint && <p className="mt-0.5 text-[11px] leading-snug text-graphite/80">{hint}</p>}
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 shrink-0 text-graphite transition-transform duration-200 lg:hidden ${
        open ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 8 L10 13 L15 8" />
    </svg>
  );
}

/* Collapsible section: acts as an accordion below lg; on lg the content
   is always visible and the toggle button is non-interactive (but stays
   in the DOM so the layout matches). Keeps the dashboard compact on
   phones where vertical scroll is at a premium. */
function AccordionSection({
  number,
  title,
  hint,
  defaultOpen = false,
  children,
}: {
  number: string;
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-paper/60 lg:pointer-events-none lg:cursor-default lg:hover:bg-transparent"
        style={{ minHeight: "56px" }}
      >
        <div className="flex-1">
          <SectionHeader number={number} title={title} hint={hint} />
        </div>
        <Chevron open={open} />
      </button>
      <div
        id={bodyId}
        className={`px-5 pb-4 lg:block ${open ? "block" : "hidden"}`}
      >
        {children}
      </div>
    </section>
  );
}

function Segment<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      className="inline-flex gap-1 rounded-[8px] border border-ink/12 bg-paper p-1"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`flex min-h-[40px] min-w-[60px] items-center justify-center rounded-[6px] px-3.5 py-2 text-[13px] font-medium transition-colors ${
              active ? "bg-ink text-chalk shadow-sm" : "text-graphite hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="group flex w-full items-center gap-3 rounded-[8px] p-1.5 text-left transition-colors hover:bg-paper/60"
      style={{ minHeight: "44px" }}
    >
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
          on ? "border-ink bg-ink" : "border-ink/20 bg-paper"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-chalk shadow-sm transition-transform ${
            on ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
      <span className="flex-1 text-[13px] text-graphite group-hover:text-ink">{label}</span>
    </button>
  );
}

function BrightnessSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3 py-1">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-graphite/60" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="3" />
        </svg>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Screen brightness"
          aria-valuetext={`${value} percent`}
          className="tt-slider flex-1"
        />
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-graphite" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
        </svg>
        <span className="w-10 text-right text-[12px] tabular-nums text-graphite">{value}%</span>
      </div>
      <style jsx>{`
        .tt-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            #141715 0%,
            #141715 ${value}%,
            #d8ddd6 ${value}%,
            #d8ddd6 100%
          );
          outline: none;
          cursor: pointer;
          touch-action: pan-y;
        }
        .tt-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fbfdf9;
          border: 1.5px solid #141715;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
          cursor: pointer;
        }
        .tt-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fbfdf9;
          border: 1.5px solid #141715;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
          cursor: pointer;
        }
        .tt-slider:focus-visible::-webkit-slider-thumb {
          outline: 2px solid #1f6b5b;
          outline-offset: 2px;
        }
        .tt-slider:focus-visible::-moz-range-thumb {
          outline: 2px solid #1f6b5b;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

function ItemToggleRow({
  dish,
  active,
  onToggle,
  language,
}: {
  dish: LocalizedDish;
  active: boolean;
  onToggle: (id: string) => void;
  language: MenuLanguage;
}) {
  const text = dish.i18n[language];
  return (
    <li>
      <button
        type="button"
        onClick={() => onToggle(dish.id)}
        aria-pressed={active}
        className="flex w-full items-center gap-3 rounded-[6px] px-2 py-2.5 text-left transition-colors hover:bg-paper"
        style={{ minHeight: "44px" }}
      >
        <span
          className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
            active ? "border-ink bg-ink" : "border-ink/25 bg-paper"
          }`}
          aria-hidden
        >
          {active && (
            <svg viewBox="0 0 10 10" className="h-3 w-3 text-chalk" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1.5 5.2 L4 7.5 L8.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span
          className={`flex-1 truncate font-serif text-[13px] transition-colors ${
            active ? "text-ink" : "text-graphite/55"
          }`}
        >
          {text.name}
        </span>
        <span className="text-[11px] tabular-nums text-graphite/60">{dish.price}</span>
      </button>
    </li>
  );
}

export function WaiterDashboard({
  language,
  onLanguageChange,
  state,
  onStateChange,
  brightness,
  onBrightnessChange,
  pdfMode,
  onPdfModeChange,
  hiddenItems,
  onToggleItem,
  diet,
  onDietChange,
  dishes,
}: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[12px] border border-ink/10 bg-chalk">
      <div className="border-b border-ink/8 px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent/70">
          Waiter dashboard
        </p>
        <p className="mt-1 font-serif text-[17px] leading-snug text-ink">
          Live menu controls
        </p>
      </div>

      <div className="divide-y divide-ink/8">
        <AccordionSection
          number="01"
          title="Language switching"
          hint="Present the menu in the right language, per guest."
          defaultOpen
        >
          <Segment
            options={LANGUAGES}
            value={language}
            onChange={onLanguageChange}
            ariaLabel="Menu language"
          />
        </AccordionSection>

        <AccordionSection
          number="02"
          title="Menu states"
          hint="Lunch, dinner, event — no reprints."
        >
          <Segment
            options={STATES}
            value={state}
            onChange={onStateChange}
            ariaLabel="Menu state"
          />
        </AccordionSection>

        <AccordionSection
          number="03"
          title="Low-light preset"
          hint="Adjust screen brightness for dim rooms without breaking the mood."
        >
          <BrightnessSlider value={brightness} onChange={onBrightnessChange} />
        </AccordionSection>

        <AccordionSection
          number="04"
          title="PDF upload"
          hint="Upload and convert existing menu files."
        >
          <Switch
            on={pdfMode}
            onChange={onPdfModeChange}
            label={pdfMode ? "Showing imported PDF" : "Show imported PDF preview"}
          />
        </AccordionSection>

        <AccordionSection
          number="05"
          title="Diet filter"
          hint="Show only items that fit the guest's dietary preference."
        >
          <Segment
            options={DIETS}
            value={diet}
            onChange={onDietChange}
            ariaLabel="Diet filter"
          />
        </AccordionSection>

        <AccordionSection
          number="06"
          title="Item toggling"
          hint="Activate or hide individual items on the fly."
          defaultOpen
        >
          <ul
            className="-mx-2 max-h-[260px] overflow-y-auto overscroll-contain pr-1 sm:max-h-[240px]"
            aria-label="Menu items"
          >
            {dishes.map((dish) => (
              <ItemToggleRow
                key={dish.id}
                dish={dish}
                active={!hiddenItems.has(dish.id)}
                onToggle={onToggleItem}
                language={language}
              />
            ))}
          </ul>
        </AccordionSection>
      </div>
    </div>
  );
}
