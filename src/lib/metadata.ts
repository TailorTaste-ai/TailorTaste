import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageMetadataOptions = {
  keywords?: string[];
};

export function buildPageMetadata(
  title: string,
  path: string,
  description = siteConfig.description,
  options: PageMetadataOptions = {}
): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const socialImage = {
    ...siteConfig.socialImage,
    url: new URL(siteConfig.socialImage.url, siteConfig.url).toString(),
  };
  const keywords = [...new Set([...siteConfig.keywords, ...(options.keywords ?? [])])];
  const brandedTitle = `${title} | ${siteConfig.name}`;

  return {
    title: path === "/" ? brandedTitle : title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [socialImage.url],
    },
  };
}
