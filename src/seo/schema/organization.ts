import { SITE_URL, SITE_NAME } from '../siteConfig';
import { generalInfo, primaryPhoneTel, secondaryPhoneTel } from '../../data/contact';

export function organizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: 'Fahrschule Nicolai',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    email: generalInfo.email,
    telephone: primaryPhoneTel,
    foundingDate: '1969',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: primaryPhoneTel,
        contactType: 'customer service',
        areaServed: 'DE',
        availableLanguage: ['de'],
      },
      {
        '@type': 'ContactPoint',
        telephone: secondaryPhoneTel,
        contactType: 'customer service',
        areaServed: 'DE',
        availableLanguage: ['de'],
      },
    ],
    sameAs: [
      'https://www.fahrlehrerverband-bw.de/',
    ],
  };
}
