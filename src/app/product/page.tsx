import type { Metadata } from "next";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { primaryCta } from "@/content/ctas";
import { finalCta } from "@/content/home";
import { productPage } from "@/content/product";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata("Product", "/product");

export default function ProductPage() {
  return (
    <>
      <section className="py-24">
        <Container className="space-y-16">
          <SectionHeader as="h1" {...productPage.hero} />

          {/* What it is */}
          <div className="space-y-8">
            <SectionHeader {...productPage.objectModel} />
            <div className="grid gap-5 sm:grid-cols-3">
              {productPage.objectModel.items.map((item) => (
                <div className="group rounded-[12px] border border-ink/8 bg-chalk p-6 transition hover:border-ink/15 hover:shadow-soft" key={item.title}>
                  <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-8">
            <SectionHeader {...productPage.capabilities} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {productPage.capabilities.items.map((item, i) => (
                <div className="flex gap-4 rounded-[12px] border border-ink/8 bg-chalk p-6 transition hover:border-ink/15 hover:shadow-soft" key={item.title}>
                  <span className="mt-0.5 text-xs font-semibold text-accent/60">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-graphite">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-chalk py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Card className="space-y-8 shadow-none">
            <SectionHeader {...productPage.serviceFit} />
            <ol className="space-y-3">
              {productPage.serviceFit.steps.map((step, index) => (
                <li className="rounded-[8px] border border-ink/10 bg-paper px-4 py-3 text-sm leading-6 text-graphite" key={step}>
                  <span className="mr-2 font-semibold text-ink">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Card>
          <Card className="space-y-8 shadow-none">
            <SectionHeader {...productPage.deployment} />
            <div className="space-y-3">
              {productPage.deployment.items.map((item) => (
                <div className="rounded-[8px] border border-ink/10 bg-paper px-4 py-3" key={item.title}>
                  <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{item.body}</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      <section className="py-24">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="MVP boundaries"
            title="Clear exclusions protect product credibility."
            body="These limits keep the first version focused on premium menu delivery instead of expanding into unrelated product categories."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {productPage.boundaries.map((item) => (
              <Card className="shadow-none" key={item.title}>
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
              </Card>
            ))}
          </div>
          <div>
            <Button {...primaryCta} />
          </div>
        </Container>
      </section>

      <section className="bg-cypress py-24 text-chalk">
        <Container className="space-y-10">
          <div className="[&_h2]:text-chalk [&_p]:text-chalk/75">
            <SectionHeader
              eyebrow="Pilot invitation"
              title="Discuss a pilot with focused operators."
              body="TailorTaste is currently looking for high-quality conversations with premium venues and service-led teams."
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
