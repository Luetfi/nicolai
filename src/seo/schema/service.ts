import { SITE_URL, SITE_NAME } from '../siteConfig';
import type { LicenseClass } from '../../data/services';

export function serviceSchema(cls: LicenseClass): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/leistungen#service-${cls.id}`,
    name: `Führerschein Klasse ${cls.name} – ${cls.title}`,
    description: cls.description,
    serviceType: cls.category === 'pkw' ? 'PKW-Führerschein' : 'Motorrad-Führerschein',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: {
      '@type': 'City',
      name: 'Ludwigsburg',
    },
    audience: {
      '@type': 'Audience',
      audienceType: `Mindestalter ${cls.minAge} Jahre`,
    },
    brand: { '@type': 'Brand', name: SITE_NAME },
  };
}

export function servicesListSchema(classes: LicenseClass[]): object[] {
  return classes.map(serviceSchema);
}

/**
 * Service-Schema für eine eigenständige Themenseite (Klasse B, Motorrad, ASF).
 *
 * Anders als serviceSchema() hängt die @id an der jeweiligen Seite statt an
 * /leistungen — so bleibt pro URL genau eine Service-Entität.
 *
 * Bewusst ohne Offer/Preis: Auf der Website werden keine Preise ausgewiesen,
 * also darf auch das Schema keinen nennen.
 */
export function pageServiceSchema(opts: {
  /** Fragment der @id, z. B. 'klasse-b'. */
  slug: string;
  path: string;
  name: string;
  description: string;
  serviceType: string;
  /** z. B. 'Mindestalter 18 Jahre' oder 'Fahranfänger in der Probezeit'. */
  audienceType?: string;
  /** Zusätzliche Orte im Einzugsgebiet. */
  alsoServed?: string[];
}): object {
  const { slug, path, name, description, serviceType, audienceType, alsoServed } = opts;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service-${slug}`,
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Ludwigsburg' },
      ...(alsoServed ?? []).map((place) => ({ '@type': 'Place', name: place })),
    ],
    brand: { '@type': 'Brand', name: SITE_NAME },
  };

  if (audienceType) {
    schema.audience = { '@type': 'Audience', audienceType };
  }

  return schema;
}
