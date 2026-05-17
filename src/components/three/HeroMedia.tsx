"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import dynamic from "next/dynamic";

const InteractiveMenu3D = dynamic(
  () => import("./InteractiveMenu3D").then((m) => m.InteractiveMenu3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-md bg-ink text-center sm:min-h-[360px]">
        <div className="space-y-3">
          <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-chalk/20 border-t-accent" />
          <p className="text-sm text-chalk/50">Loading 3D experience&hellip;</p>
        </div>
      </div>
    ),
  },
);

class HeroErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[HeroMedia] 3D render failed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-[360px] items-center justify-center bg-ink text-center">
          <p className="text-sm text-chalk/50">
            Interactive preview unavailable
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function HeroMedia() {
  return (
    <div className="relative aspect-[1.18] min-h-[300px] w-full overflow-hidden border border-chalk/10 bg-[#101310] shadow-[0_40px_100px_rgba(0,0,0,0.32)] sm:aspect-[1.35] md:min-h-0 lg:aspect-[1.45]">
      <HeroErrorBoundary>
        <InteractiveMenu3D />
      </HeroErrorBoundary>
    </div>
  );
}
