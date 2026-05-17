import type { Metadata } from "next";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { CapabilityDemo } from "@/components/product/CapabilityDemo";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { primaryCta } from "@/content/ctas";
import { finalCta } from "@/content/home";
import { productPage } from "@/content/product";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("Product", "/product");

export default function ProductPage() {
  return (
    <>
      <section className="section-y">
        <Container className="space-y-12 sm:space-y-16">
          <SectionHeader as="h1" {...productPage.hero} />

          {/* What it is */}
          <div className="space-y-6 sm:space-y-8">
            <SectionHeader {...productPage.objectModel} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {productPage.objectModel.items.map((item) => (
                <div
                  className="group tt-luxury-card rounded-[8px] p-5 transition hover:border-ink/15 sm:p-6"
                  key={item.title}
                >
                  <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities — staff-controlled flexibility live demo */}
          <div className="space-y-6 sm:space-y-8">
            <SectionHeader {...productPage.capabilities} />
            <CapabilityDemo />
          </div>
        </Container>
      </section>

      <section className="tt-section-panel section-y">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Card className="space-y-6 shadow-none sm:space-y-8">
            <SectionHeader {...productPage.serviceFit} />
            <ol className="space-y-3">
              {productPage.serviceFit.steps.map((step, index) => (
                <li
                  className="tt-micro-block border-l border-accent bg-paper/70 px-4 py-3 text-sm leading-6 text-graphite"
                  key={step}
                >
                  <span className="mr-2 font-semibold text-ink">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Card>
          <Card className="space-y-6 shadow-none sm:space-y-8">
            <SectionHeader {...productPage.deployment} />
            <div className="space-y-3">
              {productPage.deployment.items.map((item) => (
                <div className="tt-micro-block border-l border-accent bg-paper/70 px-4 py-3" key={item.title}>
                  <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      <section className="section-y">
        <Container className="space-y-8 sm:space-y-10">
          <SectionHeader
            eyebrow="MVP boundaries"
            title="Excluded from MVP so the first test stays clean."
            body="These choices keep the pilot focused on the menu object, staff controls, and handout workflow."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productPage.boundaries.map((item) => (
              <Card className="shadow-none" key={item.title}>
                <h2 className="font-serif text-xl sm:text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
              </Card>
            ))}
          </div>
          <div>
            <Button {...primaryCta} />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-cypress section-y text-chalk">
        <div className="absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(90deg, rgba(255,250,241,0.12) 0 1px, transparent 1px 84px)" }} aria-hidden />
        <Container className="relative space-y-8 sm:space-y-10">
          <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
            <SectionHeader
              eyebrow="Pilot invitation"
              title="Test it where menu changes already create friction."
              body="Useful pilots are in venues with language needs, service state changes, event menus, or frequent content updates."
            />
          </div>
          <div>
            <Button label={primaryCta.label} href={primaryCta.href} variant="inverted" />
          </div>
        </Container>
      </section>

      <FinalCTA {...finalCta} />
    </>
  );
}
