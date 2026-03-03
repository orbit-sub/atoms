# Changelog

All notable changes to the Atoms design system are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

---

## [0.0.0] — 2026-03-03

### Added

#### Foundation
- `src/lib/utils.ts` — `cn()` helper combining clsx + tailwind-merge for safe class merging
- `src/styles/globals.css` — Tailwind v4 CSS-first config: `@import tailwindcss`, `@theme inline` token aliases, `@utility btn-gradient` / `btn-gradient-hover`
- `src/index.ts` — public barrel export (Button, Alert, AlertTitle, AlertDescription, cn + all types)
- `tsconfig.lib.json` — emit-capable TypeScript config scoped to library source only

#### Components (CVA + Tailwind v4)
- **Button** — rewrote with `class-variance-authority`: 6 variants (primary, outline-gray, outline, tertiary, link, secondary), 4 sizes (sm/md/lg/xl), `forwardRef`, `asChild` via Radix Slot, `leadIcon` / `trailIcon` / `iconOnly` slots, compound variants for destructive + icon-only
- **Alert** — rewrote with CVA: 6 variants (info/warning/error/success/discovery/neutral), `AlertTitle` + `AlertDescription` sub-components, dismissible close button with accessible `aria-label`

#### Token Documentation
- `src/tokens/tokens.stories.tsx` — `Tokens/Overview` Storybook story with three panels: Colors (brand, destructive, focus rings, alert variants), Spacing & Radius, Typography

#### npm Package
- Vite library mode — outputs ESM (`dist/index.js`), CJS (`dist/index.cjs`), TypeScript declarations (`dist/index.d.ts`)
- `package.json` exports map, `peerDependencies` (react/react-dom), `sideEffects: false`, npm workspaces (`apps/*`)

#### Next.js Demo App (`apps/docs/`)
- Next.js 15 app consuming `atoms` as a workspace package via `"atoms": "file:../.."`
- Demo page showing all Button variants, sizes, disabled states + all Alert variants, with-title, dismissible
- Tailwind v4 via `@tailwindcss/postcss`, tokens imported from atoms source
- `apps/docs/eslint.config.mjs` — local ESLint config to isolate from root library rules

#### CI
- `.github/workflows/chromatic.yml` — `autoAcceptChanges` on `main` pushes; PRs require manual review
- Chromatic Build 4 published — 47 snapshots accepted as new baseline

### Changed
- `vite.config.ts` — added `tailwindcss()` plugin, `dts()` plugin, `build.lib` config
- `.storybook/preview.ts` — switched CSS import from `tokens.css` → `globals.css`
- `package.json` — `build` script simplified from `tsc -b && vite build` → `vite build`
- `.gitignore` — added `.next/`, `next-env.d.ts`, `*.tsbuildinfo`

### Fixed
- Storybook Babel indexer error — changed `export default meta satisfies Meta<...>` to `const meta = { ... } satisfies Meta<...>` + `export default meta` (plain identifier)

### Dependencies Added
| Package | Type | Version |
|---|---|---|
| `class-variance-authority` | runtime | `^0.7.1` |
| `clsx` | runtime | `^2.1.1` |
| `tailwind-merge` | runtime | `^3.5.0` |
| `@radix-ui/react-slot` | runtime | `^1.2.4` |
| `tailwindcss` | dev | `^4.2.1` |
| `@tailwindcss/vite` | dev | `^4.2.1` |
| `vite-plugin-dts` | dev | `^4.5.4` |

---

## [0.0.0-alpha.1] — 2026-02-XX

### Added
- **Button** component — BEM CSS, 6 variants, 4 sizes
- **Alert** component — BEM CSS, 6 variants, dismissible
- Storybook 10 setup with `@storybook/react-vite`
- Chromatic CI workflow (`.github/workflows/chromatic.yml`)
- Vitest browser integration via Playwright/Chromium

---

## [0.0.0-alpha.0] — 2026-02-XX

### Added
- Initial React 19 + TypeScript + Vite project scaffold
- Design tokens in `src/styles/tokens.css`
- ESLint + TypeScript strict config

---

[Unreleased]: https://github.com/orbit-sub/atoms/compare/v0.0.0...HEAD
[0.0.0]: https://github.com/orbit-sub/atoms/compare/v0.0.0-alpha.1...v0.0.0
[0.0.0-alpha.1]: https://github.com/orbit-sub/atoms/compare/v0.0.0-alpha.0...v0.0.0-alpha.1
[0.0.0-alpha.0]: https://github.com/orbit-sub/atoms/commits/2657ab7
