import type { SectionIntro } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = SectionIntro & {
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
};

export function SectionHeader({ eyebrow, title, body, align = "left", as = "h2" }: SectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div className={`space-y-4 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <HeadingTag className="text-balance break-words font-serif text-[1.75rem] leading-[1.12] text-ink sm:text-[2.25rem] sm:leading-[1.1] md:text-[2.75rem] md:leading-[1.08]">
        {title}
      </HeadingTag>
      {body ? <p className="text-pretty text-base leading-7 text-graphite">{body}</p> : null}
    </div>
  );
}
