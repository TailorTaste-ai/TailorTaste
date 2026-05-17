"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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
const HAIRLINE = "#b9ad99";

const COLORS = { paper: PAPER, ink: INK, muted: MUTED, gold: GOLD };

/* Fluid font sizes — values scale with the *nearest* container that
   declares `container-type: inline-size`. Each column (and the chef's
   box) sets its own container, so `cqw` here resolves against the
   column / box width, not the whole menu. That way the same desktop
   ratio is preserved on mobile: the menu just becomes a smaller copy
   of itself rather than wrapping text mid-word.

   `name`, `desc`, `price`, `heading`, `chef`, `empty`, `separator`
   are sized against a single column (~33% of menu width) or the chef
   box (~30%). The `brand*`, `monogram`, `pdfTitle`, `pdfLabel`, and
   `pdfRow` values size against the full menu width. */
const FS = {
  /* per-column / per-chef-box (cqw = % of column or chef box width) */
  name: "clamp(6px, 7cqw, 12px)",
  desc: "clamp(5px, 5.5cqw, 9px)",
  price: "clamp(5.5px, 6cqw, 10px)",
  heading: "clamp(6px, 7cqw, 11px)",
  chef: "clamp(5.5px, 6.5cqw, 10px)",
  empty: "clamp(5px, 5.5cqw, 9px)",
  separator: "clamp(4.5px, 5cqw, 8px)",
  /* full-menu (cqw = % of menu width) */
  brandName: "clamp(7px, 2.5cqw, 11px)",
  brandSubtitle: "clamp(5.5px, 1.9cqw, 8.5px)",
  monogram: "clamp(7px, 2.3cqw, 10px)",
  pdfLabel: "clamp(7px, 2.2cqw, 10.5px)",
  pdfTitle: "clamp(12px, 4.6cqw, 22px)",
  pdfRow: "clamp(7px, 2.3cqw, 11px)",
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
        className="font-serif font-bold leading-[1.15]"
        style={{ color: colors.ink, fontSize: FS.name }}
      >
        {text.name}
      </p>
      <p
        className="font-serif italic leading-[1.15]"
        style={{ color: colors.muted, fontSize: FS.desc }}
      >
        {text.desc}
      </p>
      <p
        className="font-serif leading-[1.15]"
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
          className="mt-[2px] mb-[2px] text-center font-serif leading-none"
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
        className="mt-1 text-center font-serif italic leading-tight"
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
        className="text-center font-serif font-bold uppercase leading-tight tracking-[0.18em]"
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
          className="font-serif font-bold leading-none tracking-[0.05em]"
          style={{ color: colors.ink, fontSize: FS.monogram }}
        >
          {brand.monogram}
        </span>
      </div>
      <div className="flex flex-col items-center text-center leading-none">
        <p
          className="font-bold uppercase tracking-[0.32em]"
          style={{
            color: colors.ink,
            fontFamily: "var(--font-serif, ui-serif)",
            fontSize: FS.brandName,
          }}
        >
          {brand.name}
        </p>
        <p
          className="mt-0.5 font-serif italic tracking-wide"
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
      className={`absolute h-3.5 w-3.5 rounded-full ${position}`}
      style={{
        border: `1px solid ${color}`,
        boxShadow: `inset 0 0 0 2px ${PAPER}, inset 0 0 0 3px ${color}`,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
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

/* Shared auto-fit across all three menu columns: measures every column's
   natural content height vs. its available height and applies the *same*
   uniform `transform: scale()` to every column (the smallest scale needed
   so no column overflows). Sharing the scale guarantees text in every
   column is rendered at the same visual size — the chef's-box / 6-mains
   middle column dictates the shrink, and the side columns shrink in
   lock-step so typography stays uniform across the menu. */
function useSharedColumnFit(columnCount: number, resetKey: string | number) {
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      let minScale = 1;
      for (let i = 0; i < columnCount; i++) {
        const outer = outerRefs.current[i];
        const inner = innerRefs.current[i];
        if (!outer || !inner) continue;
        const avail = outer.clientHeight;
        /* `scrollHeight` ignores the CSS transform we apply, so it always
           reports the natural unscaled content height. */
        const natural = inner.scrollHeight;
        if (avail <= 0 || natural <= 0) continue;
        const colScale = natural > avail ? avail / natural : 1;
        if (colScale < minScale) minScale = colScale;
      }
      setScale((curr) => (Math.abs(curr - minScale) > 0.003 ? minScale : curr));
    };

    compute();

    const ro = new ResizeObserver(compute);
    outerRefs.current.forEach((el) => el && ro.observe(el));
    innerRefs.current.forEach((el) => el && ro.observe(el));

    /* Re-measure once fonts finish loading — serif metrics can shift the
       natural height by a few pixels on first paint. */
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    fonts?.ready?.then(compute).catch(() => undefined);

    return () => ro.disconnect();
  }, [columnCount, resetKey]);

  const FitColumn = ({
    index,
    children,
    className,
    style,
  }: {
    index: number;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
  }) => (
    <div
      ref={(el) => {
        outerRefs.current[index] = el;
      }}
      className={className}
      style={{ ...style, overflow: "hidden" }}
    >
      <div
        ref={(el) => {
          innerRefs.current[index] = el;
        }}
        className="flex flex-col"
        style={{
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top center",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );

  return FitColumn;
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

  /* One shared scale for every column so the typography stays uniform
     across the whole menu. The `resetKey` makes sure we recompute the
     fit immediately whenever the visible content changes.

     We always call BOTH hooks unconditionally (rules of hooks), even
     though only one is active depending on `pdfMode`. The inactive hook
     never gets refs registered so its scale stays a no-op `1`. */
  const fitResetKey = `${language}-${state}-${diet}-${visible.starters.length}-${visible.chefRecs.length}-${visible.mains.length}-${visible.desserts.length}-${appearVersion}`;
  const FitColumn = useSharedColumnFit(3, fitResetKey);
  const PdfFit = useSharedColumnFit(1, `pdf-${fitResetKey}`);

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
          <PdfFit index={0} className="h-full w-full">
            <p
              className="text-center font-serif uppercase tracking-[0.3em]"
              style={{ color: COLORS.muted, fontSize: FS.pdfLabel }}
            >
              Imported PDF · {menu.title[language]}
            </p>
            <h2
              className="mt-2 text-center font-serif font-bold"
              style={{ color: COLORS.ink, fontSize: FS.pdfTitle }}
            >
              {headings.starters} &amp; {headings.mains}
            </h2>
            <Flourish color={COLORS.gold} width="50%" />
            <div
              className="mt-2 flex flex-col"
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
          </PdfFit>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: COLORS.paper,
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0.52), transparent 34%), radial-gradient(circle at 50% 10%, rgba(255,255,255,0.44), transparent 42%), linear-gradient(rgba(154,142,122,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(154,142,122,0.035) 1px, transparent 1px)",
        backgroundSize: "cover, cover, 20px 20px, 20px 20px",
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
          style={{ border: `1px solid ${HAIRLINE}` }}
        />

        {/* Corner dots */}
        <CornerDot color={COLORS.gold} position="left-[3.3%] top-[3.3%]" />
        <CornerDot color={COLORS.gold} position="right-[3.3%] top-[3.3%]" />
        <CornerDot color={COLORS.gold} position="left-[3.3%] bottom-[3.3%]" />
        <CornerDot color={COLORS.gold} position="right-[3.3%] bottom-[3.3%]" />

        {/* Brand header + three columns */}
        <div className="relative flex h-full w-full flex-col px-[4.8%] py-[5.1%]">
          {menu.brand && (
            <BrandHeader brand={menu.brand} language={language} colors={COLORS} />
          )}
          {menu.brand && (
            <div
              className="mx-auto mb-1.5 h-px w-[55%]"
              style={{ backgroundColor: COLORS.gold }}
            />
          )}
          <div className="grid min-h-0 flex-1 grid-cols-3 items-stretch">
            {/* Column 1 — Starters */}
            <FitColumn
              index={0}
              className="h-full min-w-0 px-1.5"
              style={{
                borderRight: `1px solid ${HAIRLINE}`,
                containerType: "inline-size",
              }}
            >
              <Heading text={headings.starters} colors={COLORS} />
              <DishList items={visible.starters} language={language} colors={COLORS} />
            </FitColumn>

            {/* Column 2 — Chef's Recommendations box + Main Courses */}
            <FitColumn
              index={1}
              className="h-full min-w-0 px-1.5"
              style={{
                borderRight: `1px solid ${HAIRLINE}`,
                containerType: "inline-size",
              }}
            >
              {visible.chefRecs.length > 0 && (
                <>
                  <div
                    className="mx-auto w-[92%] px-1 py-1.5"
                    style={{
                      border: `1.5px solid ${COLORS.ink}`,
                      outline: `1px solid ${COLORS.gold}`,
                      outlineOffset: "-5px",
                      containerType: "inline-size",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(154,142,122,0.05))",
                    }}
                  >
                    <h3
                      className="text-center font-serif font-bold leading-tight"
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
            </FitColumn>

            {/* Column 3 — Desserts */}
            <FitColumn
              index={2}
              className="h-full min-w-0 px-1.5"
              style={{ containerType: "inline-size" }}
            >
              <Heading text={headings.desserts} colors={COLORS} />
              <DishList items={visible.desserts} language={language} colors={COLORS} />
            </FitColumn>
          </div>
        </div>

      </div>
    </div>
  );
}
