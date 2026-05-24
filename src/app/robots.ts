import type { MetadataRoute } from "next";
import { shouldAllowIndexing } from "@/lib/env";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const sitemap = new URL("/sitemap.xml", siteConfig.url).toString();

  if (!shouldAllowIndexing()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap,
  };
}
