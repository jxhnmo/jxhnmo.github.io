/**
 * Renders one 1200x630 Open Graph card per route, written alongside the page it
 * belongs to: `/` -> public/og.png, `/experience` -> public/experience/og.png.
 * optimize-images.py then re-compresses them losslessly in place.
 *
 * Because `trailingSlash: true` makes every page path end in `/`, the public URL
 * is just the page path plus `og.png` — `/experience/og.png` sits next to
 * `/experience/`, so a card is guessable from the page it belongs to.
 *
 * The extension is required, not cosmetic. This is also why Next's
 * `opengraph-image.tsx` convention is unused: under `output: "export"` it emits
 * an *extensionless* file and points og:image at `/opengraph-image?<hash>`, and
 * GitHub Pages serves unknown extensions as application/octet-stream, which OG
 * scrapers reject.
 *
 * Card copy comes from src/content/routes.json, the same table src/content/
 * seo.ts reads for page metadata, so the two cannot drift.
 *
 * Usage: node scripts/generate-og.mjs [--check]
 *        --check exits non-zero if any card is missing or stale (for CI).
 */

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

/*
 * `next/og.js`, not `next/og`: this script runs in plain Node, where the bare
 * specifier does not resolve through Next's export map. It is also not a
 * documented entry point, so a Next major upgrade could move it — hence the
 * explicit message rather than a bare MODULE_NOT_FOUND. Build-only, so a break
 * here can never reach a visitor.
 */
let ImageResponse;
try {
  ({ ImageResponse } = await import("next/og.js"));
} catch (error) {
  console.error(
    "Failed to load `next/og.js`, the satori-backed OG renderer.\n" +
      "It is an internal Next path, so a Next upgrade may have moved it.\n" +
      "Check what `next` exports for OG image generation and update the import\n" +
      "at the top of scripts/generate-og.mjs.\n",
  );
  throw error;
}

const SCRIPT = fileURLToPath(import.meta.url);
const ROOT = join(dirname(SCRIPT), "..");
const PUBLIC_DIR = join(ROOT, "public");
const FONTS = join(ROOT, "src", "assets", "fonts");
/*
 * Records what each committed card was rendered from, so --check can tell a
 * stale card from a current one. Without it, `npm run check` passed while
 * shipping cards whose copy no longer matched routes.json — the worst place for
 * that, because social platforms cache OG images hard and only re-scrape when
 * asked. Owned by this script; the image derivatives have their own manifest
 * under src/assets/opt/ (see optimize-images.py).
 */
const MANIFEST = join(ROOT, "scripts", "og-manifest.json");

const SIZE = { width: 1200, height: 630 };
const GRID = 72; // matches the 72px line grid on the live site

const { routes } = JSON.parse(
  readFileSync(join(ROOT, "src", "content", "routes.json"), "utf8"),
);

const SITE_HOST = "jxhnmo.github.io";

/** public/ location for a route's card: "/" -> public/og.ext, "/about" -> public/about/og.ext */
function cardPath(routePath, ext) {
  const segments = routePath.split("/").filter(Boolean);
  return join(PUBLIC_DIR, ...segments, `og.${ext}`);
}

const mark = readFileSync(join(ROOT, "src", "assets", "opt", "og-mark.png"));
const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

/** A PNG's IHDR stores width/height as big-endian uint32s at bytes 16 and 20. */
function pngSize(buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const MARK_SIZE = pngSize(mark);

/**
 * Satori accepts React-element-shaped plain objects, so the card is built
 * without pulling in React or a JSX transform for a build-only script.
 */
function h(type, style, ...children) {
  const kids = children
    .flat()
    .filter((child) => child !== null && child !== false);
  return {
    type,
    props: {
      style,
      ...(kids.length ? { children: kids.length === 1 ? kids[0] : kids } : {}),
    },
  };
}

/** `img` needs src/width/height as real props, not style, so it gets its own helper. */
function img(props) {
  return { type: "img", props };
}

/**
 * Explicit line divs — satori does not tile `background-size` the way CSS does.
 * Sized to the card rather than the canvas so they clip to its rounded corners.
 */
function gridLines(width, height) {
  const lines = [];
  for (let x = GRID; x < width; x += GRID) {
    lines.push(
      h("div", {
        position: "absolute",
        left: x,
        top: 0,
        width: 1,
        height,
        background: "rgba(255,255,255,0.055)",
      }),
    );
  }
  for (let y = GRID; y < height; y += GRID) {
    lines.push(
      h("div", {
        position: "absolute",
        left: 0,
        top: y,
        width,
        height: 1,
        background: "rgba(255,255,255,0.055)",
      }),
    );
  }
  return lines;
}

// The mark is cropped tight to the glyph, so it is not square. Driving the width
// from its real aspect ratio is what keeps the divider optically centred — the
// old 240x240 box carried ~35px of invisible padding each side, making the
// glyph->bar gap 91px against 57px for bar->text.
//
// 207 keeps the glyph the same optical height it had inside that 240px box.
const LOGO_HEIGHT = 207;
const LOGO_WIDTH = Math.round(
  (LOGO_HEIGHT * MARK_SIZE.width) / MARK_SIZE.height,
);
// The rounded panel *is* the card. Everything outside it is left transparent,
// so the artwork reads as a floating card rather than a full-bleed image. This
// is why the cards are PNG and not JPEG — JPEG has no alpha channel.
const PANEL_INSET = 26;
const CARD_WIDTH = SIZE.width - PANEL_INSET * 2;
const CARD_HEIGHT = SIZE.height - PANEL_INSET * 2;
const CARD_RADIUS = 28;
// Measured from the card edge, so content sits where it did when the padding was
// measured from the canvas edge (PANEL_INSET + ROW_PADDING = the old 78).
const ROW_PADDING = 52;
// 2px rather than 1: the card renders at 1200px but displays far smaller, and a
// feed preview around 500px wide would scale a 1px rule to ~0.4px, where it
// renders inconsistently or vanishes.
const BAR_WIDTH = 2;
const BAR_MARGIN = 56;

// The divider is the card's compositional anchor, fixed at 33% of the card width
// from its left edge. The logo's inset is then derived from it rather than being
// a padding value, which is what keeps the gaps either side of the bar symmetric
// while pushing the whole composition off the left edge (153px in, not 53px).
const BAR_X = Math.round(CARD_WIDTH * 0.33);
const LOGO_LEFT = BAR_X - BAR_MARGIN - LOGO_WIDTH;

/**
 * The text column needs an explicit width, not just `flexGrow`. Satori sizes a
 * flex item to its content and will happily run a long blurb off the edge of the
 * canvas instead of wrapping it; a bounded width is what makes text wrap.
 */
const TEXT_WIDTH =
  CARD_WIDTH - (BAR_X + BAR_WIDTH + BAR_MARGIN) - ROW_PADDING - 12; // small right-hand gutter so wrapped lines clear the panel edge

/**
 * A card with no eyebrow and no blurb is the brand card (the homepage): just the
 * name beside the mark. It gets its own treatment — a bigger heading centred
 * across a two-band span — because it has the vertical room that a card carrying
 * three stacked elements does not.
 */
function isBrandCard({ eyebrow, blurb }) {
  return !eyebrow && !blurb;
}

/** Heading size for the brand card, sitting across two bands (144px). */
const BRAND_HEADING_SIZE = 104;

/**
 * Heading size for cards that also carry an eyebrow and blurb. The right-hand
 * column is ~600px wide, so long headings step down or they overflow.
 *
 * Capped at 84 so the cap-height (~0.73em, so ~61px) sits inside a single 72px
 * band with ~6px of air above and below. 96 measured 70px of caps in a 72px band
 * — it technically fits but crossed the band line once real font metrics applied,
 * and left nothing for rounding.
 */
function headingSize(heading) {
  if (heading.length <= 11) return 84;
  return 72;
}

/*
 * Text is anchored to the 72px grid rather than vertically centred, so each
 * element sits inside a band instead of drifting across a line. Measured before:
 * the heading's caps ran y=255..315 and crossed the line at 314, and the blurb's
 * first line sat 46px below its band top but only 1px above the bottom.
 *
 * Bands used (card-relative): eyebrow 144-216, heading 216-288, blurb 288-360.
 */
const EYEBROW_BAND_TOP = GRID * 2;
// The eyebrow is top-aligned in its band, but inset below the band line rather
// than sitting on it: flush against the line it read as belonging to the row
// above. A sixth of a band is small enough to still read as top-aligned (the band
// has 52px of slack, so centring would be 26px).
const EYEBROW_BAND_INSET = GRID / 6;
const HEADING_BAND_TOP = GRID * 3;
// Offset half a band below the heading's band. Starting it on the band line put
// the blurb only ~12px under the heading's caps, which crowded it; half a band
// restores a ~48px gap while keeping the blurb on the 36px half-grid rhythm.
const BLURB_BAND_TOP = GRID * 4 + GRID / 2;

// Font metrics as satori renders these faces, used to place ink (not the line
// box) inside a band. Ratios of font size: cap height, and the gap from an
// element's top edge to the top of its caps.
// Calibrated against the rendered output, not derived from the font tables:
// measured cap tops sat 13.6px below the element top at 84px and 15.1px at 96px.
const CAP_RATIO = 0.729;
const CAP_OFFSET_RATIO = 0.16;
// No cap-height ratio for the eyebrow: it is hung off its band's top line rather
// than centred in the band, so only the offset to the cap top matters.
const EYEBROW_CAP_OFFSET_RATIO = 0.23;

/**
 * Element top that centres a line's cap-height within a band span. `bandHeight`
 * is one GRID for text inside a single band, or a multiple for the brand card's
 * heading, which is centred across two.
 */
function bandAlignedTop(
  bandTop,
  bandHeight,
  fontSize,
  capRatio,
  capOffsetRatio,
) {
  const capHeight = capRatio * fontSize;
  return bandTop + (bandHeight - capHeight) / 2 - capOffsetRatio * fontSize;
}

/**
 * Element top that sits a line's cap-height *on* a band's top line rather than
 * centring it in the band. Used for the eyebrow, which reads better hung off the
 * grid line than floating in the middle of the band.
 */
function bandTopAlignedTop(bandTop, fontSize, capOffsetRatio) {
  return bandTop - capOffsetRatio * fontSize;
}

// The domain chip straddles the last grid line, centred on it.
const CHIP_LINE = GRID * 7;
const CHIP_HEIGHT = 52;

// 1.2 on a 30px blurb gives a 36px line box — half a grid band — so a two-line
// blurb fills exactly one band and every line keeps the same relationship to the
// grid no matter how the copy wraps.
const BLURB_FONT_SIZE = 30;
const BLURB_LINE_HEIGHT = 1.2;

function card({ eyebrow, heading, blurb }) {
  // Transparent canvas; the card itself is the bordered, rounded child.
  return h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cardPanel({ eyebrow, heading, blurb }),
  );
}

function cardPanel({ eyebrow, heading, blurb }) {
  // The brand card's heading is larger and centred across two bands; every other
  // card's sits inside a single band above its blurb.
  const brand = isBrandCard({ eyebrow, blurb });
  const headingFontSize = brand ? BRAND_HEADING_SIZE : headingSize(heading);
  const headingBandHeight = brand ? GRID * 2 : GRID;

  return h(
    "div",
    {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      display: "flex",
      position: "relative",
      // Clips the grid, bloom, and border to the rounded silhouette.
      overflow: "hidden",
      borderRadius: CARD_RADIUS,
      border: "1px solid rgba(201,174,255,0.18)",
      // Flat, and matching the live site: #page-container is `background:
      // var(--dark)` with no gradient — its depth comes from the dot-grid and
      // cursor-glow overlays instead. The grid lines and the accent bar carry
      // the visual interest here.
      backgroundColor: "#2a1a38",
      fontFamily: "Rubik",
    },

    ...gridLines(CARD_WIDTH, CARD_HEIGHT),

    // Main row: logo | gradient bar | text.
    h(
      "div",
      {
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        // Asymmetric by design: only the logo occupies the left third, while the
        // text column runs out to the right padding.
        paddingLeft: LOGO_LEFT,
        paddingRight: ROW_PADDING,
      },

      img({
        src: markSrc,
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        style: { flexShrink: 0 },
      }),

      // Hairline divider between the mark and the page title. The translucent
      // violet is the site's own divider language — globals.css sets
      // `--glass-border: rgba(201, 174, 255, 0.3)` and this card's border is the
      // same hue at 0.18 — rather than a new grey.
      h("div", {
        width: BAR_WIDTH,
        height: 372,
        flexShrink: 0,
        margin: `0 ${BAR_MARGIN}px`,
        borderRadius: 999,
        backgroundColor: "rgba(201,174,255,0.28)",
      }),

      // Text column. Each element is absolutely positioned against its grid
      // band rather than stacked and centred, so the heading always sits inside
      // one band and the blurb always starts on a line. Empty strings are
      // skipped, which is what collapses the homepage card to just the name.
      h(
        "div",
        {
          position: "relative",
          display: "flex",
          width: TEXT_WIDTH,
          height: CARD_HEIGHT,
        },

        eyebrow
          ? h(
              "div",
              {
                position: "absolute",
                left: 0,
                top: bandTopAlignedTop(
                  EYEBROW_BAND_TOP + EYEBROW_BAND_INSET,
                  26,
                  EYEBROW_CAP_OFFSET_RATIO,
                ),
                fontSize: 26,
                lineHeight: 1.2,
                fontWeight: 500,
                letterSpacing: 5,
                color: "#b98cff",
              },
              eyebrow.toUpperCase(),
            )
          : null,

        h(
          "div",
          {
            position: "absolute",
            left: 0,
            top: bandAlignedTop(
              HEADING_BAND_TOP,
              headingBandHeight,
              headingFontSize,
              CAP_RATIO,
              CAP_OFFSET_RATIO,
            ),
            fontFamily: "Raleway",
            fontWeight: 700,
            fontSize: headingFontSize,
            lineHeight: 1.05,
            letterSpacing: -1,
            color: "#ffffff",
          },
          heading.toUpperCase(),
        ),

        blurb
          ? h(
              "div",
              {
                position: "absolute",
                left: 0,
                top: BLURB_BAND_TOP,
                width: TEXT_WIDTH,
                fontSize: BLURB_FONT_SIZE,
                fontWeight: 400,
                lineHeight: BLURB_LINE_HEIGHT,
                color: "#d8d2ea",
              },
              blurb,
            )
          : null,
      ),
    ),

    // Domain chip, bottom-right. Centred *on* the grid line rather than sitting
    // below it, which is why it carries an explicit height and is placed from the
    // top: deriving its box from vertical padding made the centre position
    // guesswork. Offsets are relative to the card, not the canvas.
    h(
      "div",
      {
        position: "absolute",
        right: ROW_PADDING - 4,
        top: CHIP_LINE - CHIP_HEIGHT / 2,
        height: CHIP_HEIGHT,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 22px",
        borderRadius: 999,
        backgroundColor: "rgba(16,10,32,0.55)",
        border: "1px solid rgba(201,174,255,0.22)",
      },
      h("div", {
        width: 10,
        height: 10,
        borderRadius: 999,
        backgroundColor: "#2be7dc",
      }),
      h("div", { fontSize: 23, fontWeight: 400, color: "#cfc7df" }, SITE_HOST),
    ),
  );
}

const fonts = [
  {
    name: "Raleway",
    data: readFileSync(join(FONTS, "Raleway-Bold.ttf")),
    weight: 700,
    style: "normal",
  },
  {
    name: "Rubik",
    data: readFileSync(join(FONTS, "Rubik-Regular.ttf")),
    weight: 400,
    style: "normal",
  },
  {
    name: "Rubik",
    data: readFileSync(join(FONTS, "Rubik-Medium.ttf")),
    weight: 500,
    style: "normal",
  },
];

/**
 * Everything that changes what a card looks like *except* its own copy: this
 * script (all the geometry lives in it), the mark, and the font files. Folding
 * these in means editing the layout invalidates every card, not just the ones
 * whose text changed.
 */
const RENDER_DIGEST = createHash("sha256")
  .update(readFileSync(SCRIPT))
  .update(mark)
  .update(Buffer.concat(fonts.map((font) => font.data)))
  .digest("hex")
  .slice(0, 16);

/**
 * Freshness stamp for one route's card. Hashes the render inputs, never the
 * output PNG — optimize-images.py re-compresses the cards in place afterwards,
 * so output bytes are not a stable identity.
 */
function cardStamp(route) {
  return createHash("sha256")
    .update(RENDER_DIGEST)
    .update(JSON.stringify(route.og))
    .digest("hex")
    .slice(0, 16);
}

function loadManifest() {
  try {
    return JSON.parse(readFileSync(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  const checkOnly = process.argv.includes("--check");

  if (checkOnly) {
    const manifest = loadManifest();
    const stale = [];
    for (const route of routes) {
      if (!existsSync(cardPath(route.path, "png"))) {
        stale.push([route.path, "no card on disk"]);
      } else if (manifest[route.path] !== cardStamp(route)) {
        stale.push([
          route.path,
          "copy or layout changed since it was rendered",
        ]);
      }
    }
    if (stale.length) {
      console.error("OG cards need regenerating:");
      for (const [path, why] of stale)
        console.error(`  ${path.padEnd(14)}${why}`);
      console.error("\nRun: npm run og");
      return 1;
    }
    console.log(`All ${routes.length} OG cards present and up to date.`);
    return 0;
  }

  const manifest = {};
  for (const route of routes) {
    const response = new ImageResponse(card(route.og), { ...SIZE, fonts });
    const buffer = Buffer.from(await response.arrayBuffer());
    const dest = cardPath(route.path, "png");
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buffer);
    manifest[route.path] = cardStamp(route);
    console.log(
      `  ${relative(PUBLIC_DIR, dest)}`.padEnd(28) +
        `${(buffer.length / 1024).toFixed(0)} KB  ${route.path}`,
    );
  }
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `\nGenerated ${routes.length} OG cards under public/.\n` +
      "Run `python3 scripts/optimize-images.py` to re-compress them.\n" +
      "Preview them all at /og-preview (npm run dev).",
  );
  return 0;
}

process.exitCode = await main();
