import { existsSync, mkdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// Quelle für das Default-OG-Bild (1200×630, siehe DEFAULT_OG_IMAGE in src/seo/siteConfig.ts)
const SRC = resolve(projectRoot, 'public', 'images', 'hero', 'pkw.jpg');
const OUT_DIR = resolve(projectRoot, 'public', 'og');
const OUT = resolve(OUT_DIR, 'default.jpg');

if (!existsSync(SRC)) {
  console.error(`[og] source image missing: ${SRC}`);
  process.exit(1);
}

if (existsSync(OUT) && statSync(OUT).mtimeMs >= statSync(SRC).mtimeMs) {
  console.log('[og] up to date — skipped');
  process.exit(0);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

await sharp(SRC)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80 })
  .toFile(OUT);

console.log('[og] wrote public/og/default.jpg (1200x630)');
