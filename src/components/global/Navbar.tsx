"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { mainNavigation } from "@/content/navigation";
import { primaryCta } from "@/content/ctas";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  /* Close on Escape, and lock body scroll while open. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur transition-colors duration-300">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16 lg:h-20" width="wide">
        <Link
          className="flex min-w-0 items-center gap-2 font-serif text-lg text-ink sm:text-xl"
          href="/"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/logo.png"
            alt=""
            width={80}
            height={80}
            className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
            priority
            unoptimized
          />
          <span className="truncate">{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-6 text-sm text-graphite md:flex lg:gap-7"
          aria-label="Main navigation"
        >
          {mainNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                className={`transition hover:text-ink ${active ? "text-ink" : ""}`}
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Button {...primaryCta} className="hidden md:inline-flex" />

        {/* Mobile controls */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <path d="M5 5 L17 17" />
                <path d="M17 5 L5 17" />
              </>
            ) : (
              <>
                <path d="M3 7 H19" />
                <path d="M3 15 H19" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile sheet */}
      <div
        id={panelId}
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
          className={`fixed inset-x-0 bottom-0 top-14 z-30 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-200 sm:top-16 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <div
          className={`fixed inset-x-0 top-14 z-40 origin-top border-b border-ink/10 bg-paper shadow-[0_10px_30px_-20px_rgba(20,23,21,0.25)] transition-[transform,opacity] duration-200 sm:top-16 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <Container width="wide" className="py-4">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {mainNavigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`-mx-2 rounded-md px-2 py-3 font-serif text-xl transition ${
                      active ? "text-ink" : "text-graphite hover:text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-ink/10 pt-4">
                <Button
                  {...primaryCta}
                  className="flex w-full justify-center"
                />
              </div>
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
