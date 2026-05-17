import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SiteShell } from "@/components/global/SiteShell";
import { shouldAllowIndexing } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const allowIndexing = shouldAllowIndexing();
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
  title: {
    default: `Home | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="tailor-taste-theme-preview" strategy="beforeInteractive">
          {themePreviewScript}
        </Script>
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
