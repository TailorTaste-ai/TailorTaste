import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/primitives/Container";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-ink/10 bg-ink py-10 text-chalk sm:py-12"
      style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="absolute inset-0 opacity-35" style={{ background: "repeating-linear-gradient(90deg, rgba(255,250,241,0.08) 0 1px, transparent 1px 86px)" }} aria-hidden />
      <Container
        className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12"
        width="wide"
      >
        <div className="max-w-md space-y-3">
          <p className="font-serif text-xl sm:text-2xl">{siteConfig.name}</p>
          <p className="text-sm leading-6 text-chalk/70">{siteConfig.productDefinition}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-chalk/45">
            Official website: {siteConfig.officialDomain} · {siteConfig.location.locality}, {siteConfig.location.countryName}
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <nav
            className="-mx-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chalk/70"
            aria-label="Footer navigation"
          >
            {footerNavigation.map((item) => (
              <Link
                className="inline-flex min-h-10 items-center rounded-md px-2 transition hover:text-chalk"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <a href="https://www.entrepreneur-club.org/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/eth-ec-logo-transparent.png"
                alt="ETH Entrepreneur Club"
                width={270}
                height={61}
                className="h-auto opacity-70 transition hover:opacity-100"
              />
            </a>
            <a href="https://sph.ethz.ch/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/eth-sph-logo.png"
                alt="ETH Student Project House"
                width={110}
                height={32}
                className="h-auto invert opacity-70 transition hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
