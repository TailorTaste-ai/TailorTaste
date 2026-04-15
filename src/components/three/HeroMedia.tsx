"use client";

import dynamic from "next/dynamic";

const InteractiveMenu3D = dynamic(
  () => import("./InteractiveMenu3D").then((m) => m.InteractiveMenu3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[360px] items-center justify-center rounded-md bg-ink text-center">
        <div className="space-y-3">
          <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-chalk/20 border-t-accent" />
          <p className="text-sm text-chalk/50">Loading 3D experience&hellip;</p>
        </div>
      </div>
    ),
  },
);

export function HeroMedia() {
  return (
    <div className="relative h-full min-h-[400px] w-full lg:min-h-[480px]">
      <InteractiveMenu3D />
    </div>
  );
}
