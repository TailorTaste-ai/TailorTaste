import Link from "next/link";
import { footerNavigation } from "@/content/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/primitives/Container";

export function Footer() {
  return (
    <footer
      className="border-t border-ink/10 bg-ink py-10 text-chalk sm:py-12"
      style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
    >
      <Container
        className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12"
        width="wide"
      >
        <div className="max-w-md space-y-3">
          <p className="font-serif text-xl sm:text-2xl">{siteConfig.name}</p>
          <p className="text-sm leading-6 text-chalk/70">{siteConfig.productDefinition}</p>
        </div>
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
      </Container>
    </footer>
  );
}
