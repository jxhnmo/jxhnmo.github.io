import type { Metadata } from "next";
import routesData from "./routes.json";
import { socialLinks } from "./links";
import { siteConfig } from "./site";

export type RouteSeo = {
  path: string;
  /**
   * The page's name in proper case ("About"). Lowercased and suffixed by
   * pageTitle(), which is the one title every tag uses.
   *
   * The home entry is the exception: its title is the bare site title, so its
   * value here is a label only and appears in no output.
   */
  title: string;
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

/**
 * The page's one title: the <title> element, og:title, and twitter:title all get
 * this exact string. Lowercase, because that is the site's house style —
 * "john mo's site", "about | john mo's site".
 *
 * These were briefly two values, a lowercase document title and a proper-case
 * share title, on the theory that lowercase reads as a typo in a feed. Having a
 * link's title change depending on where it was pasted was the worse of the two
 * problems, so the house style now wins everywhere. og:site_name is still proper
 * case — that is a name, not a title. What the split cost, and the only thing
 * worth reconsidering it for, is the homepage: its share title was
 * "John Mo — Software Engineer", and now it is "john mo's site", so the
 * "software engineer" keyword lives in the meta description and the OG card
 * alone.
 *
 * Inner pages lowercase their route title. Every current title is one ordinary
 * word, so that is safe; a route whose name carries meaningful capitals (an
 * acronym, a product name) should get an explicit lowercase form in routes.json
 * rather than be mangled here.
 */
function pageTitle(route: RouteSeo): string {
  return route.path === "/"
    ? siteConfig.title
    : `${route.title.toLowerCase()} | ${siteConfig.title}`;
}

/**
 * Every tag value a link scraper will read for a route, resolved to the exact
 * strings that end up in the HTML.
 *
 * This exists so buildMetadata() below and the /og-preview unfurl mock are
 * driven by one computation rather than two. The preview's whole job is to show
 * what Discord or LinkedIn will show; if it composed its own titles it could
 * agree with itself while disagreeing with the shipped page.
 */
export type ShareMeta = {
  path: string;
  /** One string for <title>, og:title, and twitter:title alike. */
  title: string;
  description: string;
  /** Absolute, trailing-slashed: both rel=canonical and og:url. */
  url: string;
  siteName: string;
  type: string;
  locale: string;
  image: {
    /** Site-root-relative, e.g. `/about/og.png` — what <img> here wants. */
    path: string;
    /** Absolute — what scrapers fetch. */
    url: string;
    width: number;
    height: number;
    alt: string;
    type: string;
  };
  twitterCard: "summary_large_image";
  /** The robots directive, or null when no tag is emitted (i.e. indexable). */
  robots: string | null;
};

export function shareMeta(path: string): ShareMeta {
  const route = getRoute(path);
  const title = pageTitle(route);
  const imagePath = ogImagePath(route.path);

  return {
    path: route.path,
    title,
    description: route.description,
    url: absoluteUrl(route.path),
    // The person's name, not siteConfig.title: og:site_name is the attribution
    // line a platform prints beside the card, and "john mo's site" is a title
    // rather than a name. This is the one place proper case survives.
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    image: {
      path: imagePath,
      url: assetUrl(imagePath),
      width: 1200,
      height: 630,
      // Conditional: the brand card has no blurb, and appending it
      // unconditionally left the homepage's alt text ending in a dangling " — ".
      alt: route.og.blurb ? `${title} — ${route.og.blurb}` : title,
      type: "image/png",
    },
    twitterCard: "summary_large_image",
    robots: route.noindex ? "noindex, follow" : null,
  };
}

/**
 * Per-page metadata: title, a description written for that page, a canonical
 * URL, the matching og:url (the root layout's value would otherwise make every
 * page claim the homepage), and the route's pre-rendered OG card.
 */
export function buildMetadata(path: string): Metadata {
  const meta = shareMeta(path);
  const image = {
    url: meta.image.url,
    width: meta.image.width,
    height: meta.image.height,
    alt: meta.image.alt,
    type: meta.image.type,
  };

  return {
    // Always absolute: pageTitle() composes the whole string, so the layout's
    // `%s | ...` template must not also be applied on top of it.
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.url,
      siteName: meta.siteName,
      type: "website",
      locale: meta.locale,
      images: [image],
    },
    twitter: {
      card: meta.twitterCard,
      title: meta.title,
      description: meta.description,
      images: [image],
    },
    // Passed through as the string, not rebuilt as `{ index: false, follow: true }`:
    // that form meant /og-preview could print a directive the page did not emit
    // if the two ever disagreed. Next accepts the literal content value.
    ...(meta.robots ? { robots: meta.robots } : {}),
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
