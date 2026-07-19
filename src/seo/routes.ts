import routesData from './routes.data.json';

export interface SeoRoute {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  indexable: boolean;
  /** Überschrift der Seite in llms-full.txt — weglassen = Seite erscheint dort nicht (z. B. Rechtsseiten). */
  llmsTitle?: string;
}

/**
 * Single Source of Truth für alle Routen: src/seo/routes.data.json.
 * Wird auch von scripts/generate-sitemap.mjs, scripts/prerender.mjs und
 * scripts/generate-llms-full.mjs gelesen.
 *
 * Neue Route? → routes.data.json ergänzen UND in App.tsx + src/pages/index.ts registrieren.
 */
export const seoRoutes = routesData as SeoRoute[];
