import Link from "next/link";
import { mainNavigation } from "@/content/navigation";
import { primaryCta } from "@/content/ctas";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur transition-colors duration-300">
      <Container className="flex h-20 items-center justify-between gap-6" width="wide">
        <Link className="font-serif text-xl text-ink" href="/">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-graphite md:flex" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <Link className="transition hover:text-ink" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button {...primaryCta} className="hidden md:inline-flex" />
        <Button {...primaryCta} className="md:hidden" />
      </Container>
    </header>
  );
}
