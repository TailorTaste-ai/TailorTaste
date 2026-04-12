import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderTeam } from "@/components/sections/FounderTeam";
import { aboutPage } from "@/content/about";
import { finalCta } from "@/content/home";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("About", "/about");

export default function AboutPage() {
  return (
    <>
      <section className="py-24">
        <Container className="space-y-12">
          <SectionHeader as="h1" {...aboutPage.hero} />
          <Card className="shadow-none">
            <SectionHeader {...aboutPage.founderNote} />
          </Card>
          <FounderTeam founders={aboutPage.founders} />
          <div className="grid gap-4 md:grid-cols-2">
            {aboutPage.sections.map((section) => (
              <Card className="shadow-none" key={section.title}>
                <SectionHeader {...section} />
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <FinalCTA {...finalCta} />
    </>
  );
}
