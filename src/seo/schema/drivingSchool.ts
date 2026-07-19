import { SITE_URL, SITE_NAME, GBP_RATING_AVG, GBP_RATING_COUNT } from '../siteConfig';
import { generalInfo } from '../../data/contact';
import type { Location } from '../../data/contact';

const WEEKDAY_TO_SCHEMA: Record<string, string> = {
  Montag: 'Monday',
  Dienstag: 'Tuesday',
  Mittwoch: 'Wednesday',
  Donnerstag: 'Thursday',
  Freitag: 'Friday',
  Samstag: 'Saturday',
  Sonntag: 'Sunday',
};

function parseLessonHours(lessonTime: string): { opens: string; closes: string } | null {
  // "19:00 – 20:30 Uhr" oder "19:00 - 20:30 Uhr"
  const m = lessonTime.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
  if (!m) return null;
  return { opens: m[1], closes: m[2] };
}

export function drivingSchoolSchema(loc: Location): object {
  const hours = parseLessonHours(loc.lessonTime);
  const dayOfWeek = loc.lessonDays
    .map((d) => WEEKDAY_TO_SCHEMA[d])
    .filter(Boolean);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'DrivingSchool',
    '@id': `${SITE_URL}/#location-${loc.id}`,
    name: `${SITE_NAME} – ${loc.district}`,
    url: `${SITE_URL}${loc.landingPath}`,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${loc.address}, ${loc.postalCode} Ludwigsburg`,
    )}`,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    image: `${SITE_URL}/images/logo.png`,
    telephone: loc.phoneTel,
    email: generalInfo.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      postalCode: loc.postalCode,
      addressLocality: 'Ludwigsburg',
      addressRegion: 'BW',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    areaServed: [
      'Ludwigsburg',
      'Eglosheim',
      'Grünbühl',
      'Asperg',
      'Möglingen',
      'Kornwestheim',
      'Bietigheim-Bissingen',
      'Tamm',
      'Pflugfelden',
      'Hoheneck',
    ],
  };

  if (hours && dayOfWeek.length > 0) {
    schema.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek,
        opens: hours.opens,
        closes: hours.closes,
      },
    ];
  }

  if (loc.googleMapsProfileUrl) {
    schema.sameAs = [loc.googleMapsProfileUrl];
  }

  if (GBP_RATING_AVG && GBP_RATING_COUNT) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: GBP_RATING_AVG,
      reviewCount: GBP_RATING_COUNT,
    };
  }

  return schema;
}
