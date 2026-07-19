import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const SITE_URL = 'https://fahrschule-nicolai.de';

// Single Source of Truth für Routen — siehe src/seo/routes.ts
const routes = JSON.parse(
  readFileSync(resolve(projectRoot, 'src/seo/routes.data.json'), 'utf8'),
);

const lastmod = new Date().toISOString().slice(0, 10);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .filter((r) => r.indexable)
    .map(
      (r) =>
        `  <url>\n` +
        `    <loc>${SITE_URL}${r.path === '/' ? '' : r.path}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

const distDir = resolve(projectRoot, 'dist');
if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, 'sitemap.xml'), xml, 'utf8');

console.log(`[sitemap] wrote ${routes.filter((r) => r.indexable).length} URLs to dist/sitemap.xml`);
