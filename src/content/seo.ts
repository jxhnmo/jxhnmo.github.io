import type { Metadata } from "next";
import routesData from "./routes.json";
import { socialLinks } from "./links";
import { siteConfig } from "./site";

export type RouteSeo = {
  path: string;
  title: string;
  /** Home page: use the title verbatim instead of the `%s | John Mo` template. */
  useTitleAsIs?: boolean;
  description: string;
  sitemapPriority?: number;
  noindex?: boolean;
  og: { eyebrow: string; heading: string; blurb: string };
};

export const routes: RouteSeo[] = (routesData as { routes: RouteSeo[] }).routes;

export const indexableRoutes = routes.filter((route) => !route.noindex);

/**
 * `next.config.js` sets `trailingSlash: true`, so every canonical, og:url, and
 * sitemap entry must carry the trailing slash that GitHub Pages actually serves.
 * Emitting the bare form would point search engines at a URL that redirects.
 */
export function canonicalPath(path: string): string {
  return path === "/" ? "/" : `${path}/`;
}

/** Absolute URL for a page, with the trailing slash the export serves. */
export function absoluteUrl(path: string): string {
  return new URL(canonicalPath(path), siteConfig.url).toString();
}

/**
 * Absolute URL for a file (sitemap.xml, an OG card). Separate from
 * absoluteUrl() because these must NOT gain a trailing slash.
 */
export function assetUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

export function getRoute(path: string): RouteSeo {
  const route = routes.find((candidate) => candidate.path === path);
  if (!route) {
    throw new Error(
      `No SEO entry for "${path}" in src/content/routes.json. Add one so the page, its OG card, and the sitemap stay in sync.`,
    );
  }
  return route;
}

/**
 * A route's OG card URL. Cards sit beside the page they describe, so the path is
 * just the page path plus `og.png`: `/` -> `/og.png`, `/experience` ->
 * `/experience/og.png`. scripts/generate-og.mjs writes to the matching location
 * under public/.
 *
 * PNG rather than JPEG because the card is a rounded panel on a transparent
 * surround and JPEG has no alpha channel. The extension itself is required
 * either way — GitHub Pages serves extensionless files as
 * application/octet-stream, which OG scrapers reject.
 */
export function ogImagePath(routePath: string): string {
  return `${canonicalPath(routePath)}og.png`;
}

/** Full title as it appears in a share card, mirroring the layout's template. */
function shareTitle(route: RouteSeo): string {
  return route.useTitleAsIs
    ? route.title
    : `${route.title} | ${siteConfig.name}`;
}

/**
 * Per-page metadata: title, a description written for that page, a canonical
 * URL, the matching og:url (the root layout's value would otherwise make every
 * page claim the homepage), and the route's pre-rendered OG card.
 */
export function buildMetadata(path: string): Metadata {
  const route = getRoute(path);
  const url = absoluteUrl(route.path);
  const title = shareTitle(route);
  const image = {
    url: ogImagePath(route.path),
    width: 1200,
    height: 630,
    // Conditional: the brand card has no blurb, and appending it unconditionally
    // left the homepage's alt text ending in a dangling " — ".
    alt: route.og.blurb ? `${title} — ${route.og.blurb}` : title,
    type: "image/png",
  };

  return {
    title: route.useTitleAsIs ? { absolute: route.title } : route.title,
    description: route.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: route.description,
      url,
      // The person's name, not siteConfig.title. og:site_name is the attribution
      // label a platform prints beside the card in a feed, where the lowercase
      // "john mo's site" reads as a typo rather than as a house style. The
      // lowercase form is still the browser-tab title (see layout.tsx).
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: route.description,
      images: [image],
    },
    ...(route.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * Layout-level fallbacks for any route that does not export its own metadata —
 * in practice just the 404 page.
 *
 * `alternates` is stripped deliberately: inherited, it had the 404 page emitting
 * `<link rel="canonical" href="https://jxhnmo.github.io/">`, i.e. declaring
 * itself to be the homepage.
 */
export function siteDefaultMetadata(): Metadata {
  const defaults = buildMetadata("/");
  delete defaults.alternates;
  return defaults;
}

/**
 * Person structured data. Only asserts facts the site itself states — the
 * university is deliberately omitted because no page names it.
 *
 * `description` reads the homepage route rather than a separate siteConfig field.
 * When those were two strings they drifted: an edit to the siteConfig one showed
 * up in this JSON-LD while the homepage <meta name="description"> kept the older
 * wording.
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Software Engineer",
    description: getRoute("/").description,
    email: `mailto:${siteConfig.email}`,
    image: assetUrl(ogImagePath("/")),
    sameAs: socialLinks.map((link) => link.href),
    worksFor: {
      "@type": "Organization",
      name: "Creator Games",
    },
    knowsAbout: [
      "Software Engineering",
      "Game Development",
      "Applied AI",
      "Roblox",
      "Startups",
    ],
  };
}
