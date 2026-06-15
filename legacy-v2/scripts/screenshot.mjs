/* Screenshots for the self-critique pass. Not part of the build. */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, ".artifacts");
mkdirSync(out, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3010";

const shots = [
  { name: "desktop-hero", width: 1440, height: 900, fullPage: false, waitMs: 6500 },
  { name: "desktop-full", width: 1440, height: 900, fullPage: true, waitMs: 6500 },
  { name: "mobile-hero", width: 390, height: 844, fullPage: false, waitMs: 6500 },
  { name: "mobile-full", width: 390, height: 844, fullPage: true, waitMs: 6500 },
  { name: "tiny-320", width: 320, height: 700, fullPage: true, waitMs: 6500 },
];

const browser = await chromium.launch();
for (const s of shots) {
  // full-page shots run with reduced motion: scroll reveals and the
  // dispatch render their final frame statically (which also verifies
  // the prefers-reduced-motion path); viewport shots keep motion on.
  const page = await browser.newPage({
    viewport: { width: s.width, height: s.height },
    reducedMotion: s.fullPage ? "reduce" : "no-preference",
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(s.fullPage ? 1500 : s.waitMs);
  await page.screenshot({ path: path.join(out, `${s.name}.png`), fullPage: s.fullPage });
  console.log(`saved ${s.name}.png`);
  await page.close();
}
await browser.close();
