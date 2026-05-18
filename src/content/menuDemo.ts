export type MenuLanguage = "en" | "fr" | "de";
export type MenuState = "lunch" | "dinner" | "event";
export type Diet = "vegan" | "vegetarian" | "omnivore";

export type LocalizedText = { name: string; desc: string };

export type LocalizedDish = {
  id: string;
  price: string;
  i18n: Record<MenuLanguage, LocalizedText>;
};

/*
 * Diet tags for every dish across all states.
 * Filter rules:
 *   vegan      → only `vegan`
 *   vegetarian → `vegan` + `vegetarian`
 *   omnivore   → everything
 */
export const dishDiet: Record<string, Diet> = {
  /* Dinner — starters */
  oysters: "omnivore",
  "tuna-tartare": "omnivore",
  "langoustine-raviolo": "omnivore",
  asparagus: "vegetarian",
  "foie-gras": "omnivore",
  "hamachi-crudo": "omnivore",
  "tomato-carpaccio": "vegan",
  "mushroom-veloute": "vegetarian",
  /* Dinner — chef recs (service offerings, kept for any diet) */
  "tasting-menu": "omnivore",
  sommelier: "vegan",
  "signature-reserve": "vegan",
  /* Dinner — mains */
  wagyu: "omnivore",
  sole: "omnivore",
  "bresse-chicken": "omnivore",
  turbot: "omnivore",
  "lobster-thermidor": "omnivore",
  lamb: "omnivore",
  "leek-cassoulet": "vegan",
  "saffron-risotto-truffle": "vegetarian",
  /* Dinner — desserts */
  souffle: "vegetarian",
  millefeuille: "vegetarian",
  "affine-cheese-cart": "vegetarian",
  cremeux: "vegetarian",
  "baba-au-rhum": "vegetarian",
  tatin: "vegetarian",
  "dark-chocolate-sorbet": "vegan",
  /* Lunch — starters */
  "soup-of-day": "vegan",
  "garden-salad": "vegan",
  burrata: "vegetarian",
  "tuna-tartare-lunch": "omnivore",
  /* Lunch — mains */
  croque: "vegetarian",
  risotto: "vegetarian",
  "sea-bass": "omnivore",
  "steak-frites": "omnivore",
  /* Lunch — desserts */
  "lemon-tart": "vegetarian",
  chocolate: "vegetarian",
  sorbet: "vegan",
  /* Event */
  "canape-caviar": "omnivore",
  "canape-tuna": "omnivore",
  "canape-foie": "omnivore",
  "canape-arancini": "vegan",
  "canape-goat": "vegetarian",
  "event-pairing": "vegan",
  "event-turbot": "omnivore",
  "event-wellington": "omnivore",
  "event-squash": "vegan",
  "event-mushroom-risotto": "vegetarian",
  "event-millefeuille": "vegetarian",
  "event-mignardises": "vegetarian",
  "event-yuzu-sorbet": "vegan",
  "event-praline-tart": "vegetarian",
};

export function dishMatchesDiet(id: string, diet: Diet): boolean {
  const tag = dishDiet[id] ?? "omnivore";
  if (diet === "omnivore") return true;
  if (diet === "vegetarian") return tag === "vegan" || tag === "vegetarian";
  return tag === "vegan";
}

export type MenuHeadings = {
  starters: string;
  chef1: string;
  chef2: string;
  mains: string;
  desserts: string;
};

export type MenuBrand = {
  /* 1-2 letter monogram, e.g. "MG" */
  monogram: string;
  /* Brand name shown across the top — kept in English (proper noun) */
  name: string;
  /* Localized event/occasion subtitle */
  subtitle: Record<MenuLanguage, string>;
};

export type MenuContent = {
  starters: LocalizedDish[];
  chefRecs: LocalizedDish[];
  mains: LocalizedDish[];
  desserts: LocalizedDish[];
  headings: Record<MenuLanguage, MenuHeadings>;
  title: Record<MenuLanguage, string>;
  brand?: MenuBrand;
};

type Trio<T> = { en: T; fr: T; de: T };

function i18n(en: LocalizedText, fr: LocalizedText, de: LocalizedText): Record<MenuLanguage, LocalizedText> {
  return { en, fr, de };
}

/* ─── Dinner ─── */
const dinnerStarters: LocalizedDish[] = [
  {
    id: "oysters",
    price: "28",
    i18n: i18n(
      { name: "Gillardeau Oysters", desc: "champagne mignonette" },
      { name: "Huîtres Gillardeau", desc: "mignonette au champagne" },
      { name: "Gillardeau-Austern", desc: "Champagner-Mignonette" },
    ),
  },
  {
    id: "tuna-tartare",
    price: "32",
    i18n: i18n(
      { name: "Bluefin Tuna Tartare", desc: "ossetra caviar, citrus oil" },
      { name: "Tartare de Thon Rouge", desc: "caviar ossetra, huile d'agrumes" },
      { name: "Tatar vom Roten Thun", desc: "Ossetra-Kaviar, Zitrusöl" },
    ),
  },
  {
    id: "langoustine-raviolo",
    price: "26",
    i18n: i18n(
      { name: "Langoustine Raviolo", desc: "shellfish velouté" },
      { name: "Raviolo de Langoustine", desc: "velouté de crustacés" },
      { name: "Langustinen-Raviolo", desc: "Krustentier-Velouté" },
    ),
  },
  {
    id: "asparagus",
    price: "24",
    i18n: i18n(
      { name: "White Asparagus", desc: "hazelnut, mimolette, herbs" },
      { name: "Asperges Blanches", desc: "noisette, mimolette, herbes" },
      { name: "Weißer Spargel", desc: "Haselnuss, Mimolette, Kräuter" },
    ),
  },
  {
    id: "foie-gras",
    price: "29",
    i18n: i18n(
      { name: "Foie Gras Torchon", desc: "quince, brioche, sea salt" },
      { name: "Foie Gras au Torchon", desc: "coing, brioche, fleur de sel" },
      { name: "Foie Gras en Torchon", desc: "Quitte, Brioche, Meersalz" },
    ),
  },
  {
    id: "hamachi-crudo",
    price: "27",
    i18n: i18n(
      { name: "Hamachi Crudo", desc: "yuzu, finger lime, shiso" },
      { name: "Crudo de Hamachi", desc: "yuzu, citron caviar, shiso" },
      { name: "Hamachi-Crudo", desc: "Yuzu, Fingerlimette, Shiso" },
    ),
  },
];

const dinnerChefRecs: LocalizedDish[] = [
  {
    id: "tasting-menu",
    price: "145",
    i18n: i18n(
      { name: "Chef's Tasting Menu", desc: "eight-course seasonal journey" },
      { name: "Menu Dégustation du Chef", desc: "voyage saisonnier en huit services" },
      { name: "Degustationsmenü des Küchenchefs", desc: "saisonale Reise in acht Gängen" },
    ),
  },
  {
    id: "sommelier",
    price: "95",
    i18n: i18n(
      { name: "Sommelier Pairing", desc: "rare and cellar selections" },
      { name: "Accord du Sommelier", desc: "sélections rares de cave" },
      { name: "Weinbegleitung des Sommeliers", desc: "rare Auswahl aus dem Keller" },
    ),
  },
  {
    id: "signature-reserve",
    price: "65",
    i18n: i18n(
      { name: "Signature Reserve", desc: "prestige wine supplement" },
      { name: "Réserve Signature", desc: "supplément de vins prestige" },
      { name: "Signature Reserve", desc: "Prestige-Weinzuschlag" },
    ),
  },
];

const dinnerMains: LocalizedDish[] = [
  {
    id: "wagyu",
    price: "96",
    i18n: i18n(
      { name: "A5 Wagyu Rossini", desc: "black truffle, madeira jus" },
      { name: "Wagyu A5 Rossini", desc: "truffe noire, jus de madère" },
      { name: "Wagyu A5 Rossini", desc: "schwarzer Trüffel, Madeira-Jus" },
    ),
  },
  {
    id: "sole",
    price: "72",
    i18n: i18n(
      { name: "Dover Sole Meunière", desc: "brown butter, Amalfi lemon" },
      { name: "Sole de Douvres Meunière", desc: "beurre noisette, citron d'Amalfi" },
      { name: "Seezunge Müllerin Art", desc: "Nussbutter, Amalfi-Zitrone" },
    ),
  },
  {
    id: "bresse-chicken",
    price: "58",
    i18n: i18n(
      { name: "Bresse Chicken Suprême", desc: "morels, vin jaune cream" },
      { name: "Suprême de Volaille de Bresse", desc: "morilles, crème au vin jaune" },
      { name: "Bresse-Huhn Suprême", desc: "Morcheln, Vin-Jaune-Creme" },
    ),
  },
  {
    id: "turbot",
    price: "76",
    i18n: i18n(
      { name: "Atlantic Turbot", desc: "champagne sauce, caviar" },
      { name: "Turbot de l'Atlantique", desc: "sauce champagne, caviar" },
      { name: "Atlantischer Steinbutt", desc: "Champagnersauce, Kaviar" },
    ),
  },
  {
    id: "lobster-thermidor",
    price: "82",
    i18n: i18n(
      { name: "Lobster Thermidor", desc: "sauce américaine, fines herbes" },
      { name: "Homard Thermidor", desc: "sauce américaine, fines herbes" },
      { name: "Hummer Thermidor", desc: "Sauce américaine, feine Kräuter" },
    ),
  },
  {
    id: "lamb",
    price: "64",
    i18n: i18n(
      { name: "Rack of Lamb", desc: "herb crust, ratatouille, jus" },
      { name: "Carré d'Agneau", desc: "croûte d'herbes, ratatouille, jus" },
      { name: "Lammkarree", desc: "Kräuterkruste, Ratatouille, Jus" },
    ),
  },
];

const dinnerDesserts: LocalizedDish[] = [
  {
    id: "souffle",
    price: "24",
    i18n: i18n(
      { name: "Valrhona Soufflé", desc: "single-origin chocolate" },
      { name: "Soufflé Valrhona", desc: "chocolat grand cru" },
      { name: "Valrhona-Soufflé", desc: "sortenreine Schokolade" },
    ),
  },
  {
    id: "millefeuille",
    price: "21",
    i18n: i18n(
      { name: "Citrus Mille-Feuille", desc: "bergamot cream" },
      { name: "Mille-Feuille aux Agrumes", desc: "crème à la bergamote" },
      { name: "Zitrus-Mille-Feuille", desc: "Bergamottecreme" },
    ),
  },
  {
    id: "affine-cheese-cart",
    price: "28",
    i18n: i18n(
      { name: "Affiné Cheese Cart", desc: "selection du maître" },
      { name: "Chariot de Fromages Affinés", desc: "sélection du maître" },
      { name: "Affinierter Käsewagen", desc: "Auswahl des Maître" },
    ),
  },
  {
    id: "cremeux",
    price: "22",
    i18n: i18n(
      { name: "Vanilla Crémeux", desc: "pear, saffron, almond" },
      { name: "Crémeux à la Vanille", desc: "poire, safran, amande" },
      { name: "Vanille-Crémeux", desc: "Birne, Safran, Mandel" },
    ),
  },
  {
    id: "baba-au-rhum",
    price: "23",
    i18n: i18n(
      { name: "Baba au Rhum", desc: "Madagascar vanilla chantilly" },
      { name: "Baba au Rhum", desc: "chantilly vanille de Madagascar" },
      { name: "Baba au Rhum", desc: "Madagaskar-Vanille-Chantilly" },
    ),
  },
  {
    id: "tatin",
    price: "20",
    i18n: i18n(
      { name: "Tarte Tatin", desc: "calvados, crème fraîche" },
      { name: "Tarte Tatin", desc: "calvados, crème fraîche" },
      { name: "Tarte Tatin", desc: "Calvados, Crème fraîche" },
    ),
  },
];

/* ─── Lunch ─── */
const lunchStarters: LocalizedDish[] = [
  {
    id: "soup-of-day",
    price: "14",
    i18n: i18n(
      { name: "Soup of the Day", desc: "seasonal vegetable, herb oil" },
      { name: "Soupe du Jour", desc: "légumes de saison, huile d'herbes" },
      { name: "Tagessuppe", desc: "Saisongemüse, Kräuteröl" },
    ),
  },
  {
    id: "garden-salad",
    price: "16",
    i18n: i18n(
      { name: "Garden Salad", desc: "heirloom tomatoes, shaved pecorino" },
      { name: "Salade du Jardin", desc: "tomates anciennes, pecorino râpé" },
      { name: "Gartensalat", desc: "alte Tomatensorten, gehobelter Pecorino" },
    ),
  },
  {
    id: "burrata",
    price: "19",
    i18n: i18n(
      { name: "Burrata di Puglia", desc: "peach, basil, aged balsamic" },
      { name: "Burrata des Pouilles", desc: "pêche, basilic, balsamique vieilli" },
      { name: "Burrata aus Apulien", desc: "Pfirsich, Basilikum, gereifter Balsamico" },
    ),
  },
  {
    id: "tuna-tartare-lunch",
    price: "24",
    i18n: i18n(
      { name: "Tuna Tartare", desc: "citrus oil, avocado" },
      { name: "Tartare de Thon", desc: "huile d'agrumes, avocat" },
      { name: "Thunfisch-Tatar", desc: "Zitrusöl, Avocado" },
    ),
  },
];

const lunchMains: LocalizedDish[] = [
  {
    id: "croque",
    price: "22",
    i18n: i18n(
      { name: "Croque Monsieur", desc: "gruyère, béchamel, truffle" },
      { name: "Croque Monsieur", desc: "gruyère, béchamel, truffe" },
      { name: "Croque Monsieur", desc: "Gruyère, Béchamel, Trüffel" },
    ),
  },
  {
    id: "risotto",
    price: "28",
    i18n: i18n(
      { name: "Saffron Risotto", desc: "carnaroli, parmesan, chive" },
      { name: "Risotto au Safran", desc: "carnaroli, parmesan, ciboulette" },
      { name: "Safranrisotto", desc: "Carnaroli, Parmesan, Schnittlauch" },
    ),
  },
  {
    id: "sea-bass",
    price: "34",
    i18n: i18n(
      { name: "Grilled Sea Bass", desc: "fennel, lemon, olive oil" },
      { name: "Loup Grillé", desc: "fenouil, citron, huile d'olive" },
      { name: "Gegrillter Wolfsbarsch", desc: "Fenchel, Zitrone, Olivenöl" },
    ),
  },
  {
    id: "steak-frites",
    price: "36",
    i18n: i18n(
      { name: "Steak Frites", desc: "bavette, bordelaise, pommes pont-neuf" },
      { name: "Steak Frites", desc: "bavette, bordelaise, pommes pont-neuf" },
      { name: "Steak Frites", desc: "Bavette, Bordelaise, Pont-Neuf-Kartoffeln" },
    ),
  },
];

const lunchDesserts: LocalizedDish[] = [
  {
    id: "lemon-tart",
    price: "14",
    i18n: i18n(
      { name: "Lemon Tart", desc: "Italian meringue" },
      { name: "Tarte au Citron", desc: "meringue italienne" },
      { name: "Zitronentarte", desc: "italienisches Baiser" },
    ),
  },
  {
    id: "chocolate",
    price: "15",
    i18n: i18n(
      { name: "Chocolate Fondant", desc: "vanilla crème anglaise" },
      { name: "Fondant au Chocolat", desc: "crème anglaise à la vanille" },
      { name: "Schokoladenfondant", desc: "Vanille-Crème-anglaise" },
    ),
  },
  {
    id: "sorbet",
    price: "12",
    i18n: i18n(
      { name: "Seasonal Sorbet", desc: "three scoops, tuile" },
      { name: "Sorbet de Saison", desc: "trois boules, tuile" },
      { name: "Saisonales Sorbet", desc: "drei Kugeln, Tuile" },
    ),
  },
];

/* ─── Event (fixed tasting) ─── */
const eventStarters: LocalizedDish[] = [
  {
    id: "canape-caviar",
    price: "—",
    i18n: i18n(
      { name: "Caviar Blini", desc: "crème fraîche, chive" },
      { name: "Blini au Caviar", desc: "crème fraîche, ciboulette" },
      { name: "Kaviar-Blini", desc: "Crème fraîche, Schnittlauch" },
    ),
  },
  {
    id: "canape-tuna",
    price: "—",
    i18n: i18n(
      { name: "Tuna Cornet", desc: "yuzu, shiso" },
      { name: "Cornet de Thon", desc: "yuzu, shiso" },
      { name: "Thunfisch-Cornet", desc: "Yuzu, Shiso" },
    ),
  },
  {
    id: "canape-foie",
    price: "—",
    i18n: i18n(
      { name: "Foie Gras Macaron", desc: "fig, sea salt" },
      { name: "Macaron au Foie Gras", desc: "figue, fleur de sel" },
      { name: "Foie-Gras-Macaron", desc: "Feige, Meersalz" },
    ),
  },
  {
    id: "canape-arancini",
    price: "—",
    i18n: i18n(
      { name: "Truffle Arancini", desc: "wild mushroom, smoked paprika" },
      { name: "Arancini à la Truffe", desc: "champignons sauvages, paprika fumé" },
      { name: "Trüffel-Arancini", desc: "Waldpilze, geräuchertes Paprikapulver" },
    ),
  },
  {
    id: "canape-goat",
    price: "—",
    i18n: i18n(
      { name: "Goat Cheese Crostini", desc: "fig, walnut, honey thyme" },
      { name: "Crostini Chèvre", desc: "figue, noix, thym au miel" },
      { name: "Ziegenkäse-Crostini", desc: "Feige, Walnuss, Honigthymian" },
    ),
  },
];

const eventMains: LocalizedDish[] = [
  {
    id: "event-turbot",
    price: "—",
    i18n: i18n(
      { name: "Wild Turbot", desc: "champagne sauce, caviar" },
      { name: "Turbot Sauvage", desc: "sauce champagne, caviar" },
      { name: "Wilder Steinbutt", desc: "Champagnersauce, Kaviar" },
    ),
  },
  {
    id: "event-wellington",
    price: "—",
    i18n: i18n(
      { name: "Beef Wellington", desc: "duxelles, madeira jus" },
      { name: "Bœuf Wellington", desc: "duxelles, jus de madère" },
      { name: "Beef Wellington", desc: "Duxelles, Madeira-Jus" },
    ),
  },
  {
    id: "event-squash",
    price: "—",
    i18n: i18n(
      { name: "Roasted Squash, Black Garlic", desc: "farro, pomegranate, herb pistou" },
      { name: "Courge Rôtie, Ail Noir", desc: "farro, grenade, pistou aux herbes" },
      { name: "Gerösteter Kürbis, schwarzer Knoblauch", desc: "Emmer, Granatapfel, Kräuter-Pistou" },
    ),
  },
  {
    id: "event-mushroom-risotto",
    price: "—",
    i18n: i18n(
      { name: "Wild Mushroom Risotto", desc: "aged parmesan, white truffle oil" },
      { name: "Risotto aux Champignons Sauvages", desc: "parmesan affiné, huile de truffe blanche" },
      { name: "Waldpilz-Risotto", desc: "gereifter Parmesan, weißes Trüffelöl" },
    ),
  },
];

const eventDesserts: LocalizedDish[] = [
  {
    id: "event-millefeuille",
    price: "—",
    i18n: i18n(
      { name: "Vanilla Mille-Feuille", desc: "Madagascar vanilla, gold leaf" },
      { name: "Mille-Feuille Vanille", desc: "vanille de Madagascar, feuille d'or" },
      { name: "Vanille-Mille-Feuille", desc: "Madagaskar-Vanille, Blattgold" },
    ),
  },
  {
    id: "event-mignardises",
    price: "—",
    i18n: i18n(
      { name: "Mignardises", desc: "petits fours, chocolate selection" },
      { name: "Mignardises", desc: "petits fours, sélection chocolat" },
      { name: "Mignardises", desc: "Petits Fours, Schokoladenauswahl" },
    ),
  },
  {
    id: "event-yuzu-sorbet",
    price: "—",
    i18n: i18n(
      { name: "Coconut & Yuzu Sorbet", desc: "candied ginger" },
      { name: "Sorbet Coco-Yuzu", desc: "gingembre confit" },
      { name: "Kokos-Yuzu-Sorbet", desc: "kandierter Ingwer" },
    ),
  },
  {
    id: "event-praline-tart",
    price: "—",
    i18n: i18n(
      { name: "Hazelnut Praline Tart", desc: "caramel, sea salt" },
      { name: "Tarte Praliné Noisette", desc: "caramel, fleur de sel" },
      { name: "Haselnuss-Praliné-Tarte", desc: "Karamell, Meersalz" },
    ),
  },
];

const eventChefRecs: LocalizedDish[] = [
  {
    id: "event-pairing",
    price: "—",
    i18n: i18n(
      { name: "Curated Wine Pairing", desc: "five-course evening" },
      { name: "Accord Mets et Vins", desc: "cinq services pour la soirée" },
      { name: "Kuratierte Weinbegleitung", desc: "Fünf-Gänge-Abend" },
    ),
  },
];

const defaultHeadings: Record<MenuLanguage, MenuHeadings> = {
  en: { starters: "Starters", chef1: "Chef's", chef2: "Recommendations", mains: "Main Courses", desserts: "Desserts" },
  fr: { starters: "Entrées", chef1: "Suggestions", chef2: "du Chef", mains: "Plats", desserts: "Desserts" },
  de: { starters: "Vorspeisen", chef1: "Empfehlungen", chef2: "des Küchenchefs", mains: "Hauptgänge", desserts: "Desserts" },
};

const dinnerTitle: Trio<string> = { en: "Dinner", fr: "Dîner", de: "Abendessen" };
const lunchTitle: Trio<string> = { en: "Lunch", fr: "Déjeuner", de: "Mittagessen" };
const eventTitle: Trio<string> = { en: "Private Event", fr: "Événement Privé", de: "Private Veranstaltung" };

export const menuByState: Record<MenuState, MenuContent> = {
  dinner: {
    starters: dinnerStarters,
    chefRecs: dinnerChefRecs,
    mains: dinnerMains,
    desserts: dinnerDesserts,
    headings: defaultHeadings,
    title: dinnerTitle,
  },
  lunch: {
    starters: lunchStarters,
    chefRecs: dinnerChefRecs.slice(0, 2),
    mains: lunchMains,
    desserts: lunchDesserts,
    headings: defaultHeadings,
    title: lunchTitle,
  },
  event: {
    starters: eventStarters,
    chefRecs: eventChefRecs,
    mains: eventMains,
    desserts: eventDesserts,
    headings: defaultHeadings,
    title: eventTitle,
    brand: {
      monogram: "MG",
      name: "MERIDIAN GROUP",
      subtitle: {
        en: "Annual Partners Summit · Spring 2026",
        fr: "Sommet Annuel des Partenaires · Printemps 2026",
        de: "Jährliches Partnertreffen · Frühjahr 2026",
      },
    },
  },
};

/* Convenience: flat list of dishes for a given state (for the item-toggling UI) */
export function allDishes(content: MenuContent): LocalizedDish[] {
  return [...content.starters, ...content.chefRecs, ...content.mains, ...content.desserts];
}
