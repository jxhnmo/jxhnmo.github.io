import type { MetadataRoute } from "next";
import { absoluteUrl, indexableRoutes } from "@/content/seo";

/**
 * Replaces the hand-maintained public/sitemap.xml, whose lastmod dates had
 * drifted from reality (the homepage still claimed 2025-10-27). Generated at
 * build time from the same route table the pages use, so the URL list cannot go
 * stale. `output: "export"` writes this to out/sitemap.xml.
 *
 * `lastModified` is deliberately omitted. A static export has no request-time
 * clock; `new Date()` would stamp every build and train crawlers to ignore the
 * field, while a hand-bumped constant would rot exactly the way the old file
 * did. Google discounts lastmod it finds unreliable, so no value beats a wrong
 * one — and /resume is excluded here because it is noindex.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: "monthly" as const,
    priority: route.sitemapPriority ?? 0.5,
  }));
}
