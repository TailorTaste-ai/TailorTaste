"use client";

import type { PointerEvent } from "react";
import { useMemo, useRef, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
};

type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

type CanvasElement = {
  id: string;
  type: "text" | "image";
  source: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fontSize: number;
  lineHeight: number;
  weight: number;
  align: "left" | "center" | "right";
  color: "black" | "muted" | "accent";
  z: number;
};

type DragState = {
  id: string;
  startX: number;
  startY: number;
  original: CanvasElement;
};

type Guide = {
  orientation: "vertical" | "horizontal";
  position: number;
};

const PAGE_WIDTH = 1200;
const PAGE_HEIGHT = 900;
const SNAP_THRESHOLD = 8;

const initialSections: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      {
        id: "starters.oysters",
        name: "Oysters",
        description: "Half dozen Irish rock oysters, cucumber mignonette, lemon",
        price: "24",
      },
      {
        id: "starters.beetroot_carpaccio",
        name: "Roasted Beetroot Carpaccio",
        description: "Whipped goat cheese, toasted hazelnuts, apple vinegar, garden cress",
        price: "13",
      },
      {
        id: "starters.chicken_liver_parfait",
        name: "Chicken Liver Parfait",
        description: "Port jelly, pickled cherries, grilled sourdough",
        price: "15",
      },
    ],
  },
  {
    id: "mains",
    title: "Mains",
    items: [
      {
        id: "mains.risotto",
        name: "Wild Mushroom Risotto",
        description: "Carnaroli rice, roasted king oyster mushrooms, parmesan, thyme oil",
        price: "22",
      },
      {
        id: "mains.sea_bass",
        name: "Pan-Roasted Sea Bass",
        description: "Fennel puree, charred leek, mussel cream, parsley potatoes",
        price: "31",
      },
      {
        id: "mains.long_beef_name",
        name: "Slow-Braised Alpine Beef Cheek with Smoked Bone Marrow Crumb",
        description: "Potato fondant, glazed carrots, red wine jus, horseradish gremolata",
        price: "34",
      },
      {
        id: "mains.duck_for_two",
        name: "Aged Duck Crown for Two",
        description:
          "Carved tableside with confit leg croquettes, black garlic jus, bitter leaves, cherry mostarda, and roasted roots finished in duck fat; please allow 35 minutes during peak service",
        price: "78",
      },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      {
        id: "sides.fries",
        name: "Fries",
        description: "Sea salt, malt vinegar mayonnaise",
        price: "6",
      },
      {
        id: "sides.greens",
        name: "Charred Seasonal Greens",
        description: "Lemon, garlic, chili, toasted seeds",
        price: "8",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        id: "desserts.chocolate_tart",
        name: "Dark Chocolate Tart",
        description: "Creme fraiche, cocoa nib praline, smoked sea salt",
        price: "11",
      },
      {
        id: "desserts.pavlova",
        name: "Rhubarb Pavlova",
        description: "Vanilla cream, poached rhubarb, pistachio, citrus syrup",
        price: "10",
      },
      {
        id: "desserts.cheese",
        name: "Local Cheese Selection",
        description: "Three cheeses, pear chutney, seeded crackers",
        price: "16",
      },
    ],
  },
];

const initialElements: CanvasElement[] = [
  {
    id: "brand.logo",
    type: "image",
    source: "/logo.png",
    x: 78,
    y: 52,
    w: 96,
    h: 78,
    fontSize: 16,
    lineHeight: 20,
    weight: 400,
    align: "center",
    color: "black",
    z: 1,
  },
  {
    id: "menu.title",
    type: "text",
    source: "menu.title",
    x: 310,
    y: 56,
    w: 520,
    h: 58,
    fontSize: 44,
    lineHeight: 52,
    weight: 400,
    align: "center",
    color: "black",
    z: 2,
  },
  ...buildSectionElements(initialSections),
];

function buildSectionElements(sections: MenuSection[]) {
  const elements: CanvasElement[] = [];
  const sectionPlacements: Record<string, { x: number; y: number }> = {
    starters: { x: 86, y: 170 },
    mains: { x: 86, y: 450 },
    sides: { x: 640, y: 170 },
    desserts: { x: 640, y: 420 },
  };
  sections.forEach((section, sectionIndex) => {
    const placement = sectionPlacements[section.id] ?? {
      x: sectionIndex % 2 === 0 ? 86 : 640,
      y: Math.min(760, 170 + Math.floor(sectionIndex / 2) * 250),
    };
    const baseX = placement.x;
    const baseY = placement.y;
    elements.push({
      id: `section.${section.id}.title`,
      type: "text",
      source: `section.${section.id}.title`,
      x: baseX,
      y: baseY,
      w: 360,
      h: 34,
      fontSize: 24,
      lineHeight: 30,
      weight: 700,
      align: "left",
      color: "black",
      z: 2,
    });

    let itemY = baseY + 46;
    section.items.forEach((item) => {
      const y = itemY;
      const nameHeight = item.name.length > 42 ? 50 : 26;
      const descriptionOffset = item.name.length > 42 ? 52 : 28;
      const descriptionHeight = item.description.length > 110 ? 72 : 40;
      elements.push(
        {
          id: `${item.id}.name`,
          type: "text",
          source: `${item.id}.name`,
          x: baseX,
          y,
          w: 360,
          h: nameHeight,
          fontSize: 18,
          lineHeight: 22,
          weight: 700,
          align: "left",
          color: "black",
          z: 3,
        },
        {
          id: `${item.id}.description`,
          type: "text",
          source: `${item.id}.description`,
          x: baseX,
          y: y + descriptionOffset,
          w: 380,
          h: descriptionHeight,
          fontSize: 13,
          lineHeight: 17,
          weight: 400,
          align: "left",
          color: "muted",
          z: 3,
        },
        {
          id: `${item.id}.price`,
          type: "text",
          source: `${item.id}.price`,
          x: baseX + 420,
          y,
          w: 56,
          h: 28,
          fontSize: 18,
          lineHeight: 24,
          weight: 700,
          align: "right",
          color: "black",
          z: 3,
        },
      );
      itemY += Math.max(78, descriptionOffset + descriptionHeight + 16);
    });
  });
  return elements;
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "new_item";
}

function moveArrayItem<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function resolveElementText(source: string, sections: MenuSection[]) {
  if (source === "menu.title") return "Tonight's Menu";
  const sectionMatch = source.match(/^section\.([^.]+)\.title$/);
  if (sectionMatch) {
    return sections.find((section) => section.id === sectionMatch[1])?.title ?? "";
  }
  for (const section of sections) {
    for (const item of section.items) {
      if (source === `${item.id}.name`) return item.name;
      if (source === `${item.id}.description`) return item.description;
      if (source === `${item.id}.price`) return item.price;
    }
  }
  return "";
}

function anchors(element: CanvasElement) {
  return {
    vertical: [
      { name: "left", position: element.x },
      { name: "center", position: element.x + element.w / 2 },
      { name: "right", position: element.x + element.w },
    ],
    horizontal: [
      { name: "top", position: element.y },
      { name: "center", position: element.y + element.h / 2 },
      { name: "bottom", position: element.y + element.h },
    ],
  };
}

function applySmartGuides(moving: CanvasElement, elements: CanvasElement[]) {
  const movingAnchors = anchors(moving);
  const guides: Guide[] = [];
  let nextX = moving.x;
  let nextY = moving.y;
  let bestVertical: { distance: number; delta: number; position: number } | null = null;
  let bestHorizontal: { distance: number; delta: number; position: number } | null = null;

  for (const target of elements) {
    if (target.id === moving.id) continue;
    const targetAnchors = anchors(target);
    for (const targetAnchor of targetAnchors.vertical) {
      for (const movingAnchor of movingAnchors.vertical) {
        if (targetAnchor.name !== movingAnchor.name) continue;
        const distance = Math.abs(targetAnchor.position - movingAnchor.position);
        if (distance <= SNAP_THRESHOLD && (!bestVertical || distance < bestVertical.distance)) {
          bestVertical = {
            distance,
            delta: targetAnchor.position - movingAnchor.position,
            position: targetAnchor.position,
          };
        }
      }
    }
    for (const targetAnchor of targetAnchors.horizontal) {
      for (const movingAnchor of movingAnchors.horizontal) {
        if (targetAnchor.name !== movingAnchor.name) continue;
        const distance = Math.abs(targetAnchor.position - movingAnchor.position);
        if (distance <= SNAP_THRESHOLD && (!bestHorizontal || distance < bestHorizontal.distance)) {
          bestHorizontal = {
            distance,
            delta: targetAnchor.position - movingAnchor.position,
            position: targetAnchor.position,
          };
        }
      }
    }
  }

  if (bestVertical) {
    nextX += bestVertical.delta;
    guides.push({ orientation: "vertical", position: bestVertical.position });
  }
  if (bestHorizontal) {
    nextY += bestHorizontal.delta;
    guides.push({ orientation: "horizontal", position: bestHorizontal.position });
  }

  return {
    element: {
      ...moving,
      x: Math.max(0, Math.min(PAGE_WIDTH - moving.w, Math.round(nextX))),
      y: Math.max(0, Math.min(PAGE_HEIGHT - moving.h, Math.round(nextY))),
    },
    guides,
  };
}

function downloadJson(filename: string, value: unknown) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function MenuCanvasDemo() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState(initialSections);
  const [elements, setElements] = useState(initialElements);
  const [selectedId, setSelectedId] = useState("menu.title");
  const [drag, setDrag] = useState<DragState | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [status, setStatus] = useState("Ready. Edit the menu, move elements, and download the layout state.");

  const selectedElement = elements.find((element) => element.id === selectedId) ?? null;
  const sortedElements = useMemo(() => [...elements].sort((left, right) => left.z - right.z), [elements]);

  function pagePoint(event: PointerEvent) {
    const box = pageRef.current?.getBoundingClientRect();
    if (!box) return { x: 0, y: 0 };
    return {
      x: ((event.clientX - box.left) / box.width) * PAGE_WIDTH,
      y: ((event.clientY - box.top) / box.height) * PAGE_HEIGHT,
    };
  }

  function startElementDrag(event: PointerEvent<HTMLDivElement>, element: CanvasElement) {
    event.preventDefault();
    event.stopPropagation();
    const point = pagePoint(event);
    setSelectedId(element.id);
    setDrag({ id: element.id, startX: point.x, startY: point.y, original: element });
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag) return;
    const point = pagePoint(event);
    const dx = point.x - drag.startX;
    const dy = point.y - drag.startY;
    const moving = {
      ...drag.original,
      x: Math.max(0, Math.min(PAGE_WIDTH - drag.original.w, drag.original.x + dx)),
      y: Math.max(0, Math.min(PAGE_HEIGHT - drag.original.h, drag.original.y + dy)),
    };
    const snapped = applySmartGuides(moving, elements);
    setGuides(snapped.guides);
    setElements((current) => current.map((element) => (element.id === drag.id ? snapped.element : element)));
  }

  function endDrag() {
    if (drag) setStatus(`${drag.id} moved. Smart guides keep matching edges aligned.`);
    setDrag(null);
    setGuides([]);
  }

  function updateSection(sectionId: string, title: string) {
    setSections((current) => current.map((section) => (section.id === sectionId ? { ...section, title } : section)));
  }

  function updateItem(sectionId: string, itemId: string, field: keyof MenuItem, value: string) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
            }
          : section,
      ),
    );
  }

  function addSection() {
    const title = `New Section ${sections.length + 1}`;
    const id = slugify(title);
    const section: MenuSection = { id, title, items: [] };
    setSections((current) => [...current, section]);
    const y = Math.min(720, 170 + sections.length * 76);
    const element: CanvasElement = {
      id: `section.${id}.title`,
      type: "text",
      source: `section.${id}.title`,
      x: 86,
      y,
      w: 360,
      h: 34,
      fontSize: 24,
      lineHeight: 30,
      weight: 700,
      align: "left",
      color: "black",
      z: elements.length + 1,
    };
    setElements((current) => [...current, element]);
    setSelectedId(element.id);
    setStatus(`${title} added.`);
  }

  function addItem(sectionId: string) {
    const section = sections.find((entry) => entry.id === sectionId);
    if (!section) return;
    const item: MenuItem = {
      id: `${sectionId}.${slugify(`New ${section.title} Item ${section.items.length + 1}`)}`,
      name: `New ${section.title} Item`,
      description: "Add description",
      price: "0",
    };
    setSections((current) =>
      current.map((entry) => (entry.id === sectionId ? { ...entry, items: [...entry.items, item] } : entry)),
    );
    setElements((current) => [
      ...current,
      ...buildSectionElements([{ ...section, items: [item] }])
        .filter((element) => element.id.startsWith(item.id))
        .map((element, index) => ({
          ...element,
          y: Math.min(790, element.y + section.items.length * 78),
          z: current.length + index + 1,
        })),
    ]);
    setSelectedId(`${item.id}.name`);
    setStatus(`${item.name} added.`);
  }

  function moveSection(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    setSections((current) => moveArrayItem(current, index, target));
    setStatus("Section order changed in the menu panel.");
  }

  function moveItem(sectionId: string, index: number, direction: -1 | 1) {
    setSections((current) =>
      current.map((section) => {
        if (section.id !== sectionId) return section;
        const target = index + direction;
        if (target < 0 || target >= section.items.length) return section;
        return { ...section, items: moveArrayItem(section.items, index, target) };
      }),
    );
    setStatus("Item order changed in the menu panel.");
  }

  function updateSelectedElement(patch: Partial<CanvasElement>) {
    setElements((current) =>
      current.map((element) => (element.id === selectedId ? { ...element, ...patch } : element)),
    );
  }

  function downloadLayout() {
    downloadJson("tailortaste-menu-editor-layout.json", {
      exportedAt: new Date().toISOString(),
      page: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
      sections,
      elements,
    });
    setStatus("Downloaded the current menu editor layout JSON.");
  }

  return (
    <section className="bg-paper px-4 py-6 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-4">
        <div className="flex flex-col gap-3 border-b border-ink/10 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Password protected demo</p>
            <h1 className="font-serif text-3xl leading-tight sm:text-5xl">TailorTaste Menu Editor</h1>
            <p className="mt-2 max-w-3xl text-sm text-graphite">
              Move menu objects, align paragraphs with smart guides, edit content, and export a layout snapshot.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-md bg-cypress px-4 py-2 text-sm font-bold text-chalk"
              type="button"
              onClick={() => setStatus("Preview saved in this browser session.")}
            >
              Save preview
            </button>
            <button
              className="rounded-md border border-accent px-4 py-2 text-sm font-bold text-accent"
              type="button"
              onClick={downloadLayout}
            >
              Download layout
            </button>
          </div>
        </div>

        <p className="rounded-md border border-ink/10 bg-chalk px-4 py-2 text-sm text-graphite">{status}</p>

        <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)_320px]">
          <aside className="rounded-md border border-ink/10 bg-chalk p-4 shadow-soft">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                className="rounded-md border border-accent px-3 py-2 text-sm font-bold text-accent"
                type="button"
                onClick={addSection}
              >
                + Section
              </button>
            </div>
            <div className="space-y-3">
              {sections.map((section, sectionIndex) => (
                <section key={section.id} className="rounded-md border border-ink/10 bg-paper p-3">
                  <div className="grid grid-cols-[30px_1fr_72px] gap-2">
                    <div className="flex flex-col gap-1">
                      <button
                        className="rounded border border-ink/15 text-xs"
                        type="button"
                        aria-label={`Move ${section.title} up`}
                        onClick={() => moveSection(sectionIndex, -1)}
                      >
                        Up
                      </button>
                      <button
                        className="rounded border border-ink/15 text-xs"
                        type="button"
                        aria-label={`Move ${section.title} down`}
                        onClick={() => moveSection(sectionIndex, 1)}
                      >
                        Dn
                      </button>
                    </div>
                    <input
                      className="rounded-md border border-ink/15 bg-chalk px-3 py-2 text-sm font-bold"
                      value={section.title}
                      onChange={(event) => updateSection(section.id, event.target.value)}
                    />
                    <button
                      className="rounded-md border border-accent px-2 text-xs font-bold text-accent"
                      type="button"
                      onClick={() => addItem(section.id)}
                    >
                      + Item
                    </button>
                  </div>

                  <div className="mt-3 space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={item.id} className="grid grid-cols-[30px_1fr_58px] gap-2 border-t border-ink/10 pt-3">
                        <div className="flex flex-col gap-1">
                          <button
                            className="rounded border border-ink/15 text-xs"
                            type="button"
                            aria-label={`Move ${item.name} up`}
                            onClick={() => moveItem(section.id, itemIndex, -1)}
                          >
                            Up
                          </button>
                          <button
                            className="rounded border border-ink/15 text-xs"
                            type="button"
                            aria-label={`Move ${item.name} down`}
                            onClick={() => moveItem(section.id, itemIndex, 1)}
                          >
                            Dn
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            className="w-full rounded-md border border-ink/15 bg-chalk px-3 py-2 text-sm"
                            value={item.name}
                            onChange={(event) => updateItem(section.id, item.id, "name", event.target.value)}
                          />
                          <textarea
                            className="min-h-16 w-full resize-y rounded-md border border-ink/15 bg-chalk px-3 py-2 text-sm leading-snug"
                            value={item.description}
                            onChange={(event) => updateItem(section.id, item.id, "description", event.target.value)}
                          />
                        </div>
                        <input
                          className="rounded-md border border-ink/15 bg-chalk px-2 py-2 text-right text-sm font-bold"
                          value={item.price}
                          onChange={(event) => updateItem(section.id, item.id, "price", event.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </aside>

          <section className="rounded-md border border-ink/10 bg-chalk p-4 shadow-soft">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">Menu Editor</h2>
                <p className="text-xs text-graphite">{PAGE_WIDTH} x {PAGE_HEIGHT}px editor surface</p>
              </div>
              <p className="text-xs text-graphite">Drag elements. Guides appear when edges align.</p>
            </div>
            <div className="overflow-auto rounded-md border border-ink/10 bg-mist p-5">
              <div
                ref={pageRef}
                className="relative mx-auto aspect-[1200/900] w-full max-w-[1080px] overflow-hidden border border-ink/15 bg-[#f8f4ea] shadow-soft [container-type:inline-size]"
                data-canvas-page
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                onPointerDown={() => setSelectedId("")}
              >
                {sortedElements.map((element) => {
                  const text = resolveElementText(element.source, sections);
                  const selected = element.id === selectedId;
                  const colorClass =
                    element.color === "accent" ? "text-accent" : element.color === "muted" ? "text-graphite" : "text-ink";
                  return (
                    <div
                      key={element.id}
                      className={`absolute select-none overflow-hidden border bg-chalk/40 ${colorClass} ${
                        selected ? "border-accent ring-2 ring-accent/30" : "border-accent/20"
                      }`}
                      data-canvas-element={element.id}
                      style={{
                        left: `${(element.x / PAGE_WIDTH) * 100}%`,
                        top: `${(element.y / PAGE_HEIGHT) * 100}%`,
                        width: `${(element.w / PAGE_WIDTH) * 100}%`,
                        height: `${(element.h / PAGE_HEIGHT) * 100}%`,
                        zIndex: element.z,
                        fontSize: `calc(${(element.fontSize / PAGE_WIDTH) * 100}cqw)`,
                        lineHeight: `calc(${(element.lineHeight / PAGE_WIDTH) * 100}cqw)`,
                        fontWeight: element.weight,
                        textAlign: element.align,
                      }}
                      onPointerDown={(event) => startElementDrag(event, element)}
                    >
                      {element.type === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt="TailorTaste mark" className="h-full w-full object-contain" src={element.source} />
                      ) : (
                        text
                      )}
                    </div>
                  );
                })}

                {guides.map((guide, index) => (
                  <div
                    key={`${guide.orientation}-${guide.position}-${index}`}
                    className="pointer-events-none absolute z-[999] bg-accent shadow-[0_0_0_1px_rgba(251,253,249,0.8)]"
                    style={
                      guide.orientation === "vertical"
                        ? {
                            left: `${(guide.position / PAGE_WIDTH) * 100}%`,
                            top: 0,
                            width: 2,
                            height: "100%",
                          }
                        : {
                            left: 0,
                            top: `${(guide.position / PAGE_HEIGHT) * 100}%`,
                            width: "100%",
                            height: 2,
                          }
                    }
                  />
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-md border border-ink/10 bg-chalk p-4 shadow-soft">
            <h2 className="mb-3 text-lg font-bold">Inspector</h2>
            {selectedElement ? (
              <div className="space-y-3 text-sm">
                <p className="break-words text-xs font-bold text-accent">Selected: {selectedElement.id}</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["x", "y", "w", "h"] as const).map((field) => (
                    <label key={field} className="space-y-1">
                      <span className="block text-xs text-graphite">{field.toUpperCase()}</span>
                      <input
                        className="w-full rounded-md border border-ink/15 px-2 py-2"
                        type="number"
                        value={Math.round(selectedElement[field])}
                        onChange={(event) => updateSelectedElement({ [field]: Number(event.target.value) })}
                      />
                    </label>
                  ))}
                </div>
                <label className="block space-y-1">
                  <span className="block text-xs text-graphite">Text align</span>
                  <select
                    className="w-full rounded-md border border-ink/15 px-2 py-2"
                    value={selectedElement.align}
                    onChange={(event) => updateSelectedElement({ align: event.target.value as CanvasElement["align"] })}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </label>
                <label className="block space-y-1">
                  <span className="block text-xs text-graphite">Color</span>
                  <select
                    className="w-full rounded-md border border-ink/15 px-2 py-2"
                    value={selectedElement.color}
                    onChange={(event) => updateSelectedElement({ color: event.target.value as CanvasElement["color"] })}
                  >
                    <option value="black">Black</option>
                    <option value="muted">Muted</option>
                    <option value="accent">Accent</option>
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="space-y-1">
                    <span className="block text-xs text-graphite">Font size</span>
                    <input
                      className="w-full rounded-md border border-ink/15 px-2 py-2"
                      type="number"
                      value={selectedElement.fontSize}
                      onChange={(event) => updateSelectedElement({ fontSize: Number(event.target.value) })}
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="block text-xs text-graphite">Weight</span>
                    <input
                      className="w-full rounded-md border border-ink/15 px-2 py-2"
                      type="number"
                      value={selectedElement.weight}
                      onChange={(event) => updateSelectedElement({ weight: Number(event.target.value) })}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="rounded-md border border-ink/15 px-3 py-2 text-xs font-bold"
                    type="button"
                    onClick={() => updateSelectedElement({ x: Math.round((PAGE_WIDTH - selectedElement.w) / 2) })}
                  >
                    Center X
                  </button>
                  <button
                    className="rounded-md border border-ink/15 px-3 py-2 text-xs font-bold"
                    type="button"
                    onClick={() => updateSelectedElement({ y: Math.round((PAGE_HEIGHT - selectedElement.h) / 2) })}
                  >
                    Center Y
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-graphite">Select an element in the Menu Editor.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
