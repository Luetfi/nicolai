import { SITE_URL, SITE_NAME } from '../siteConfig';
import { locations } from '../../data/contact';

/**
 * Course-Schema für das ASF-Aufbauseminar.
 *
 * Der konkrete Kurstermin ist die Angabe, nach der Betroffene suchen („nächster
 * ASF-Kurs Ludwigsburg") — als CourseInstance mit startDate und Ort ist sie für
 * Suchmaschinen und KI-Dienste eindeutig auslesbar.
 *
 * `instance` nur übergeben, wenn der Termin auch sichtbar auf der Seite steht —
 * strukturierte Daten dürfen nichts behaupten, was die Seite nicht zeigt.
 *
 * Bewusst ohne Offer/Preis: Auf der Website werden keine Preise ausgewiesen,
 * also darf auch das Schema keinen nennen.
 */
export function asfSeminarSchema(opts: {
  path: string;
  instance?: {
    startDate: string;
  };
}): object {
  const { path, instance } = opts;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}${path}#asf`,
    name: 'ASF-Aufbauseminar für Fahranfänger',
    description:
      'Aufbauseminar für Fahranfänger (ASF) nach § 2b Straßenverkehrsgesetz: vier Sitzungen à 135 Minuten sowie eine Beobachtungsfahrt von mindestens 30 Minuten. Pflicht nach einem schwerwiegenden oder zwei weniger schwerwiegenden Verstößen in der Probezeit.',
    url: `${SITE_URL}${path}`,
    inLanguage: 'de',
    courseMode: 'onsite',
    teaches:
      'Erkennen eigener Risikofaktoren im Straßenverkehr, Auswertung des eigenen Fahrverhaltens, Vermeidung von Wiederholungsverstößen',
    provider: {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
    },
  };

  if (instance) {
    const location = locations[0];
    const courseInstance: Record<string, unknown> = {
      '@type': 'CourseInstance',
      name: 'ASF-Aufbauseminar in Ludwigsburg',
      courseMode: 'onsite',
      startDate: instance.startDate,
      courseWorkload: 'PT9H',
      location: {
        '@type': 'Place',
        name: location.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.address,
          postalCode: location.postalCode,
          addressLocality: 'Ludwigsburg',
          addressCountry: 'DE',
        },
      },
    };

    schema.hasCourseInstance = courseInstance;
  }

  return schema;
}
