# Legacy v1 — Archived Portfolio (ahmedakram.com)

This folder is a frozen, runnable archive of the original one-page portfolio
site that was deployed at **ahmedakram.com** before the v2 redesign.
Nothing in here is maintained — it exists for reference and rollback only.

## What it is

- Next.js 12 (Pages Router), React 17
- styled-components + SASS, `ityped` typing animation
- Single page: Hero → animated background → Projects grid → About/Technologies → Contact → Footer

## Run it

```bash
cd legacy-v1
npm install
npm run dev   # http://localhost:3000
```

Requires Node 18 (see `engines` in package.json). `npm run build` uses the
deprecated `next export` flow and outputs a static site to `out/`.

## Notes

- `node_modules`, `.next`, and `.git` were intentionally not copied.
- Some content was inherited from the tutorial template this site was built
  from (e.g., the timeline data in `src/constants/constants.js`) and was never
  accurate — do not reuse it.
- The original README contained only a title and a screenshot link; the
  screenshot was hosted externally at https://i.ibb.co/WgPMpts/image.png
