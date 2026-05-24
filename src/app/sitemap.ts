import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/product", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/future", priority: 0.5 },
  { path: "/privacy", priority: 0.2 },
  { path: "/legal", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
