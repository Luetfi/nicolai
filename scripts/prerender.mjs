import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import sirv from 'sirv';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');

const HOST = '127.0.0.1';
const PORT = 5050;

const STORAGE_KEY = 'nicolai_consent_v1';
const SCHEMA_VERSION = 1;
const CONSENT_RECORD = JSON.stringify({
  v: SCHEMA_VERSION,
  decidedAt: '2026-01-01T00:00:00.000Z',
  maps: false,
});

// Single Source of Truth für Routen — siehe src/seo/routes.ts
const routes = JSON.parse(
  readFileSync(resolve(projectRoot, 'src/seo/routes.data.json'), 'utf8'),
).map((r) => r.path);

if (!existsSync(distDir)) {
  console.error('[prerender] dist/ does not exist — run `vite build` first.');
  process.exit(1);
}

// Backup des Original-Shells, damit kein Lauf den nächsten kontaminiert
const originalShellPath = resolve(distDir, 'index.html');
const originalShell = readFileSync(originalShellPath, 'utf8');

const handler = sirv(distDir, { dev: false, single: true, etag: true });
const server = createServer(handler);
await new Promise((res) => server.listen(PORT, HOST, res));
console.log(`[prerender] static server up at http://${HOST}:${PORT}`);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

// Sammle alle gerenderten HTML, schreibe erst am Ende — verhindert
// dass der erste Schreibvorgang den Shell für die nächsten Routen kontaminiert.
const renderedPages = [];

try {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    await page.evaluateOnNewDocument(
      ({ key, value }) => {
        try {
          localStorage.setItem(key, value);
          window.__PRERENDER__ = true;
        } catch {
          /* noop */
        }
      },
      { key: STORAGE_KEY, value: CONSENT_RECORD },
    );

    const url = `http://${HOST}:${PORT}${route}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // 1. Warte bis React mountet (root hat Inhalt) UND Suspense-Fallback weg ist
    //    UND Helmet hat den Default-Title überschrieben.
    const DEFAULT_TITLE = 'Fahrschule Nicolai Ludwigsburg';
    await page
      .waitForFunction(
        (defaultTitle) => {
          const root = document.getElementById('root');
          if (!root || root.children.length === 0) return false;
          const fallback = document.querySelector(
            '[role="status"][aria-label="Inhalt wird geladen"]',
          );
          if (fallback) return false;
          return document.title.length > 0 && document.title !== defaultTitle;
        },
        { timeout: 15000 },
        DEFAULT_TITLE,
      )
      .catch(() => {});

    // Stabilisierungspause für nachgelagerte Helmet-Commits (z. B. JSON-LD scripts)
    await new Promise((r) => setTimeout(r, 500));

    const html = await page.content();
    const title = await page.title();

    if (html.includes('maps.google.com/maps?')) {
      console.warn(`[prerender] WARN: ${route} contains Google Maps iframe — consent gate failed!`);
    }

    renderedPages.push({ route, html, title });
    console.log(`[prerender] ${route} -> "${title}" (${html.length} bytes)`);
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((res) => server.close(res));
}

// Sicherheits-Restore des Original-Shells (für Fall, dass sirv/Puppeteer ihn beeinflusst hätte)
writeFileSync(originalShellPath, originalShell, 'utf8');

// Jetzt alle Pages persistieren
let written = 0;
for (const { route, html, title } of renderedPages) {
  const outDir = route === '/' ? distDir : resolve(distDir, route.slice(1));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'index.html');
  writeFileSync(outPath, html, 'utf8');
  written++;
  if (!title || title.length < 5) {
    console.warn(`[prerender] WARN: ${route} got short/missing title: "${title}"`);
  }
}

console.log(`[prerender] done — ${written} routes written.`);
