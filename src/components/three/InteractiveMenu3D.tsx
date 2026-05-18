"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
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
const D = 0.085;
const R = 0.078;

/* Screen inset from the case edge */
const BEZEL = 0.22;
const SW = W - BEZEL * 2;
const SH = H - BEZEL * 2;
const SCREEN_EDGE_OVERLAP = 0.018;
const LEATHER_FACE_INSET = 0.006;
const LEATHER_FACE_W = W - LEATHER_FACE_INSET;
const LEATHER_FACE_H = H - LEATHER_FACE_INSET;

/* ─── Palette ─── */
const SCREEN_BG = "#F0E5D4";
const INK = "#12100d";
const MUTED = "#3b352f";
const CASE_EDGE_COLOR = "#04170d";
const LEATHER_STITCH_COLOR = "rgba(214, 190, 146, 0.22)";
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
  const TEXTURE_PX = 4096;
  const TEXTURE_PY = 2731;
  const PX = 8192;
  const PY = 5462;
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_PX;
  canvas.height = TEXTURE_PY;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(TEXTURE_PX / PX, TEXTURE_PY / PY);

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

function drawFullBleedLeather(
  ctx: CanvasRenderingContext2D,
  leatherImage: CanvasImageSource,
  width: number,
  height: number,
) {
  const leatherW = 1000;
  const leatherH = 800;
  const scale = Math.max(width / leatherW, height / leatherH);
  const drawW = leatherW * scale;
  const drawH = leatherH * scale;
  ctx.drawImage(leatherImage, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);
}

function seededNoise(seed: number) {
  return Math.sin(seed * 12.9898) * 43758.5453 % 1 + (Math.sin(seed * 4.1414) % 1);
}

function normalizedNoise(seed: number) {
  return Math.abs(seededNoise(seed)) % 1;
}

function drawFineLeatherNoise(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const noiseWidth = 512;
  const noiseHeight = 352;
  const noise = document.createElement("canvas");
  noise.width = noiseWidth;
  noise.height = noiseHeight;
  const noiseCtx = noise.getContext("2d")!;
  const imageData = noiseCtx.createImageData(noiseWidth, noiseHeight);
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const n = normalizedNoise(i * 0.33);
    const value = Math.round(52 + n * 70);
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = Math.round(34 + n * 42);
  }

  noiseCtx.putImageData(imageData, 0, 0);
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.globalCompositeOperation = "overlay";
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(noise, 0, 0, width, height);
  ctx.restore();
}

function drawPebbledLeatherGrain(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < 3600; i++) {
    const x = normalizedNoise(i * 9.71 + 11) * width;
    const y = normalizedNoise(i * 7.37 + 29) * height;
    const rx = 3 + normalizedNoise(i * 5.41 + 3) * 11;
    const ry = 1.1 + normalizedNoise(i * 8.13 + 17) * 4.7;
    const angle = normalizedNoise(i * 2.73 + 41) * Math.PI;
    const alpha = 0.055 + normalizedNoise(i * 3.31 + 5) * 0.08;

    ctx.globalCompositeOperation = i % 2 === 0 ? "screen" : "multiply";
    ctx.strokeStyle =
      i % 2 === 0
        ? `rgba(151, 178, 143, ${alpha})`
        : `rgba(3, 13, 8, ${alpha * 1.15})`;
    ctx.lineWidth = 0.85 + normalizedNoise(i * 1.91 + 23) * 1.35;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, angle, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let i = 0; i < 1900; i++) {
    const x = normalizedNoise(i * 6.19 + 101) * width;
    const y = normalizedNoise(i * 4.47 + 77) * height;
    const length = 10 + normalizedNoise(i * 2.21 + 9) * 34;
    const angle = -0.65 + normalizedNoise(i * 8.51 + 13) * 1.3;
    const alpha = 0.04 + normalizedNoise(i * 5.77 + 19) * 0.09;

    ctx.globalCompositeOperation = i % 3 === 0 ? "screen" : "multiply";
    ctx.strokeStyle =
      i % 3 === 0
        ? `rgba(171, 190, 156, ${alpha})`
        : `rgba(4, 14, 9, ${alpha})`;
    ctx.lineWidth = 0.8 + normalizedNoise(i * 2.89 + 31) * 1.1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  ctx.restore();
}

function drawStitchedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash([16, 12]);
  ctx.strokeStyle = LEATHER_STITCH_COLOR;
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.stroke();

  ctx.restore();
}

function drawLeatherBevel(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();

  const outer = ctx.createLinearGradient(0, 0, width, height);
  outer.addColorStop(0, "rgba(255, 255, 255, 0.12)");
  outer.addColorStop(0.32, "rgba(38, 77, 48, 0.12)");
  outer.addColorStop(0.75, "rgba(4, 21, 12, 0.2)");
  outer.addColorStop(1, "rgba(0, 7, 3, 0.5)");
  ctx.globalCompositeOperation = "soft-light";
  ctx.fillStyle = outer;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

function drawPhotoMatchedLeather(
  ctx: CanvasRenderingContext2D,
  leatherImage: CanvasImageSource,
  width: number,
  height: number,
) {
  drawFullBleedLeather(ctx, leatherImage, width, height);

  ctx.save();
  ctx.globalAlpha = 0.94;
  ctx.globalCompositeOperation = "color";
  ctx.fillStyle = "#061f13";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.035;
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "#153b27";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.39;
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "#010604";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.9;
  drawFineLeatherNoise(ctx, width, height);
  drawPebbledLeatherGrain(ctx, width, height);
  ctx.restore();

  drawLeatherBevel(ctx, width, height);
  drawStitchedRect(ctx, 28, 30, width - 56, height - 60, 62);
  drawStitchedRect(ctx, 86, 86, width - 172, height - 172, 48);
}

function createLeatherFaceTexture(leatherImage: CanvasImageSource) {
  const width = 2048;
  const height = 1408;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  drawPhotoMatchedLeather(ctx, leatherImage, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

function createBackLeatherTexture(
  leatherImage: CanvasImageSource,
  logoImage: CanvasImageSource,
) {
  const width = 2048;
  const height = 1408;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  drawPhotoMatchedLeather(ctx, leatherImage, width, height);

  const logoSize = 360;
  const logoX = (width - logoSize) / 2;
  const logoY = (height - logoSize) / 2;
  const logoCanvas = document.createElement("canvas");
  logoCanvas.width = logoSize;
  logoCanvas.height = logoSize;
  const logoCtx = logoCanvas.getContext("2d")!;

  logoCtx.imageSmoothingEnabled = true;
  logoCtx.imageSmoothingQuality = "high";
  logoCtx.drawImage(logoImage, 0, 0, logoSize, logoSize);

  const imageData = logoCtx.getImageData(0, 0, logoSize, logoSize);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const brightness = (r + g + b) / 3;
    const warmGold = r > 95 && g > 65 && r > b * 1.35 && g > b * 1.12;
    const paleHighlight = brightness > 150 && r > b * 1.12 && g > b * 1.05;

    if (a < 8 || (!warmGold && !paleHighlight)) {
      data[i + 3] = 0;
      continue;
    }

    data[i + 3] = Math.min(a, 230);
  }

  logoCtx.putImageData(imageData, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(logoCanvas, logoX, logoY);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

function createRoundedFaceGeometry(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geometry = new THREE.ShapeGeometry(shape, 16);
  const positions = geometry.attributes.position;
  const uvs: number[] = [];

  for (let i = 0; i < positions.count; i++) {
    uvs.push(
      (positions.getX(i) + width / 2) / width,
      (positions.getY(i) + height / 2) / height,
    );
  }

  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  return geometry;
}

/* ─── 3D Tablet ─── */
function MenuTablet() {
  const group = useRef<Group>(null);
  const leatherFaceGeometry = useMemo(
    () => createRoundedFaceGeometry(LEATHER_FACE_W, LEATHER_FACE_H, R * 0.82),
    [],
  );
  const siteLogoTex = useLoader(THREE.TextureLoader, "/logo.png");
  const menuTex = useMemo(() => createMenuTexture(siteLogoTex.image as HTMLImageElement), [siteLogoTex.image]);
  const logoTex = useLoader(THREE.TextureLoader, "/textures/tt-logo-gold.png");
  const backLeatherTex = useLoader(THREE.TextureLoader, "/textures/leather-green-back.png");
  const frontFaceTex = useMemo(
    () => createLeatherFaceTexture(backLeatherTex.image),
    [backLeatherTex.image],
  );
  const backFaceTex = useMemo(
    () => createBackLeatherTexture(backLeatherTex.image, logoTex.image),
    [backLeatherTex.image, logoTex.image],
  );

  /* Gentle floating — no Z-rotation drift */
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = -0.42 + Math.sin(t * 0.4) * 0.03;
  });

  /*
   * Tilt in the YZ plane only:
   *   rotation around X axis → negative value tilts the top edge backward
   *   No rotation around Z (no in-plane tilt)
   */
  return (
    <group ref={group} rotation={[-0.1, 0, 0]} scale={1.08}>
      {/* ── Case body — solid color for thin edges/corners ── */}
      <RoundedBox args={[W, H, D]} radius={R} smoothness={10}>
        <meshStandardMaterial
          color={CASE_EDGE_COLOR}
          roughness={0.94}
          metalness={0}
          toneMapped={false}
        />
      </RoundedBox>

      {/* ── Continuous front leather panel; the screen sits above it. ── */}
      <mesh geometry={leatherFaceGeometry} position={[0, 0, D / 2 + 0.004]} renderOrder={1}>
        <meshBasicMaterial
          map={frontFaceTex}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* ── Screen (on top of the rounded leather case) ── */}
      <mesh position={[0, 0, D / 2 + 0.012]} renderOrder={3}>
        <planeGeometry args={[SW + SCREEN_EDGE_OVERLAP, SH + SCREEN_EDGE_OVERLAP]} />
        <meshBasicMaterial
          map={menuTex}
          toneMapped={false}
          dithering
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>

      {/* ── Continuous inset back panel, hiding the box UV tiling without corner overhang. ── */}
      <mesh geometry={leatherFaceGeometry} position={[0, 0, -(D / 2 + 0.006)]} rotation={[0, Math.PI, 0]} renderOrder={2}>
        <meshBasicMaterial
          map={backFaceTex}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>

    </group>
  );
}

/* ─── Polar angle — lock vertical to match camera ─── */
const CAMERA_Y = 0.34;
const CAMERA_Z = 5.05;
const LOCKED_POLAR = Math.acos(CAMERA_Y / Math.sqrt(CAMERA_Y ** 2 + CAMERA_Z ** 2));

/* ─── Exported scene ─── */
export function InteractiveMenu3D() {
  /* Keep the WebGL surface crisp on retina desktop displays while capping
     compact viewports to protect mobile fill-rate and first interaction. */
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(max-width: 640px)");
    const update = () => setIsCompact(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, CAMERA_Y, CAMERA_Z], fov: 34 }}
      /* `pan-y` lets a vertical swipe scroll the page; horizontal drags still rotate the tablet. */
      style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
      dpr={isCompact ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-4, 3, 2]} intensity={0.4} color="#ffeedd" />
      <pointLight position={[0, -2, 4]} intensity={0.15} color="#fff5ee" />

      <Suspense fallback={null}>
        <MenuTablet />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.25}
        enableZoom
        enablePan={false}
        minDistance={3.2}
        maxDistance={7.2}
        target={[0, -0.42, 0]}
        minPolarAngle={LOCKED_POLAR}
        maxPolarAngle={LOCKED_POLAR}
        dampingFactor={0.06}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}
