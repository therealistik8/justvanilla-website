// Converts public/gallery screenshots to WebP and caps them at 2560px wide.
// Re-runnable: WebP files already within the cap are skipped, so there's no
// generation loss from running it twice. Drop new screenshots in and run it.
import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import { join, parse } from "node:path";

const DIR = "public/gallery";
const MAX_WIDTH = 2560; // ponytail: plenty for a lightbox on a 4K display; raise if you ever want true 4K downloads
const QUALITY = 88;

let before = 0;
let after = 0;

for (const file of readdirSync(DIR).sort()) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;

  const src = join(DIR, file);
  // An in-cap WebP is already done — reconverting would only lose quality.
  if (/\.webp$/i.test(file)) {
    const { width } = await sharp(src).metadata();
    if (width <= MAX_WIDTH) continue;
  }

  const dest = join(DIR, `${parse(file).name}.webp`);
  const tmp = `${dest}.tmp`;

  const srcSize = statSync(src).size;
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(tmp);

  if (src !== dest) unlinkSync(src); // no-op when a WebP is replaced in place
  renameSync(tmp, dest);

  const destSize = statSync(dest).size;
  before += srcSize;
  after += destSize;
  console.log(
    `${file} → ${parse(dest).base}  ${(srcSize / 1e6).toFixed(1)}MB → ${(destSize / 1e6).toFixed(1)}MB`,
  );
}

console.log(
  `\nTotal: ${(before / 1e6).toFixed(0)}MB → ${(after / 1e6).toFixed(0)}MB` +
    (before ? ` (${(100 - (after / before) * 100).toFixed(0)}% smaller)` : ""),
);
