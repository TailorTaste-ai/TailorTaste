import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "standard" | "narrow" | "wide";
};

const widths = {
  narrow: "max-w-3xl",
  standard: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({ children, className = "", width = "standard" }: ContainerProps) {
  return <div className={`mx-auto w-full px-5 sm:px-8 ${widths[width]} ${className}`}>{children}</div>;
}
