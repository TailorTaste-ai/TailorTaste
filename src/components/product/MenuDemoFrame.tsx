import type { ReactNode } from "react";

/*
 * Flat 2D front-face of the tablet from the 3D hero (InteractiveMenu3D.tsx).
 * The screen has a locked aspect ratio so the tablet keeps the same physical
 * size across all menu states (lunch / dinner / event / filtered).
 */

const CASE_COLOR = "#294233";
const BEZEL_X = "3.75%"; /* (0.12 / 3.2) * 100 */
const BEZEL_Y = "5.45%"; /* (0.12 / 2.2) * 100 */

/* Screen ratio sized to comfortably fit the largest state
   (dinner with vegan/vegetarian additions, or branded event with full menu). */
const SCREEN_ASPECT = "3.2 / 2.85";

export function MenuDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[8px] shadow-[0_8px_24px_-20px_rgba(20,23,21,0.35)] sm:rounded-[12px] sm:shadow-[0_1px_0_rgba(255,255,255,0.04),_0_12px_40px_-28px_rgba(20,23,21,0.4)] lg:max-w-none"
      style={{
        backgroundColor: CASE_COLOR,
        backgroundImage: "url('/textures/leather-green-back.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingInline: BEZEL_X,
        paddingBlock: BEZEL_Y,
      }}
    >
      <div
        className="relative overflow-hidden rounded-[3px] sm:rounded-[4px]"
        style={{
          aspectRatio: SCREEN_ASPECT,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2)",
        }}
      >
        {children}
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[8px] sm:rounded-[12px]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}
