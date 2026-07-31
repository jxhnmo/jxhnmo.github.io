# John Mo - Personal Site

Static portfolio site built with Next.js App Router and exported for GitHub Pages.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Radix UI primitives for accordion, navigation menu, and theme switch
- `next/image` with static-export-compatible unoptimized images, fed from
  pre-sized derivatives (see Assets)
- `next/font` self-hosting Raleway and Rubik
- ESLint, Prettier, and TypeScript checks

## Commands

```bash
npm run dev
npm run check
npm run build
npm run deploy

npm run images   # regenerate image derivatives (requires Python + Pillow)
npm run og       # regenerate Open Graph cards, then re-compress them
```

`npm run check` verifies asset freshness, then runs a Prettier check, typecheck,
lint, and a production static build.

**Use npm.** `package-lock.json` is the only lockfile, and `packageManager` in
`package.json` pins npm. The repo used to track `yarn.lock` and `pnpm-lock.yaml`
as well; they drifted out of sync, and the pnpm one spent five weeks still
resolving a dependency that had been removed. Don't add a second one back.

## Project Structure

```text
src/
  app/          App Router pages, metadata, sitemap.ts, robots.ts
  assets/       original images (lossless sources) + fonts/ for OG rendering
  assets/opt/   committed web-sized derivatives — what components import
  components/   reusable UI and shell components
  content/      typed site, nav, resume, experience, project, and link data
                plus routes.json + seo.ts (per-route SEO, one source of truth)
  types/        static asset declarations
public/         files served directly: resume PDF, favicon, and OG cards
                (og.png beside each route, e.g. public/experience/og.png)
scripts/        asset pipeline (see Assets)
```

The site exports to `out/` via `next build` because `next.config.js` uses `output: "export"`.

## Assets

`output: "export"` forces `images.unoptimized`, so `next/image` serves whatever
file it is given at full resolution — there is no build-time resizing or format
conversion. Two scripts fill that gap, and their output is **committed** because
the deploy build has no Python available:

- `scripts/optimize-images.py` writes web-sized WebP derivatives from
  `src/assets/**` into `src/assets/opt/**`. Originals are never modified; they
  stay the lossless source for future re-processing. Components import from
  `opt/`. This script also losslessly re-compresses the OG cards in place.
- `scripts/generate-og.mjs` renders one 1200x630 Open Graph card per route,
  written beside the page it belongs to, using the copy in
  `src/content/routes.json`.

After changing an image or any route copy, run `npm run images` / `npm run og`
and commit the result. `npm run verify:assets` fails if anything is stale, and
`npm run check` runs it.

Staleness is tracked in two manifests, each owned by the script that writes it:

- `src/assets/opt/manifest.json` — a hash of each image source plus its encode
  settings.
- `scripts/og-manifest.json` — per route, a hash of that route's `og` copy
  combined with everything else that decides what the card looks like: the
  renderer script itself (all the geometry lives in it), the mark, and the font
  files. So editing a blurb invalidates one card and editing the layout
  invalidates all six.

Both are keyed on content rather than mtimes, because git does not preserve
mtimes — after a clone the timestamps are checkout order, so a timestamp
comparison would pass or fail at random.

The OG manifest hashes render _inputs_, never the output PNG: `optimize-images.py`
re-compresses the cards in place afterwards, so their bytes are not a stable
identity.

### OG card URLs

Because `trailingSlash: true` makes every page path end in `/`, a card's URL is
just its page path plus `og.png`:

| Page           | Card                 |
| -------------- | -------------------- |
| `/`            | `/og.png`            |
| `/experience/` | `/experience/og.png` |

Cards are PNG because the artwork is a rounded panel on a transparent surround,
and JPEG has no alpha channel. Note that some platforms flatten transparent OG
images onto white or black rather than their own feed colour, so the margin is
not guaranteed to stay invisible everywhere.

The extension is required, not cosmetic — GitHub Pages serves extensionless files
as `application/octet-stream`, which OG scrapers reject.
That is also why Next's `opengraph-image.tsx` convention is deliberately not
used: under `output: "export"` it emits an extensionless file and points
`og:image` at `/opengraph-image?<hash>`.

Note that `/experience/og.png` and the page at `/experience/` share a directory
in `out/` and do not collide; only the exact filename resolves, so `/og/` or a
bare `/experience/og` will 404.

## SEO

Per-route titles, descriptions, and OG card copy live in
`src/content/routes.json`. `src/content/seo.ts` turns each entry into page
metadata (canonical URL, `og:url`, per-page OG image) and also drives
`app/sitemap.ts` and `app/robots.ts`, so pages, sitemap, and cards cannot drift
apart. Adding a route means adding an entry there.

Two naming details that are deliberate and easy to "fix" by mistake:

- The `/` entry's `description` is the site description. It is both the homepage
  `<meta name="description">` and the Person JSON-LD `description`. There is no
  separate `siteConfig.description`; when there was, the two drifted.
- `siteConfig.title` (`"john mo's site"`, lowercase) is the browser-tab title
  only. `og:site_name` uses `siteConfig.name` (`"John Mo"`) instead, because that
  field is the attribution label a platform prints beside the card in a feed.

### /og-preview

`/og-preview` is a dev-only contact sheet of all six cards over switchable
backdrops. It is `noindex` and absent from the sitemap, and it is deleted from
`out/` by both `postbuild` and `predeploy`, so neither `npm run build` nor
`npm run deploy` can publish it. A bare `next build` invoked directly (bypassing
npm's lifecycle scripts) would still emit it.

## Content Model

Content lives in typed TypeScript files under `src/content`. Pages and components should render these data structures instead of hard-coding repeated project, job, link, or navigation content.

## Resume Gate

The resume password prompt is a soft client-side gate only. The PDF and password hash ship with the static site, so this should not be treated as real access control or private document storage.

Because of that, `/resume` is marked `noindex`, kept out of the sitemap, and the
PDF is disallowed in `robots.txt`. That keeps it out of search results; it does
not make it private.

## Deployment

Current deployment script:

```bash
npm run build
npm run deploy
```

`deploy` publishes the static `out/` directory with `gh-pages`.

## Frontend Overhaul Notes

The current styling intentionally preserves the pre-refactor visual design. Before a major redesign, keep the content/data layer stable and change the component/style layer deliberately.
