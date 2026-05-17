export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="tt-rail-label inline-flex items-center gap-3 text-accent">
      <span className="h-px w-7 bg-current" aria-hidden />
      {children}
    </p>
  );
}
