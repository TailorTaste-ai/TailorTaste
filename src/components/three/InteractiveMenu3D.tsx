"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

/* ─────────────────────────────────────────────
   Coordinate convention (right-hand):
     X → right     Y → up     Z → out of screen
   ───────────────────────────────────────────── */

/* ─── Geometry ─── */
const W = 3.2;
const H = 2.2;
const D = 0.06;
const R = 0.04;

/* Screen inset from the case edge */
const BEZEL = 0.12;
const SW = W - BEZEL * 2;
const SH = H - BEZEL * 2;

/* ─── Palette ─── */
const CASE_COLOR = "#2f4633";
const SCREEN_BG = "#F7F2E8";
const INK = "#12100d";
const MUTED = "#3b352f";
const SERIF = "Georgia, 'Times New Roman', serif";

/* ─── Menu data ─── */
type Dish = { name: string; desc: string; price: string };

const starters: Dish[] = [
  { name: "Gillardeau Oysters", desc: "champagne mignonette", price: "28" },
  { name: "Bluefin Tuna Tartare", desc: "ossetra caviar, citrus oil", price: "32" },
  { name: "Langoustine Raviolo", desc: "shellfish velouté", price: "26" },
  { name: "White Asparagus", desc: "hazelnut, mimolette, herbs", price: "24" },
  { name: "Foie Gras Torchon", desc: "quince, brioche, sea salt", price: "29" },
  { name: "Hamachi Crudo", desc: "yuzu, finger lime, shiso", price: "27" },
];

const chefRecs: Dish[] = [
  { name: "Chef's Tasting Menu", desc: "eight-course seasonal journey", price: "145" },
  { name: "Sommelier Pairing", desc: "rare and cellar selections", price: "95" },
  { name: "Signature Reserve", desc: "prestige wine supplement", price: "65" },
];

const mains: Dish[] = [
  { name: "A5 Wagyu Rossini", desc: "black truffle, madeira jus", price: "96" },
  { name: "Dover Sole Meunière", desc: "brown butter, Amalfi lemon", price: "72" },
  { name: "Bresse Chicken Suprême", desc: "morels, vin jaune cream", price: "58" },
  { name: "Atlantic Turbot", desc: "champagne sauce, caviar", price: "76" },
  { name: "Lobster Thermidor", desc: "sauce américaine, fines herbes", price: "82" },
  { name: "Rack of Lamb", desc: "herb crust, ratatouille, jus", price: "64" },
];

const desserts: Dish[] = [
  { name: "Valrhona Soufflé", desc: "single-origin chocolate", price: "24" },
  { name: "Citrus Mille-Feuille", desc: "bergamot cream", price: "21" },
  { name: "Affiné Cheese Cart", desc: "sélection du maître", price: "28" },
  { name: "Vanilla Crémeux", desc: "pear, saffron, almond", price: "22" },
  { name: "Baba au Rhum", desc: "Madagascar vanilla chantilly", price: "23" },
  { name: "Tarte Tatin", desc: "calvados, crème fraîche", price: "20" },
];

/* ─── Menu canvas texture ─── */
const GOLD = "#9a8e7a";

function createMenuTexture(logoImg?: HTMLImageElement): THREE.CanvasTexture {
  const PX = 8192;
  const PY = 5462;
  const canvas = document.createElement("canvas");
  canvas.width = PX;
  canvas.height = PY;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = SCREEN_BG;
  ctx.fillRect(0, 0, PX, PY);

  const PAD = 180;

  /* double-rule outer border */
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 5;
  ctx.strokeRect(PAD, PAD, PX - PAD * 2, PY - PAD * 2);
  ctx.strokeRect(PAD + 24, PAD + 24, PX - (PAD + 24) * 2, PY - (PAD + 24) * 2);

  /* corner ornaments */
  const ornSize = 60;
  const ornPad = PAD + 48;
  for (const [ox, oy] of [
    [ornPad, ornPad],
    [PX - ornPad, ornPad],
    [ornPad, PY - ornPad],
    [PX - ornPad, PY - ornPad],
  ] as [number, number][]) {
    ctx.fillStyle = GOLD;
    ctx.beginPath();
    ctx.arc(ox, oy, ornSize / 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ox, oy, ornSize / 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  /* column dividers */
  const d1 = Math.round(PX * 0.333);
  const d2 = Math.round(PX * 0.667);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(d1, PAD + 60);
  ctx.lineTo(d1, PY - PAD - 60);
  ctx.moveTo(d2, PAD + 60);
  ctx.lineTo(d2, PY - PAD - 60);
  ctx.stroke();

  const c1 = Math.round(d1 / 2);
  const c2 = Math.round((d1 + d2) / 2);
  const c3 = Math.round((d2 + PX) / 2);

  /* ── Helpers ── */

  function flourish(x: number, y: number, w = 280) {
    const hw = w / 2;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - hw, y);
    ctx.lineTo(x - 24, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 24, y);
    ctx.lineTo(x + hw, y);
    ctx.stroke();

    ctx.fillStyle = GOLD;
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x, y + 8);
    ctx.lineTo(x - 10, y);
    ctx.closePath();
    ctx.fill();
  }

  function heading(text: string, x: number, y: number): number {
    ctx.fillStyle = INK;
    ctx.font = `small-caps bold 184px ${SERIF}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(text, x, y);

    const lineY = y + 206;
    flourish(x, lineY, 440);
    return lineY + 58;
  }

  function items(list: Dish[], x: number, y0: number) {
    let y = y0;
    for (let i = 0; i < list.length; i++) {
      const dish = list[i];
      ctx.fillStyle = INK;
      ctx.font = `bold 124px ${SERIF}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(dish.name, x, y);
      y += 146;

      ctx.fillStyle = MUTED;
      ctx.font = `italic 78px ${SERIF}`;
      ctx.fillText(dish.desc, x, y);
      y += 98;

      ctx.fillStyle = INK;
      ctx.font = `92px ${SERIF}`;
      ctx.fillText(dish.price, x, y);
      y += 132;

      if (i < list.length - 1) {
        ctx.fillStyle = GOLD;
        ctx.font = `44px ${SERIF}`;
        ctx.textAlign = "center";
        ctx.fillText("·   ·   ·", x, y);
        y += 54;
      }
    }
    return y;
  }

  /* ── Col 1 — Starters ── */
  const y1 = heading("STARTERS", c1, 300);
  items(starters, c1, y1);

  /* ── Col 2 — Chef's Recommendations (boxed) + Main Courses ── */
  const colW = d2 - d1;
  const boxW = colW - 200;
  const boxX = c2 - boxW / 2;
  const boxY = 260;

  /* double-rule box */
  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.strokeRect(boxX, boxY, boxW, 0);
  ctx.strokeRect(boxX + 16, boxY + 16, boxW - 32, 0);

  /* box heading */
  ctx.fillStyle = INK;
  ctx.font = `small-caps bold 148px ${SERIF}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Chef's", c2, boxY + 56);
  ctx.fillText("Recommendations", c2, boxY + 220);

  flourish(c2, boxY + 400, 380);

  /* chef items */
  let cy = boxY + 456;
  for (let i = 0; i < chefRecs.length; i++) {
    const dish = chefRecs[i];
    ctx.fillStyle = INK;
    ctx.font = `bold 108px ${SERIF}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(dish.name, c2, cy);
    cy += 128;
    ctx.fillStyle = MUTED;
    ctx.font = `italic 70px ${SERIF}`;
    ctx.fillText(dish.desc, c2, cy);
    cy += 88;
    ctx.fillStyle = INK;
    ctx.font = `86px ${SERIF}`;
    ctx.fillText(dish.price, c2, cy);
    cy += 116;

    if (i < chefRecs.length - 1) {
      ctx.fillStyle = GOLD;
      ctx.font = `40px ${SERIF}`;
      ctx.fillText("·   ·   ·", c2, cy);
      cy += 48;
    }
  }

  /* close box at actual bottom */
  const boxBottom = cy + 40;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.strokeRect(boxX, boxY, boxW, boxBottom - boxY);
  ctx.strokeRect(boxX + 16, boxY + 16, boxW - 32, boxBottom - boxY - 32);

  /* ornamental separator before mains */
  const mainGap = boxBottom + 80;
  flourish(c2, mainGap, 500);

  const mainY = heading("MAIN COURSES", c2, mainGap + 48);
  items(mains, c2, mainY);

  /* ── Col 3 — Desserts ── */
  const y3 = heading("DESSERTS", c3, 300);
  items(desserts, c3, y3);

  /* ── Bottom-right logo ── */
  if (logoImg) {
    const logoSize = 540;
    const lx = PX - PAD - logoSize - 30;
    const ly = PY - PAD - logoSize - 30;

    const hrc = document.createElement("canvas");
    hrc.width = logoSize;
    hrc.height = logoSize;
    const hctx = hrc.getContext("2d")!;
    hctx.imageSmoothingEnabled = true;
    hctx.imageSmoothingQuality = "high";
    hctx.drawImage(logoImg, 0, 0, logoSize, logoSize);

    ctx.globalAlpha = 0.7;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(hrc, lx, ly, logoSize, logoSize);
    ctx.globalAlpha = 1;
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

function createTransparentLogoTexture(image: CanvasImageSource) {
  const width = 1024;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;

    if (brightness < 18) {
      data[i + 3] = 0;
    } else if (brightness < 40) {
      data[i + 3] = Math.max(0, Math.min(255, (brightness - 18) * 12));
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/* ─── 3D Tablet ─── */
function MenuTablet() {
  const group = useRef<Group>(null);
  const siteLogoTex = useLoader(THREE.TextureLoader, "/logo.png");
  const menuTex = useMemo(() => createMenuTexture(siteLogoTex.image as HTMLImageElement), [siteLogoTex.image]);
  const logoTex = useLoader(THREE.TextureLoader, "/textures/tt-logo-gold.png");
  const transparentLogoTex = useMemo(() => createTransparentLogoTexture(logoTex.image), [logoTex.image]);
  const backLeatherTex = useLoader(THREE.TextureLoader, "/textures/leather-green-back.png");
  backLeatherTex.colorSpace = THREE.SRGBColorSpace;
  backLeatherTex.anisotropy = 16;

  /* Gentle floating — no Z-rotation drift */
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.4) * 0.03;
  });

  /*
   * Tilt in the YZ plane only:
   *   rotation around X axis → negative value tilts the top edge backward
   *   No rotation around Z (no in-plane tilt)
   */
  return (
    <group ref={group} rotation={[-0.12, 0, 0]} scale={0.8}>
      {/* ── Case body — solid color for thin edges/corners ── */}
      <RoundedBox args={[W, H, D]} radius={R} smoothness={4}>
        <meshPhysicalMaterial color="#294233" roughness={0.92} metalness={0.01} clearcoat={0.04} clearcoatRoughness={0.96} envMapIntensity={0.05} />
      </RoundedBox>

      {/* ── Front leather (full face, sits on top of case) ── */}
      <mesh position={[0, 0, D / 2 + 0.004]} renderOrder={1}>
        <planeGeometry args={[W - 0.01, H - 0.01]} />
        <meshBasicMaterial
          map={backLeatherTex}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* ── Screen (on top of front leather) ── */}
      <mesh position={[0, 0, D / 2 + 0.008]} renderOrder={2}>
        <planeGeometry args={[SW, SH]} />
        <meshBasicMaterial
          map={menuTex}
          toneMapped={false}
          dithering
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>

      {/* ── Back leather (full face) ── */}
      <mesh position={[0, 0, -(D / 2 + 0.004)]} rotation={[0, Math.PI, 0]} renderOrder={1}>
        <planeGeometry args={[W - 0.01, H - 0.01]} />
        <meshBasicMaterial
          map={backLeatherTex}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* ── Back logo (on top of back leather) ── */}
      <mesh position={[0, 0, -(D / 2 + 0.008)]} rotation={[0, Math.PI, 0]} renderOrder={2}>
        <planeGeometry args={[W * 0.38, H * 0.38]} />
        <meshBasicMaterial
          map={transparentLogoTex}
          transparent
          alphaTest={0.02}
          toneMapped={false}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>
    </group>
  );
}

/* ─── Polar angle — lock vertical to match camera ─── */
const LOCKED_POLAR = Math.acos(0.6 / Math.sqrt(0.36 + 20.25));

/* ─── Exported scene ─── */
export function InteractiveMenu3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 4.5], fov: 32 }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
      dpr={[1, 2]}
      gl={{ antialias: true, logarithmicDepthBuffer: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 3, 2]} intensity={0.4} color="#ffeedd" />
      <pointLight position={[0, -2, 4]} intensity={0.15} color="#fff5ee" />

      <Suspense fallback={null}>
        <MenuTablet />
        <Environment preset="studio" />
      </Suspense>

      <ContactShadows position={[0, -1.25, 0]} opacity={0.3} scale={6} blur={2.5} />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.25}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={LOCKED_POLAR}
        maxPolarAngle={LOCKED_POLAR}
        dampingFactor={0.06}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}
