import { readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const imagesDir = resolve(projectRoot, 'public', 'images');

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png']);
const QUALITY = 75;

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let generated = 0;
let skipped = 0;
let failed = 0;

for (const file of walk(imagesDir)) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) continue;
  const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');

  if (existsSync(webpPath)) {
    const srcMtime = statSync(file).mtimeMs;
    const dstMtime = statSync(webpPath).mtimeMs;
    if (dstMtime >= srcMtime) {
      skipped++;
      continue;
    }
  }

  try {
    await sharp(file).webp({ quality: QUALITY }).toFile(webpPath);
    generated++;
    console.log(`[webp] ${file.replace(projectRoot, '.')} -> ${webpPath.replace(projectRoot, '.')}`);
  } catch (err) {
    failed++;
    console.warn(`[webp] FAILED ${file}: ${err.message}`);
  }
}

console.log(`[webp] done — generated: ${generated}, skipped: ${skipped}, failed: ${failed}`);
