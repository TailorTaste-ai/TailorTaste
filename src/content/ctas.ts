import type { CTA } from "@/lib/site";

export const primaryCta: CTA = {
  label: "Discuss a pilot",
  href: "/contact",
  variant: "primary",
};

export const secondaryCta: CTA = {
  label: "Read the vision",
  href: "/vision",
  variant: "secondary",
};

export const partnershipCta: CTA = {
  label: "Explore partnership",
  href: "/contact",
  variant: "secondary",
};

export const finalCtas: CTA[] = [
  {
    label: "Join the first wave",
    href: "/contact",
    variant: "primary",
  },
  {
    label: "Talk to founders",
    href: "/contact",
    variant: "secondary",
  },
];
