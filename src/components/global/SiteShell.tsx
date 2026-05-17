import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-ink">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
