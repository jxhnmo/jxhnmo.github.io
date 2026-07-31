import { statSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { ogImagePath, routes, shareMeta, type ShareMeta } from "@/content/seo";
import styles from "./og-preview.module.css";

/**
 * Dev-only contact sheet for the Open Graph cards: every card on one page, over
 * switchable backgrounds — plus, below it, what each page looks like when the
 * link is pasted somewhere, with the tag values that produce it.
 *
 * Two things worth knowing about how "live" this is:
 *
 * 1. This page hot-reloads like any other route, and it reads the route table at
 *    render time, so editing `src/content/routes.json` shows up on refresh.
 * 2. The cards themselves are rendered by satori inside
 *    `scripts/generate-og.mjs`, NOT by React — they are PNGs on disk. Editing
 *    that script does not hot-reload; run `npm run og:watch` alongside
 *    `npm run dev` and it regenerates the PNGs on save, then refresh here.
 *
 * The unfurl mock and the tag table both read `shareMeta()`, the same function
 * `buildMetadata()` uses, so neither can drift from what the pages actually
 * serve. Nothing here recomposes a title.
 *
 * `npm run postbuild` deletes this route from `out/`, so it never deploys.
 */
export const metadata: Metadata = {
  title: "OG card preview",
  robots: { index: false, follow: false },
};

// Keyed by `value`, not `id`: CSS Modules rewrites ID selectors (`#bg-white`
// became `#og-preview-module__8kmvJW__bg-white`), so the stylesheet never matched
// the rendered markup and the backdrop switch did nothing. Attribute selectors
// are left alone by the scoping, so `input[value="white"]:checked` is stable.
const BACKGROUNDS = [
  { value: "grey", label: "grey" },
  { value: "white", label: "white" },
  { value: "dark", label: "dark" },
  { value: "checker", label: "checkerboard" },
] as const;

const CLIENT_THEMES = [
  { value: "dark", label: "dark" },
  { value: "light", label: "light" },
] as const;

/**
 * The card's mtime, used to cache-bust the <img>. Without it the browser serves
 * the previously generated PNG from cache and the page looks like nothing
 * changed — the single most confusing thing when iterating on card design.
 */
function cardVersion(routePath: string): string {
  const file = join(process.cwd(), "public", ogImagePath(routePath));
  try {
    return String(Math.round(statSync(file).mtimeMs));
  } catch {
    return "missing";
  }
}

/**
 * The head tags a scraper reads, in the order it is useful to eyeball them.
 * Values come straight from shareMeta() — this only labels them.
 */
function tagRows(meta: ShareMeta): { tag: string; value: string }[] {
  return [
    { tag: "<title>", value: meta.title },
    { tag: "meta description", value: meta.description },
    { tag: "rel=canonical", value: meta.url },
    { tag: "robots", value: meta.robots ?? "(no tag — indexable)" },
    { tag: "og:site_name", value: meta.siteName },
    // Listed even though it is now the same string as <title>: seeing the two
    // rows agree is the check, and they were two different strings until
    // recently.
    { tag: "og:title", value: meta.title },
    { tag: "og:description", value: meta.description },
    { tag: "og:url", value: meta.url },
    { tag: "og:type", value: meta.type },
    { tag: "og:locale", value: meta.locale },
    { tag: "og:image", value: meta.image.url },
    { tag: "og:image:type", value: meta.image.type },
    // One row for two tags, because the pair is only ever read together — but
    // labelled with both real tag names, since this table doubles as the
    // reference for what the page emits.
    {
      tag: "og:image:width/height",
      value: `${meta.image.width} × ${meta.image.height}`,
    },
    { tag: "og:image:alt", value: meta.image.alt },
    { tag: "twitter:card", value: meta.twitterCard },
  ];
}

export default function OgPreviewPage() {
  // Route path and card URL come off `meta` rather than being recomputed here,
  // so both sections of this page are looking at one object.
  const cards = routes.map((route) => ({
    version: cardVersion(route.path),
    meta: shareMeta(route.path),
  }));

  return (
    <main id="page-container" className={`my-3 ${styles.page}`}>
      <h1 className="pageTitle">OG preview</h1>

      <div className={styles.wrap}>
        <h2 className={styles.sectionTitle}>Cards</h2>

        {/* Radio + :has() rather than a client component — no JS needed. */}
        <fieldset className={styles.controls}>
          <legend className={styles.legend}>Backdrop</legend>
          {BACKGROUNDS.map((background, index) => (
            <label key={background.value} className={styles.control}>
              <input
                type="radio"
                name="bg"
                value={background.value}
                defaultChecked={index === 0}
              />
              <span>{background.label}</span>
            </label>
          ))}
        </fieldset>

        <p className={styles.note}>
          Cards are PNGs with a transparent surround, so check they hold up on
          light <em>and</em> dark — platforms composite them onto their own
          background. Editing <code>scripts/generate-og.mjs</code> needs{" "}
          <code>npm run og:watch</code> running to take effect here.
        </p>

        <div className={styles.grid}>
          {cards.map((card) => (
            <figure key={card.meta.path} className={styles.card}>
              {/*
                Plain <img> on purpose: next/image is pointless here (images are
                unoptimized under `output: "export"`, and this page never ships)
                and it would fight the mtime cache-buster in the query string.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${card.meta.image.path}?v=${card.version}`}
                alt={`Open Graph card for ${card.meta.path}`}
                width={1200}
                height={630}
              />
              <figcaption>
                <b>{card.meta.path}</b>
                <code>{card.meta.image.path}</code>
                {card.version === "missing" ? (
                  <em className={styles.missing}>
                    not generated — run <code>npm run og</code>
                  </em>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2 className={styles.sectionTitle}>Pasted as a link</h2>

        <fieldset className={styles.controls}>
          <legend className={styles.legend}>Client theme</legend>
          {CLIENT_THEMES.map((theme, index) => (
            <label key={theme.value} className={styles.control}>
              <input
                type="radio"
                name="client-theme"
                value={theme.value}
                defaultChecked={index === 0}
              />
              <span>{theme.label}</span>
            </label>
          ))}
        </fieldset>

        <p className={styles.note}>
          A Discord-shaped mock of each link, beside the tags it is built from.
          Discord reads the <code>og:*</code> tags and ignores{" "}
          <code>&lt;title&gt;</code>; the large-image layout follows from{" "}
          <code>og:image</code> being 1200×630 rather than square. The
          embed&apos;s left edge is the default grey because the site sets no{" "}
          <code>meta name=&quot;theme-color&quot;</code> — add one and Discord
          colours that edge instead. Spacing and type here are approximate;
          treat it as a copy-fit check, not a pixel reference. Note that a real
          paste is also cached per-URL for a good while, so a card change will
          not show up in an old message.
        </p>

        <div className={styles.unfurls}>
          {cards.map((card) => (
            <section key={card.meta.path} className={styles.unfurl}>
              <h3 className={styles.unfurlTitle}>
                <b>{card.meta.path}</b>
              </h3>

              <div className={styles.client}>
                <div className={styles.message}>
                  <div className={styles.avatar} aria-hidden="true">
                    JM
                  </div>
                  <div className={styles.messageBody}>
                    <div className={styles.messageHead}>
                      <span className={styles.author}>John</span>
                      <span className={styles.stamp}>Today at 7:42 PM</span>
                    </div>
                    <span className={styles.pastedLink}>{card.meta.url}</span>
                    <div className={styles.embed}>
                      <span className={styles.embedSite}>
                        {card.meta.siteName}
                      </span>
                      <span className={styles.embedTitle}>
                        {card.meta.title}
                      </span>
                      {card.meta.description ? (
                        <span className={styles.embedDescription}>
                          {card.meta.description}
                        </span>
                      ) : null}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={styles.embedImage}
                        src={`${card.meta.image.path}?v=${card.version}`}
                        alt={card.meta.image.alt}
                        width={1200}
                        height={630}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <dl className={styles.tags}>
                {tagRows(card.meta).map((row) => (
                  <div key={row.tag} className={styles.tagRow}>
                    <dt>{row.tag}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
