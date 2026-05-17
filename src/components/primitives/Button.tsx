import Link from "next/link";
import type { CTA } from "@/lib/site";

const variantClasses: Record<CTA["variant"], string> = {
  primary: "border border-accent bg-accent text-chalk shadow-[0_18px_35px_rgba(20,23,21,0.18)] hover:-translate-y-0.5 hover:bg-cypress",
  secondary: "border border-ink/20 bg-chalk/75 text-ink hover:-translate-y-0.5 hover:border-accent/60 hover:bg-chalk",
  inverted: "border border-chalk bg-chalk text-ink hover:-translate-y-0.5 hover:bg-paper",
  text: "min-h-0 px-0 py-0 text-ink underline underline-offset-4 hover:text-accent",
};

type ButtonProps = CTA & {
  className?: string;
};

export function Button({ label, href, variant, className = "" }: ButtonProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold leading-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${variantClasses[variant]} ${className}`}
      href={href}
    >
      {label}
    </Link>
  );
}

export function ButtonCluster({ ctas }: { ctas: CTA[] }) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {ctas.map((cta) => (
        <Button key={`${cta.label}-${cta.href}`} {...cta} />
      ))}
    </div>
  );
}
