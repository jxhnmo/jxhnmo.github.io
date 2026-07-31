import type { Metadata } from "next";
import { Raleway, Rubik } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { SiteShell } from "@/components/SiteShell";
import { personJsonLd, siteDefaultMetadata } from "@/content/seo";
import { siteConfig } from "@/content/site";
import "./globals.css";

/**
 * Self-hosted via next/font instead of the `@import url(fonts.googleapis.com)`
 * this replaced. That @import sat at the top of globals.css, so the font CSS was
 * only discovered *after* the stylesheet downloaded, producing a render-blocking
 * chain of HTML -> globals.css -> fonts.googleapis.com -> fonts.gstatic.com.
 * next/font emits the woff2 from our own origin with a preload link and
 * `font-display: swap`, removing both third-party round trips.
 */
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // Fallback description/OG for any route that does not set its own (the 404
  // page). Every real route declares its own via buildMetadata(), so canonical,
  // og:url, and og:image are page-specific rather than inherited — previously
  // every page advertised the homepage URL.
  ...siteDefaultMetadata(),
  // Must come after the spread: buildMetadata returns an absolute title, which
  // would drop the template that renders child titles as "Projects | John Mo".
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/jm_logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${raleway.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='light'||(s===null&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Analytics measurementId="G-RSHG17DF86" />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
