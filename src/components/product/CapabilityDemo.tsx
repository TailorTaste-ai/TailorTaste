"use client";

import { useCallback, useMemo, useState } from "react";
import {
  allDishes,
  menuByState,
  type Diet,
  type MenuLanguage,
  type MenuState,
} from "@/content/menuDemo";
import { MenuDemoFrame } from "./MenuDemoFrame";
import { RestaurantMenu } from "./RestaurantMenu";
import { WaiterDashboard } from "./WaiterDashboard";

export function CapabilityDemo() {
  const [language, setLanguage] = useState<MenuLanguage>("en");
  const [state, setState] = useState<MenuState>("dinner");
  const [brightness, setBrightness] = useState(100);
  const [pdfMode, setPdfMode] = useState(false);
  const [diet, setDiet] = useState<Diet>("omnivore");
  const [hiddenItems, setHiddenItems] = useState<ReadonlySet<string>>(() => new Set());
  /** Increments on every dashboard toggle; remounts the menu so the
      single shared fade animation plays. */
  const [menuVersion, setMenuVersion] = useState(0);

  const dishes = useMemo(() => allDishes(menuByState[state]), [state]);

  const bumpMenu = useCallback(() => {
    setMenuVersion((v) => v + 1);
  }, []);

  const handleLanguageChange = useCallback(
    (lang: MenuLanguage) => {
      if (lang === language) return;
      setLanguage(lang);
      bumpMenu();
    },
    [language, bumpMenu],
  );

  const handleStateChange = useCallback(
    (next: MenuState) => {
      if (next === state) return;
      setState(next);
      bumpMenu();
    },
    [state, bumpMenu],
  );

  const handlePdfModeChange = useCallback(
    (on: boolean) => {
      if (on === pdfMode) return;
      setPdfMode(on);
      bumpMenu();
    },
    [pdfMode, bumpMenu],
  );

  const handleDietChange = useCallback(
    (next: Diet) => {
      if (next === diet) return;
      setDiet(next);
      bumpMenu();
    },
    [diet, bumpMenu],
  );

  const handleToggleItem = useCallback(
    (id: string) => {
      setHiddenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
      bumpMenu();
    },
    [bumpMenu],
  );

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start lg:gap-10">
      <div className="order-2 lg:order-1">
        <WaiterDashboard
          language={language}
          onLanguageChange={handleLanguageChange}
          state={state}
          onStateChange={handleStateChange}
          brightness={brightness}
          onBrightnessChange={setBrightness}
          pdfMode={pdfMode}
          onPdfModeChange={handlePdfModeChange}
          hiddenItems={hiddenItems}
          onToggleItem={handleToggleItem}
          diet={diet}
          onDietChange={handleDietChange}
          dishes={dishes}
        />
      </div>
      <div className="order-1 lg:order-2 lg:sticky lg:top-24">
        <MenuDemoFrame>
          <RestaurantMenu
            language={language}
            state={state}
            brightness={brightness}
            pdfMode={pdfMode}
            hiddenItems={hiddenItems}
            diet={diet}
            appearVersion={menuVersion}
          />
        </MenuDemoFrame>
      </div>
    </div>
  );
}
