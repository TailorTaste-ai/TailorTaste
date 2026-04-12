import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article className={`rounded-[8px] border border-ink/10 bg-chalk p-6 shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:p-7 ${className}`}>
      {children}
    </article>
  );
}
