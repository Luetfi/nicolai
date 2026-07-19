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
