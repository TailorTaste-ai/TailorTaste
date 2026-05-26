import type { Metadata } from "next";
import { MenuCanvasDemo } from "@/components/canvas/MenuCanvasDemo";

export const metadata: Metadata = {
  title: "Menu Editor",
  description: "Password-protected TailorTaste manager menu editor demo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CanvasPage() {
  return <MenuCanvasDemo />;
}
