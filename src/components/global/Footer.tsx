import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/primitives/Container";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink py-12 text-chalk">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between" width="wide">
        <div className="max-w-md space-y-3">
          <p className="font-serif text-2xl">{siteConfig.name}</p>
          <p className="text-sm leading-6 text-chalk/70">{siteConfig.productDefinition}</p>
        </div>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <nav className="flex flex-wrap gap-4 text-sm text-chalk/70" aria-label="Footer navigation">
            {footerNavigation.map((item) => (
              <Link className="transition hover:text-chalk" href={item.href} key={item.href}>
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
                height={54}
                className="opacity-70 transition hover:opacity-100"
              />
            </a>
            <a href="https://sph.ethz.ch/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/eth-sph-logo.png"
                alt="ETH Student Project House"
                width={112}
                height={28}
                className="invert opacity-70 transition hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
