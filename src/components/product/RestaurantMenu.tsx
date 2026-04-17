"use client";

import Image from "next/image";
import {
  dishMatchesDiet,
  menuByState,
  type Diet,
  type LocalizedDish,
  type MenuBrand,
  type MenuLanguage,
  type MenuState,
} from "@/content/menuDemo";

type Props = {
  language?: MenuLanguage;
  state?: MenuState;
  /* 0 = darkest, 100 = full brightness */
  brightness?: number;
  pdfMode?: boolean;
  hiddenItems?: ReadonlySet<string>;
  diet?: Diet;
  /** From CapabilityDemo: increments on every dashboard action so the menu can replay the shared fade. */
  appearVersion?: number;
};

/* Palette mirrors the 3D hero (InteractiveMenu3D.tsx) */
const PAPER = "#F7F2E8";
const INK = "#12100d";
const MUTED = "#3b352f";
const GOLD = "#9a8e7a";

const COLORS = { paper: PAPER, ink: INK, muted: MUTED, gold: GOLD };

/* Fluid font sizes — values scale with the tablet frame's inline-size
   via container queries (cqw). The Tailwind text-[Xpx] classes below
   each usage stay in place as a static fallback for browsers that do
   not support container queries; the inline clamp() overrides them
   where supported.

   Caps are intentionally conservative so long localized dish names
   (e.g. "Velouté de Champignons Sauvages", "Carpaccio de Tomates
   Anciennes") never overflow the ~170px three-column grid inside the
   tablet screen. */
const FS = {
  name: "clamp(8.5px, 2.5cqw, 11px)",
  desc: "clamp(6.5px, 1.9cqw, 8.5px)",
  price: "clamp(7px, 2.1cqw, 9.5px)",
  heading: "clamp(8px, 2.5cqw, 10.5px)",
  chef: "clamp(7.5px, 2.3cqw, 10px)",
  brandName: "clamp(8.5px, 2.5cqw, 11px)",
  brandSubtitle: "clamp(6.5px, 1.9cqw, 8.5px)",
  monogram: "clamp(8px, 2.3cqw, 10px)",
  empty: "clamp(6.5px, 1.9cqw, 8.5px)",
  separator: "clamp(6px, 1.8cqw, 8px)",
  pdfLabel: "clamp(8px, 2.2cqw, 10.5px)",
  pdfTitle: "clamp(14px, 4.6cqw, 22px)",
  pdfRow: "clamp(8px, 2.3cqw, 11px)",
} as const;

function Flourish({ color, width = "60%" }: { color: string; width?: string }) {
  return (
    <div className="relative mx-auto my-1 flex items-center justify-center" style={{ width }}>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <svg
        width="10"
        height="10"
        viewBox="0 0 14 14"
        className="mx-1.5 shrink-0"
        aria-hidden
      >
        <path d="M7 0 L14 7 L7 14 L0 7 Z" fill={color} />
      </svg>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

function DishRow({
  dish,
  language,
  colors,
}: {
  dish: LocalizedDish;
  language: MenuLanguage;
  colors: typeof COLORS;
}) {
  const text = dish.i18n[language];
  return (
    <div className="min-w-0 px-1 py-0 text-center">
      <p
        className="font-serif text-[8px] font-bold leading-[1.15] break-words hyphens-auto sm:text-[9.5px]"
        style={{ color: colors.ink, fontSize: FS.name, overflowWrap: "anywhere" }}
      >
        {text.name}
      </p>
      <p
        className="font-serif text-[6.5px] italic leading-[1.15] break-words hyphens-auto sm:text-[7.5px]"
        style={{ color: colors.muted, fontSize: FS.desc, overflowWrap: "anywhere" }}
      >
        {text.desc}
      </p>
      <p
        className="font-serif text-[7px] leading-[1.15] sm:text-[8.5px]"
        style={{ color: colors.ink, fontSize: FS.price }}
      >
        {dish.price}
      </p>
    </div>
  );
}

function DishItem({
  dish,
  language,
  colors,
  showLeadingSeparator,
}: {
  dish: LocalizedDish;
  language: MenuLanguage;
  colors: typeof COLORS;
  showLeadingSeparator: boolean;
}) {
  return (
    <div>
      {showLeadingSeparator && (
        <p
          className="mt-[2px] mb-[2px] text-center font-serif text-[6px] leading-none"
          style={{ color: colors.gold, fontSize: FS.separator }}
        >
          ·   ·   ·
        </p>
      )}
      <DishRow dish={dish} language={language} colors={colors} />
    </div>
  );
}

function DishList({
  items,
  language,
  colors,
}: {
  items: LocalizedDish[];
  language: MenuLanguage;
  colors: typeof COLORS;
}) {
  if (items.length === 0) {
    return (
      <p
        className="mt-1 text-center font-serif text-[7px] italic leading-tight"
        style={{ color: `${colors.muted}99`, fontSize: FS.empty }}
      >
        no items
      </p>
    );
  }
  return (
    <div className="flex flex-col">
      {items.map((dish, index) => (
        <DishItem
          key={dish.id}
          dish={dish}
          language={language}
          colors={colors}
          showLeadingSeparator={index > 0}
        />
      ))}
    </div>
  );
}

function Heading({ text, colors }: { text: string; colors: typeof COLORS }) {
  return (
    <div className="mb-1">
      <h3
        className="text-center font-serif text-[8.5px] font-bold uppercase leading-tight tracking-[0.22em] sm:text-[10px]"
        style={{ color: colors.ink, fontVariant: "small-caps", fontSize: FS.heading }}
      >
        {text}
      </h3>
      <Flourish color={colors.gold} width="70%" />
    </div>
  );
}

function BrandHeader({
  brand,
  language,
  colors,
}: {
  brand: MenuBrand;
  language: MenuLanguage;
  colors: typeof COLORS;
}) {
  return (
    <div className="mb-2 flex items-center justify-center gap-2.5 px-2">
      {/* Monogram badge — gold-bordered circle with small-caps initials */}
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
        style={{
          border: `1.5px solid ${colors.ink}`,
          boxShadow: `inset 0 0 0 1px ${colors.gold}`,
          backgroundColor: colors.paper,
        }}
        aria-hidden
      >
        <span
          className="font-serif text-[8.5px] font-bold leading-none tracking-[0.05em]"
          style={{ color: colors.ink, fontSize: FS.monogram }}
        >
          {brand.monogram}
        </span>
      </div>
      <div className="flex flex-col items-center text-center leading-none">
        <p
          className="text-[8.5px] font-bold uppercase tracking-[0.32em] sm:text-[9.5px]"
          style={{
            color: colors.ink,
            fontFamily: "var(--font-serif, ui-serif)",
            fontSize: FS.brandName,
          }}
        >
          {brand.name}
        </p>
        <p
          className="mt-0.5 font-serif text-[6.5px] italic tracking-wide sm:text-[7px]"
          style={{ color: colors.muted, fontSize: FS.brandSubtitle }}
        >
          {brand.subtitle[language]}
        </p>
      </div>
    </div>
  );
}

function CornerDot({ color, position }: { color: string; position: string }) {
  return (
    <div
      className={`absolute h-3 w-3 rounded-full ${position}`}
      style={{
        border: `1px solid ${color}`,
        boxShadow: `inset 0 0 0 1px ${color}`,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

/* Map a 0-100 brightness slider into a CSS filter string.
   100 = full brightness, 0 = very dim (≈ 0.25 brightness). */
function brightnessFilter(brightness: number): string {
  const clamped = Math.max(0, Math.min(100, brightness));
  const value = 0.25 + (clamped / 100) * 0.75;
  return `brightness(${value.toFixed(3)})`;
}

function menuTransitionClass(version: number): string {
  return version > 0 ? "tt-menu-fade" : "";
}

export function RestaurantMenu({
  language = "en",
  state = "dinner",
  brightness = 100,
  pdfMode = false,
  hiddenItems = new Set<string>(),
  diet = "omnivore",
  appearVersion = 0,
}: Props) {
  const menu = menuByState[state];
  const headings = menu.headings[language];

  /* Both diet filter and item toggles physically remove items from the
     DOM; the single shared fade on the whole menu covers the change. */
  const isVisible = (dish: LocalizedDish) =>
    dishMatchesDiet(dish.id, diet) && !hiddenItems.has(dish.id);

  const visible = {
    starters: menu.starters.filter(isVisible),
    chefRecs: menu.chefRecs.filter(isVisible),
    mains: menu.mains.filter(isVisible),
    desserts: menu.desserts.filter(isVisible),
  };

  const screenStyle = {
    filter: brightnessFilter(brightness),
    transition: "filter 200ms ease",
  } as const;

  const appearClass = menuTransitionClass(appearVersion);

  /* PDF mode — single column, simulates an uploaded/imported PDF.
     Hidden items stay in the DOM and collapse per-row so individual
     toggles only animate the affected line. */
  if (pdfMode) {
    const flat = [...visible.starters, ...visible.mains, ...visible.desserts].slice(0, 12);
    return (
      <div
        className="absolute inset-0 overflow-hidden p-[2.5%]"
        style={{
          backgroundColor: COLORS.paper,
          containerType: "inline-size",
          ...screenStyle,
        }}
      >
        <div
          key={appearVersion}
          className={`relative h-full w-full overflow-hidden border px-[4%] py-[3%] ${appearClass}`.trim()}
          style={{ borderColor: `${COLORS.muted}44` }}
        >
          <p
            className="text-center font-serif text-[8.5px] uppercase tracking-[0.3em]"
            style={{ color: COLORS.muted, fontSize: FS.pdfLabel }}
          >
            Imported PDF · {menu.title[language]}
          </p>
          <h2
            className="mt-2 text-center font-serif text-[16px] font-bold sm:text-[20px]"
            style={{ color: COLORS.ink, fontSize: FS.pdfTitle }}
          >
            {headings.starters} &amp; {headings.mains}
          </h2>
          <Flourish color={COLORS.gold} width="50%" />
          <div
            className="mt-2 flex flex-col text-[9px] sm:text-[10.5px]"
            style={{ color: COLORS.ink, fontSize: FS.pdfRow }}
          >
            {flat.map((dish) => (
              <div
                key={dish.id}
                className="flex min-w-0 justify-between gap-3 border-b border-dashed pb-1"
                style={{ borderColor: `${COLORS.muted}33` }}
              >
                <span
                  className="min-w-0 font-serif break-words"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {dish.i18n[language].name}
                </span>
                <span className="shrink-0 font-serif tabular-nums">{dish.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: COLORS.paper,
        containerType: "inline-size",
        ...screenStyle,
      }}
    >
      <div
        key={appearVersion}
        className={`absolute inset-0 ${appearClass}`.trim()}
      >
        {/* Outer double-rule gold border */}
        <div
          className="absolute inset-[1.8%] pointer-events-none"
          style={{ border: `1px solid ${COLORS.gold}` }}
        />
        <div
          className="absolute inset-[2.6%] pointer-events-none"
          style={{ border: `1px solid ${COLORS.gold}` }}
        />

        {/* Corner dots */}
        <CornerDot color={COLORS.gold} position="left-[3.3%] top-[3.3%]" />
        <CornerDot color={COLORS.gold} position="right-[3.3%] top-[3.3%]" />
        <CornerDot color={COLORS.gold} position="left-[3.3%] bottom-[3.3%]" />
        <CornerDot color={COLORS.gold} position="right-[3.3%] bottom-[3.3%]" />

        {/* Brand header + three columns */}
        <div className="relative flex h-full w-full flex-col px-[4.5%] py-[5%]">
          {menu.brand && (
            <BrandHeader brand={menu.brand} language={language} colors={COLORS} />
          )}
          {menu.brand && (
            <div
              className="mx-auto mb-1.5 h-px w-[55%]"
              style={{ backgroundColor: COLORS.gold }}
            />
          )}
          <div className="grid min-h-0 flex-1 grid-cols-3 items-start">
            {/* Column 1 — Starters */}
            <div
              className="flex h-full min-w-0 flex-col px-1.5"
              style={{ borderRight: `1px solid ${COLORS.gold}` }}
            >
              <Heading text={headings.starters} colors={COLORS} />
              <DishList items={visible.starters} language={language} colors={COLORS} />
            </div>

            {/* Column 2 — Chef's Recommendations box + Main Courses */}
            <div
              className="flex h-full min-w-0 flex-col px-1.5"
              style={{ borderRight: `1px solid ${COLORS.gold}` }}
            >
              {visible.chefRecs.length > 0 && (
                <>
                  <div
                    className="mx-auto w-[92%] px-2 py-1.5"
                    style={{
                      border: `1.5px solid ${COLORS.ink}`,
                      outline: `1px solid ${COLORS.ink}`,
                      outlineOffset: "-5px",
                    }}
                  >
                    <h3
                      className="text-center font-serif text-[7.5px] font-bold leading-tight break-words sm:text-[9px]"
                      style={{ color: COLORS.ink, fontVariant: "small-caps", fontSize: FS.chef }}
                    >
                      {headings.chef1}
                      <br />
                      {headings.chef2}
                    </h3>
                    <Flourish color={COLORS.gold} width="60%" />
                    <DishList items={visible.chefRecs} language={language} colors={COLORS} />
                  </div>
                  <Flourish color={COLORS.gold} width="65%" />
                </>
              )}

              <Heading text={headings.mains} colors={COLORS} />
              <DishList items={visible.mains} language={language} colors={COLORS} />
            </div>

            {/* Column 3 — Desserts */}
            <div className="flex h-full min-w-0 flex-col px-1.5">
              <Heading text={headings.desserts} colors={COLORS} />
              <DishList items={visible.desserts} language={language} colors={COLORS} />
            </div>
          </div>
        </div>

        {/* Bottom-right logo — mirrors the 3D menu texture placement */}
        <div
          className="pointer-events-none absolute aspect-square"
          style={{
            right: "5%",
            bottom: "5%",
            width: "7%",
            mixBlendMode: "multiply",
          }}
        >
          <Image
            src="/logo.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 10vw, 80px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
