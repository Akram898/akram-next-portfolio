/* One-time asset pipeline:
   - portrait-raw.png → src/assets/portrait.jpg
     (crops off the bottom strip carrying the generator watermark,
      centers to 4:5, resizes for the About sheet)
   - app/icon.svg → src/app/apple-icon.png (180×180) */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const RAW = path.join(root, "portrait-raw.png");
const OUT = path.join(root, "src", "assets", "portrait.jpg");

const meta = await sharp(RAW).metadata();
console.log(`portrait source: ${meta.width}x${meta.height}`);

// keep the top 82% (the watermark sits in the bottom strip), then 4:5
const keepH = Math.round(meta.height * 0.82);
const targetW = Math.min(meta.width, Math.round((keepH * 4) / 5));
const left = Math.round((meta.width - targetW) / 2);

await sharp(RAW)
  .extract({ left, top: 0, width: targetW, height: keepH })
  .resize({ width: 1080 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);
console.log(`portrait written: ${OUT}`);

const ICON = path.join(root, "src", "app", "icon.svg");
const APPLE = path.join(root, "src", "app", "apple-icon.png");
await sharp(ICON, { density: 300 }).resize(180, 180).png().toFile(APPLE);
console.log(`apple icon written: ${APPLE}`);
