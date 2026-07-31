import { statSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { ogImagePath, routes } from "@/content/seo";
import styles from "./og-preview.module.css";

/**
 * Dev-only contact sheet for the Open Graph cards: every card on one page, over
 * switchable backgrounds.
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

export default function OgPreviewPage() {
  const cards = routes.map((route) => ({
    path: route.path,
    url: ogImagePath(route.path),
    version: cardVersion(route.path),
  }));

  return (
    <main id="page-container" className={`my-3 ${styles.page}`}>
      <h1 className="pageTitle">OG preview</h1>

      <div className={styles.wrap}>
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
            <figure key={card.path} className={styles.card}>
              {/*
                Plain <img> on purpose: next/image is pointless here (images are
                unoptimized under `output: "export"`, and this page never ships)
                and it would fight the mtime cache-buster in the query string.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${card.url}?v=${card.version}`}
                alt={`Open Graph card for ${card.path}`}
                width={1200}
                height={630}
              />
              <figcaption>
                <b>{card.path}</b>
                <code>{card.url}</code>
                {card.version === "missing" ? (
                  <em className={styles.missing}>
                    not generated — run <code>npm run og</code>
                  </em>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
