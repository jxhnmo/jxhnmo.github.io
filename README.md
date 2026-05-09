# John Mo - Personal Site

Static portfolio site built with Next.js App Router and exported for GitHub Pages.

## Stack

- Next.js App Router
- React 18
- TypeScript
- Radix UI primitives for accordion, navigation menu, and theme switch
- `next/image` with static-export-compatible unoptimized images
- ESLint, Prettier, and TypeScript checks

## Commands

```bash
npm run dev
npm run check
npm run build
npm run deploy
```

`npm run check` runs typecheck, lint, and a production static build.

## Project Structure

```text
src/
  app/          App Router pages and metadata
  assets/       imported images used by Next components
  components/   reusable UI and shell components
  content/      typed site, nav, resume, experience, project, and link data
  types/        static asset declarations
public/         files served directly, including resume PDF and SEO files
```

The site exports to `out/` via `next build` because `next.config.js` uses `output: "export"`.

## Content Model

Content lives in typed TypeScript files under `src/content`. Pages and components should render these data structures instead of hard-coding repeated project, job, link, or navigation content.

## Resume Gate

The resume password prompt is a soft client-side gate only. The PDF and password hash ship with the static site, so this should not be treated as real access control or private document storage.

## Deployment

Current deployment script:

```bash
npm run build
npm run deploy
```

`deploy` publishes the static `out/` directory with `gh-pages`.

## Frontend Overhaul Notes

The current styling intentionally preserves the pre-refactor visual design. Before a major redesign, keep the content/data layer stable and change the component/style layer deliberately.
