import { SITE_URL, SITE_NAME } from '../siteConfig';
import type { Location } from '../../data/contact';

export function courseSchema(locations: Location[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}/theorieunterricht#course`,
    name: 'Theorieunterricht für Fahrschüler',
    description:
      'Theoretische Fahrausbildung gemäß Fahrschüler-Ausbildungsordnung. 12 Themen Grundstoff plus klassenspezifische Zusatzthemen.',
    provider: {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
    },
    inLanguage: 'de',
    courseMode: 'onsite',
    educationalLevel: 'Berufsausbildung',
    hasCourseInstance: locations.map((loc) => ({
      '@type': 'CourseInstance',
      name: `Theorieunterricht ${loc.district}`,
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: loc.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: loc.address,
          postalCode: loc.postalCode,
          addressLocality: 'Ludwigsburg',
          addressCountry: 'DE',
        },
      },
      eventSchedule: {
        '@type': 'Schedule',
        byDay: loc.lessonDays.map((d) =>
          ({
            Montag: 'https://schema.org/Monday',
            Dienstag: 'https://schema.org/Tuesday',
            Mittwoch: 'https://schema.org/Wednesday',
            Donnerstag: 'https://schema.org/Thursday',
            Freitag: 'https://schema.org/Friday',
          })[d] ?? d,
        ),
        startTime: '19:00',
        endTime: '20:30',
        scheduleTimezone: 'Europe/Berlin',
      },
    })),
  };
}
