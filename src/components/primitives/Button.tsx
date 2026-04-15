import Link from "next/link";
import type { CTA } from "@/lib/site";

const variantClasses: Record<CTA["variant"], string> = {
  primary: "bg-ink text-chalk hover:bg-graphite",
  secondary: "border border-ink/20 bg-chalk text-ink hover:border-ink/40",
  inverted: "bg-chalk text-ink hover:bg-paper",
  text: "min-h-0 px-0 py-0 text-ink underline underline-offset-4 hover:text-graphite",
};

type ButtonProps = CTA & {
  className?: string;
};

export function Button({ label, href, variant, className = "" }: ButtonProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-[8px] px-5 py-3 text-sm font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${variantClasses[variant]} ${className}`}
      href={href}
    >
      {label}
    </Link>
  );
}

export function ButtonCluster({ ctas }: { ctas: CTA[] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {ctas.map((cta) => (
        <Button key={`${cta.label}-${cta.href}`} {...cta} />
      ))}
    </div>
  );
}
