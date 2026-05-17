import type { SectionIntro } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = SectionIntro & {
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
};

export function SectionHeader({ eyebrow, title, body, align = "left", as = "h2" }: SectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div className={`space-y-5 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <HeadingTag className="tt-fluid-heading text-balance font-serif font-medium text-ink dark:text-chalk">
        {title}
      </HeadingTag>
      {body ? <p className="tt-fluid-body text-pretty text-graphite dark:text-chalk/75">{body}</p> : null}
    </div>
  );
}
