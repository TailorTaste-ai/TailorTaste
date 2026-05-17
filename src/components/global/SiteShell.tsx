import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-ink dark:text-chalk">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
