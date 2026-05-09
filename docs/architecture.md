# Architecture

## Runtime Model

This is a static Next.js App Router site. There is no server runtime in production:

- `next build` generates static HTML, CSS, JavaScript, and assets into `out/`.
- `next.config.js` enables `output: "export"` and `trailingSlash: true` for GitHub Pages-friendly paths.
- Images are configured with `unoptimized: true` because GitHub Pages cannot run the Next image optimization server.

## Routing

Routes live under `src/app`:

- `/`
- `/about`
- `/experience`
- `/projects`
- `/links`
- `/resume`
- not found route

Use `next/link` for internal navigation. Do not reintroduce hash routes or static redirect hacks.

## Content Boundary

`src/content` is the source of truth for site data:

- `site.ts`: global config and navigation
- `experience.ts`: work history
- `projects.ts`: project entries
- `links.ts`: social and work links
- `resume.ts`: resume gate config
- `types.ts`: shared content schemas

Pages should stay thin and map content into reusable components.

## Styling Boundary

`src/app/globals.css` currently preserves the old visual system. It contains global tokens plus legacy class names used by restored pages and components.

For the future UI overhaul, migrate visual rules out of the global stylesheet in small slices:

1. Keep global reset, tokens, and typography global.
2. Move header, footer, accordion, cards, and resume styles into scoped component styles.
3. Replace legacy Bootstrap-like utility classes with explicit component layout rules.

Avoid bringing back external Bootstrap CSS because it can override site tokens and body styling.

## Security Boundary

The resume prompt is not authentication. It hashes a user-entered value in the browser and compares it with a hash that is shipped to every visitor. That is acceptable only as light friction, not privacy.

If the resume ever needs to be private, move it behind real authenticated storage instead of static hosting.

## Verification

Run this before merging or deploying:

```bash
npm run check
npm audit
```
