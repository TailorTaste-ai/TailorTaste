import type { ReactNode } from "react";

/*
 * Flat 2D front face of the menu object from the 3D hero (InteractiveMenu3D.tsx).
 * The paper inset has a locked aspect ratio so the menu keeps the same physical
 * size across all menu states (lunch / dinner / event / filtered).
 */

const CASE_COLOR = "#20372b";
const BEZEL_X = "3.8%";
const BEZEL_Y = "2.35%";

/* Screen ratio sized to comfortably fit the largest state
   (dinner with vegan/vegetarian additions, or branded event with full menu). */
const SCREEN_ASPECT = "3.2 / 2.5";

export function MenuDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-[12px] border border-ink/20 shadow-[0_34px_90px_-46px_rgba(20,23,21,0.9),_0_12px_30px_-22px_rgba(20,23,21,0.65)] sm:rounded-[16px] lg:max-w-none"
      style={{
        backgroundColor: CASE_COLOR,
        backgroundImage:
          "linear-gradient(145deg, rgba(255,255,255,0.18), transparent 22%), linear-gradient(315deg, rgba(0,0,0,0.42), transparent 46%), radial-gradient(circle at 22% 10%, rgba(255,255,255,0.12), transparent 30%), url('/textures/leather-green-back.png')",
        backgroundSize: "cover, cover, cover, 300px 300px",
        backgroundPosition: "center",
        paddingInline: BEZEL_X,
        paddingBlock: BEZEL_Y,
      }}
    >
      <div
        className="pointer-events-none absolute rounded-[inherit] border border-dashed"
        style={{
          inset: "2.1%",
          borderColor: "rgba(198, 165, 105, 0.38)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.08)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute rounded-[8px] border"
        style={{
          inset: "1.75% 3%",
          borderColor: "rgba(8, 18, 13, 0.4)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
        aria-hidden
      />
      <div
        className="relative overflow-hidden rounded-[5px] border border-black/30 bg-[#efe8db] shadow-[0_26px_38px_-26px_rgba(0,0,0,0.95),_0_4px_8px_-7px_rgba(0,0,0,0.85),_inset_0_0_0_1px_rgba(255,255,255,0.55),_inset_0_0_34px_rgba(32,55,43,0.18)] sm:rounded-[7px]"
        style={{
          aspectRatio: SCREEN_ASPECT,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,250,241,0.48), inset 0 10px 20px rgba(255,255,255,0.24), inset 0 -16px 24px rgba(20,23,21,0.11)",
          }}
          aria-hidden
        />
        {children}
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[12px] sm:rounded-[16px]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 -22px 36px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}
