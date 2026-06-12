# ahmedakram.com — v2

Personal site of **Ahmed Akram — AI Solutions Engineer & Architect** (Dubai).

Premium-dark single page built as an "engineering drawing set": six sheets —
control plane (hero), case files, lab, capabilities, revision history, contact.
The signature element is **The Dispatch**: a deterministic, scripted SVG trace
of a request moving through a multi-agent control plane (gateway → OIDC
identity → planner → research/synthesis/critique agents → eval gate → 200).

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion
- Fonts: Bricolage Grotesque / Public Sans / IBM Plex Mono via `next/font`
- Jest for the dispatch-trace logic (`src/lib/dispatch.ts`)
- Zero-config deploy on Vercel

## Commands

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # serve production build
npm test         # jest (dispatch trace logic)
npm run assets   # regenerate portrait + apple icon from sources
node scripts/screenshot.mjs  # screenshots into .artifacts/ (needs `next start -p 3010`)
```

## Quality floor (verified on the production build)

Lighthouse 95 / 100 / 100 / 100 (perf / a11y / best practices / SEO) ·
responsive 320px → 4K · `prefers-reduced-motion` renders every animation's
final frame · OpenGraph + Twitter card via the dynamic `/opengraph-image`
route · sitemap + robots.

## Notes

- Dark ("Night") is the default theme; the toggle persists "Day" in
  `localStorage` with a no-flash inline script in `layout.tsx`.
- `legacy-v1/` is the frozen, runnable archive of the previous site — see its
  README. `DESIGN_PLAN.md` records the design direction (REV 2.0 → 2.1).
- No secrets are used anywhere in this repo; `.gitignore` blocks `.env*`.
