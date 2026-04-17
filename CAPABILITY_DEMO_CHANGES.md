# Product page — Interactive "Staff-controlled flexibility" demo

Summary of the changes introduced on `/product` to replace the static list of
capability cards with a live, two-pane demo:

- **Left pane** — a presentational *waiter's dashboard* with real controls.
- **Right pane** — a flat 2D *tablet frame* containing a paper-style restaurant
  menu that updates in real time from the dashboard controls, matching the
  visual language of the 3D hero (`InteractiveMenu3D.tsx`).

---

## New files

| File | Purpose |
| --- | --- |
| `src/content/menuDemo.ts` | Menu data model — dishes, localized copy (EN/FR/DE), menu states (lunch / dinner / event), diet tags, and optional branding. |
| `src/components/product/RestaurantMenu.tsx` | 2D paper menu (three-column layout + chef's-recommendations box + optional brand header + logo corner). |
| `src/components/product/MenuDemoFrame.tsx` | Flat 2D front-face of the tablet case, using the leather-green texture from the 3D model. |
| `src/components/product/WaiterDashboard.tsx` | Presentational dashboard: language / state / brightness / PDF / diet / item toggles. |
| `src/components/product/CapabilityDemo.tsx` | State manager that wires the dashboard to the menu. |

## Modified files

| File | Purpose |
| --- | --- |
| `src/app/product/page.tsx` | Replaced the old capability cards with `<CapabilityDemo />` under the `SectionHeader`. |

---

## What the demo does

### 1. Language switching — `EN / FR / DE`
Every dish (name + description) and the section headings are translated.
Switching languages re-renders the whole menu instantly.

### 2. Menu states — `Lunch · Dinner · Event`
Each state is a distinct `MenuContent` record:

- **Lunch** — lighter, shorter prix fixe (4 starters / 4 mains / 3 desserts).
- **Dinner** — à la carte (6 starters / 2 chef recs / 6 mains / 5 desserts),
  trimmed so every item renders in full on the tablet.
- **Event** — fixed tasting (5 starters / 1 chef rec / 4 mains / 4 desserts),
  branded as *MERIDIAN GROUP — Annual Partners Summit · Spring 2026*.

The **tablet stays the same physical size** across all states. We locked the
inner screen to `aspect-ratio: 3.2 / 2.85`, sized for the densest state (event
with its brand header, or trimmed dinner with all vegan/vegetarian additions).
Shorter states simply leave clean paper at the bottom of the page. Dishes that
would get cut off were removed rather than rendered partially.

### 3. Screen brightness — slider (0–100 %)
Replaces the old *Low-light* toggle. A styled `<input type="range">` drives a
CSS `filter: brightness(...)` on the inner screen, mapped:

```
brightness = 100 → filter: brightness(1.00)   // full daylight
brightness =   0 → filter: brightness(0.25)   // very dim room
```

A 200 ms transition keeps the change smooth; no palette swap happens, so the
gold/ink/paper aesthetic stays intact.

### 4. PDF upload preview — toggle
Simulates an imported PDF view: single-column flat list of dishes with dashed
rules. Useful to demonstrate the *"upload and convert existing menu files"*
capability.

### 5. Diet filter — `Vegan · Vegetarian · Omnivore`
A new segment in the dashboard and a new `Diet` type in `menuDemo.ts`.

Every dish has a diet tag in `dishDiet` and is filtered through
`dishMatchesDiet(id, diet)`:

| Selected diet | Shown dishes |
| --- | --- |
| `omnivore` | All dishes (vegan + vegetarian + omnivore) |
| `vegetarian` | Only vegan + vegetarian |
| `vegan` | Only vegan |

Empty sections display a discreet `no items` line so the layout stays balanced
and the tablet size stays constant.

Vegan/vegetarian items were **expanded** specifically so the filter is not
empty — see the new-dishes section below.

### 6. Item toggling — per-dish checkboxes
Each dish has a checkbox row. Toggling a dish **removes it completely** from
the rendered menu (no strikethrough placeholder — it is not in the DOM).
Hidden items persist across language / brightness / PDF / diet changes for the
same state.

### 7. Menu transition — one shared fade
Every dashboard toggle (language, state, PDF mode, diet, and item toggles)
runs the **same** fade animation on the whole menu. The implementation:

- A single `menuVersion` counter in `CapabilityDemo` is bumped on every
  toggle and used as the `key` on the rendered menu — remounting triggers the
  CSS animation.
- One animation class, `tt-menu-fade`, defined in `globals.css` at **780 ms**
  (1.5× the original duration) with a calm cubic-bezier ease. The previous
  `tt-menu-appear` (settle) and `tt-menu-wipe` (language reveal) variants
  were removed.
- Per-item collapse/fade (`.tt-dish-item`) was removed too; hidden items are
  now physically removed from the DOM, exactly like the diet filter, so the
  shared fade covers the change.

The brightness slider keeps its fast 200 ms `filter: brightness(...)`
transition because it is a continuous slider, not a toggle.

---

## Branded event menu

`MenuContent` gained an optional `brand` field:

```ts
brand?: {
  monogram: string;         // e.g. "MG"
  name: string;             // e.g. "MERIDIAN GROUP"
  subtitle: Record<MenuLanguage, string>;
};
```

The event menu is branded as a private corporate event:

- Monogram badge `MG` (gold-bordered circle, paper background, small-caps).
- Wordmark `MERIDIAN GROUP` (tracked uppercase serif).
- Localized subtitle:
  - EN — *"Annual Partners Summit · Spring 2026"*
  - FR — *"Sommet Annuel des Partenaires · Printemps 2026"*
  - DE — *"Jährliches Partnertreffen · Frühjahr 2026"*
- A thin gold separator underlines the header.

`RestaurantMenu.tsx` renders `BrandHeader` only when `menu.brand` is truthy,
so lunch/dinner are unaffected.

---

## New dishes added (EN/FR/DE + diet tags)

### Dinner (+5, then trimmed to fit the tablet)
The vegan/vegetarian additions stayed in; legacy omnivore dishes that pushed
the menu past the screen were removed.

| Section | Dish | Diet | Status |
| --- | --- | --- | --- |
| Starters | Heirloom Tomato Carpaccio | vegan | kept |
| Starters | Wild Mushroom Velouté | vegetarian | kept |
| Mains    | Charred Leek Cassoulet | vegan | kept |
| Mains    | Saffron Risotto, Black Truffle | vegetarian | kept |
| Desserts | Dark Chocolate Sorbet | vegan | kept |

Removed from dinner to prevent overflow:

- Starters — Langoustine Raviolo, Hamachi Crudo
- Chef's Recommendations — Signature Reserve
- Mains — Bresse Chicken Suprême, Lobster Thermidor
- Desserts — Affiné Cheese Cart, Baba au Rhum

### Event (+7)
| Section | Dish | Diet |
| --- | --- | --- |
| Starters | Truffle Arancini | vegan |
| Starters | Goat Cheese Crostini | vegetarian |
| Mains    | Roasted Squash, Black Garlic | vegan |
| Mains    | Wild Mushroom Risotto | vegetarian |
| Desserts | Coconut & Yuzu Sorbet | vegan |
| Desserts | Hazelnut Praline Tart | vegetarian |

(The event menu also keeps all existing omnivore courses: caviar blini, tuna
cornet, foie gras macaron, wild turbot, beef Wellington, vanilla mille-feuille,
mignardises.)

---

## Visual system

Palette and typography mirror `src/components/three/InteractiveMenu3D.tsx`:

```
PAPER  #F7F2E8
INK    #12100d
MUTED  #3b352f
GOLD   #9a8e7a
CASE   #294233  (+ /textures/leather-green-back.png)
```

- Double gold rule around the page interior, small gold corner dots.
- Chef's Recommendations displayed in a double-ruled ink box.
- Diamond flourishes between sections and on column rules.
- Black TailorTaste logo (`/logo.png`) in the bottom-right, using
  `mix-blend-mode: multiply` so the white background disappears onto the paper.

## Layout safety

- Tablet frame: `MenuDemoFrame` uses a leather-textured case with padding-based
  bezel, and a fixed-aspect inner screen. Both inner and outer radii match the
  3D reference.
- Screen: `aspect-ratio: 3.2 / 2.85` — sized for the densest state (dinner with
  all vegan/vegetarian additions, or event with its brand header).
- `RestaurantMenu` fills the screen absolutely (`absolute inset-0`) with a
  three-column grid inside a flex column, so the brand header (when present)
  takes auto height and the grid takes the remainder.

## Component wiring

```
CapabilityDemo
├── state: language, state, brightness (0-100), pdfMode, diet,
│          hiddenItems, menuVersion
├── <WaiterDashboard />   (left column, sticky top on lg)
└── <MenuDemoFrame>
      └── <RestaurantMenu  language  state  brightness  pdfMode
                           hiddenItems  diet  appearVersion />
```

All state lives in `CapabilityDemo`; both children are presentational and
receive values + setters as props. Every dashboard handler bumps
`menuVersion`, which drives the shared `tt-menu-fade` animation via the
menu's `key`.

---

## Testing checklist

- [ ] Switch **language** — dish names, descriptions, section headings and
      event subtitle update with the shared fade.
- [ ] Switch **state** — tablet size stays constant, content reflows with the
      shared fade, event shows the Meridian Group header.
- [ ] Drag **brightness slider** — menu dims/brightens smoothly from 0 to 100 %
      (no fade — brightness uses its own `filter` transition).
- [ ] Toggle **PDF mode** — menu fades into the single-column imported-PDF view.
- [ ] Switch **diet filter**:
  - [ ] `omnivore` — all dishes visible.
  - [ ] `vegetarian` — meat/seafood disappear; vegan + vegetarian remain.
  - [ ] `vegan` — only vegan items remain; other sections show `no items`.
- [ ] **Untoggle** individual dishes — the menu fades and re-renders without
      those items (same animation as every other toggle).
- [ ] Combined: toggle diet = vegetarian, hide a few items, switch language,
      bring brightness down — all states compose correctly.
- [ ] All three states render **in full** — no dish is clipped at the bottom
      of the tablet screen in any language or diet combination.
