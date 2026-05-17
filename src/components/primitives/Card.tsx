import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article className={`tt-luxury-card rounded-[8px] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${className}`}>
      {children}
    </article>
  );
}
