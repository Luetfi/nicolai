import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');

const SITE_URL = 'https://fahrschule-nicolai.de';

// Single Source of Truth für Routen — siehe src/seo/routes.ts.
// Nur Routen mit llmsTitle landen in llms-full.txt (Rechtsseiten bleiben draußen).
const pages = JSON.parse(
  readFileSync(resolve(projectRoot, 'src/seo/routes.data.json'), 'utf8'),
)
  .filter((r) => r.llmsTitle)
  .map((r) => ({
    path: r.path,
    file: r.path === '/' ? 'index.html' : `${r.path.slice(1)}/index.html`,
    title: r.llmsTitle,
  }));

function extractMainText(html) {
  // Cut everything before <main> or <body> opening
  const startIdx = (() => {
    const m = html.search(/<main[\s>]/i);
    if (m >= 0) return m;
    const b = html.search(/<body[\s>]/i);
    return b >= 0 ? b : 0;
  })();
  let body = html.slice(startIdx);

  // Strip script, style, header, footer, svg, picture/source-tags
  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<source[^>]*>/gi, '');

  // Strip remaining tags but preserve whitespace
  let text = body.replace(/<[^>]+>/g, ' ');
  // Decode common entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  // Collapse whitespace
  return text.replace(/\s+/g, ' ').trim();
}

const sections = [];
sections.push(`# Fahrschule Nicolai — Vollständige Webseite`);
sections.push('');
sections.push(`> Familiengeführte Fahrschule in Ludwigsburg seit 1969. Standorte: Eglosheim und Grünbühl. PKW & Motorrad. Inhaber Ralf Nicolai.`);
sections.push('');

for (const page of pages) {
  const filePath = resolve(distDir, page.file);
  if (!existsSync(filePath)) {
    console.warn(`[llms-full] missing ${page.file}, skipping`);
    continue;
  }
  const html = readFileSync(filePath, 'utf8');
  const text = extractMainText(html);
  sections.push(`## ${page.title}`);
  sections.push(`Quelle: ${SITE_URL}${page.path === '/' ? '' : page.path}`);
  sections.push('');
  sections.push(text);
  sections.push('');
}

const output = sections.join('\n');
writeFileSync(resolve(distDir, 'llms-full.txt'), output, 'utf8');
console.log(`[llms-full] wrote ${output.length} bytes`);
