import type { ReactNode } from "react";

/*
 * Flat 2D front face of the menu object from the 3D hero (InteractiveMenu3D.tsx).
 * The paper inset has a locked aspect ratio so the menu keeps the same physical
 * size across all menu states (lunch / dinner / event / filtered).
 */

const CASE_COLOR = "#061f13";
const CASE_EDGE_COLOR = "#020c08";
const BEZEL = "3.1%";
const STITCH_GAP = "8px";

/* Matches the 3D hero's physical paper window: W/H minus the leather bezel. */
const SCREEN_ASPECT = "2.76 / 1.76";

export function MenuDemoFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[640px] overflow-hidden rounded-[10px] border shadow-[0_36px_92px_-46px_rgba(20,23,21,0.92),_0_14px_34px_-24px_rgba(20,23,21,0.72)] sm:rounded-[12px] lg:max-w-none"
      style={{
        backgroundColor: CASE_COLOR,
        borderColor: CASE_EDGE_COLOR,
        backgroundImage:
          "linear-gradient(rgba(2,12,8,0.42), rgba(2,12,8,0.42)), linear-gradient(90deg, rgba(0,0,0,0.58), transparent 8%, transparent 92%, rgba(0,0,0,0.58)), linear-gradient(180deg, rgba(255,255,255,0.12), transparent 14%, transparent 86%, rgba(0,0,0,0.52)), radial-gradient(circle at 22% 10%, rgba(40,96,62,0.22), transparent 34%), url('/textures/leather-green-back.png')",
        backgroundSize: "cover, cover, cover, cover, 300px 300px",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply, multiply, screen, screen, normal",
        padding: BEZEL,
      }}
    >
      <div
        className="relative"
        style={{
          aspectRatio: SCREEN_ASPECT,
        }}
      >
        <div
          className="pointer-events-none absolute rounded-[7px] border border-dashed sm:rounded-[8px]"
          style={{
            inset: `-${STITCH_GAP}`,
            borderColor: "rgba(188, 150, 87, 0.42)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.07), 0 -1px 0 rgba(0,0,0,0.18)",
          }}
          aria-hidden
        />
        <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-[#020604] p-[0.45%] shadow-[0_20px_30px_-22px_rgba(0,0,0,0.95),_0_2px_6px_-5px_rgba(0,0,0,0.85),_inset_0_0_0_1px_rgba(0,0,0,0.86),_inset_0_0_0_2px_rgba(1,7,4,0.62)] sm:rounded-[4px]">
          <div className="relative h-full w-full overflow-hidden border border-black/25 bg-[#efe8db] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.58),_inset_0_0_28px_rgba(32,55,43,0.13)]">
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,250,241,0.48), inset 0 8px 16px rgba(255,255,255,0.22), inset 0 -12px 20px rgba(20,23,21,0.09)",
              }}
              aria-hidden
            />
            {children}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[10px] sm:rounded-[12px]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 6px rgba(2,9,5,0.62), inset 0 -20px 32px rgba(0,0,0,0.34)",
        }}
      />
    </div>
  );
}
