import { SITE_URL, SITE_NAME } from '../siteConfig';

export function websiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'de-DE',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
