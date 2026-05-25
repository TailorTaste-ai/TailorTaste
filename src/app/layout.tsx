import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SiteShell } from "@/components/global/SiteShell";
import { shouldAllowIndexing } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const allowIndexing = shouldAllowIndexing();
const socialImage = {
  ...siteConfig.socialImage,
  url: new URL(siteConfig.socialImage.url, siteConfig.url).toString(),
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.url,
  description: siteConfig.description,
  logo: new URL("/logo.png", siteConfig.url).toString(),
  foundingLocation: {
    "@type": "Place",
    name: `${siteConfig.location.locality}, ${siteConfig.location.countryName}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.locality,
      addressCountry: siteConfig.location.countryCode,
    },
  },
  areaServed: {
    "@type": "Country",
    name: siteConfig.location.countryName,
  },
  founder: siteConfig.founders.map((founder) => ({
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    ...(founder.url ? { url: founder.url } : {}),
  })),
  sameAs: siteConfig.ecosystemLinks,
};
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: [siteConfig.alternateName, `${siteConfig.name} ${siteConfig.location.countryName}`],
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
};
const themePreviewScript = `
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var queryTheme = params.get("theme");
    var theme = queryTheme;
    try {
      var storage = window.localStorage;
      if (storage && (queryTheme === "dark" || queryTheme === "light")) {
        storage.setItem("tailorTasteTheme", queryTheme);
      }
      if (!theme && storage) {
        theme = storage.getItem("tailorTasteTheme");
      }
    } catch (_) {
      theme = queryTheme;
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.removeAttribute("data-theme");
    }
  } catch (_) {}
})();
`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#141715" },
  ],
};

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: {
    default: `Home | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Hospitality technology",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.png", sizes: "1024x1024", type: "image/png" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
    ],
    shortcut: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
    googleBot: {
      index: allowIndexing,
      follow: allowIndexing,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [socialImage.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="tailor-taste-theme-preview" strategy="beforeInteractive">
          {themePreviewScript}
        </Script>
        <Script
          id="tailor-taste-organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="tailor-taste-website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
