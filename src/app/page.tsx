import type { Metadata } from "next";
import {
  categoryGap,
  dreamOutcomes,
  finalCta,
  founderNote,
  futureLayer,
  hero,
  objectReveal,
  possibilities,
  serviceFit,
  whyNow,
} from "@/content/home";
import { CategoryGap } from "@/components/sections/CategoryGap";
import { DreamOutcomes } from "@/components/sections/DreamOutcomes";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderNote } from "@/components/sections/FounderNote";
import { FutureLayer } from "@/components/sections/FutureLayer";
import { HeroManifesto } from "@/components/sections/HeroManifesto";
import { ObjectReveal } from "@/components/sections/ObjectReveal";
import { PossibilityGrid } from "@/components/sections/PossibilityGrid";
import { ServiceFit } from "@/components/sections/ServiceFit";
import { WhyNow } from "@/components/sections/WhyNow";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata(
  "Home",
  "/",
  "TailorTaste is a leather bound physical menu object for premium restaurants and hotels. Staff can update language, service state, availability, and menu content.",
  {
    keywords: ["premium restaurant menu", "hotel menu system", "physical digital menu"],
  }
);

export default function Home() {
  return (
    <>
      <HeroManifesto {...hero} />
      <CategoryGap {...categoryGap} />
      <WhyNow {...whyNow} />
      <ObjectReveal {...objectReveal} />
      <PossibilityGrid {...possibilities} />
      <DreamOutcomes {...dreamOutcomes} />
      <ServiceFit {...serviceFit} />
      <FutureLayer {...futureLayer} />
      <FounderNote {...founderNote} />
      <FinalCTA {...finalCta} />
    </>
  );
}
