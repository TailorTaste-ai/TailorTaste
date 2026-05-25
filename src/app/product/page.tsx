import type { Metadata } from "next";
import Script from "next/script";
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
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata(
  "Product",
  "/product",
  "Explore the TailorTaste staff controlled menu object for live language switching, service states, menu updates, low light readability, and availability changes.",
  {
    keywords: ["digital menu object", "restaurant menu updates", "menu availability updates", "menu service states"],
  }
);

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: siteConfig.name,
  alternateName: `${siteConfig.name} physical menu system`,
  brand: {
    "@type": "Brand",
    name: siteConfig.name,
  },
  manufacturer: {
    "@id": `${siteConfig.url}/#organization`,
  },
  category: "Hospitality menu system",
  description: siteConfig.productDefinition,
  image: new URL(siteConfig.socialImage.url, siteConfig.url).toString(),
  url: new URL("/product", siteConfig.url).toString(),
};

export default function ProductPage() {
  return (
    <>
      <Script
        id="tailor-taste-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
                  <h3 className="font-serif text-lg text-ink dark:text-chalk">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite dark:text-chalk/75">{item.body}</p>
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
                  className="tt-micro-block border-l border-accent bg-paper/70 px-4 py-3 text-sm leading-6 text-graphite dark:bg-chalk/90 dark:text-ink/75"
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
                <div className="tt-micro-block border-l border-accent bg-paper/70 px-4 py-3 dark:bg-chalk/90" key={item.title}>
                  <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite dark:text-ink/75">{item.body}</p>
                </div>
              ))}
            </div>
          </Card>
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
