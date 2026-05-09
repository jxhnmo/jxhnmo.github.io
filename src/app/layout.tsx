import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    type: "website",
    locale: "en_US",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Analytics measurementId="G-RSHG17DF86" />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
