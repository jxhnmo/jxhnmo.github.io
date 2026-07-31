import type { MetadataRoute } from "next";
import { assetUrl } from "@/content/seo";
import { resumeConfig } from "@/content/resume";

/**
 * Replaces public/robots.txt so the sitemap URL is derived from siteConfig
 * rather than hardcoded. `output: "export"` writes this to out/robots.txt.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The resume gate is client-side only, so the PDF is a plain public file.
      // This keeps it out of search results; it does not make it private.
      disallow: [resumeConfig.pdf],
    },
    sitemap: assetUrl("/sitemap.xml"),
  };
}
