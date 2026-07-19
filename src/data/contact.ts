export interface Geo {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  district: string;
  city: string;
  phone: string;
  phoneTel: string;
  lessonDays: string[];
  lessonTime: string;
  infoTime?: string;
  mapQuery?: string;
  geo: Geo;
  /** Pfad der Standort-Landingpage (Linkziel des Google-Unternehmensprofils). */
  landingPath: string;
  /** Google-Review-Link (https://search.google.com/local/writereview?placeid=…) — UI rendert Review-CTAs nur, wenn gesetzt. */
  googleReviewUrl?: string;
  /** Öffentliche Google-Maps-Profil-URL des Standorts (für sameAs im Schema). */
  googleMapsProfileUrl?: string;
}

export const primaryPhoneTel = '+491702138547';
export const primaryPhoneDisplay = '0170 / 21 38 547';
export const secondaryPhoneTel = '+497141378955';
export const secondaryPhoneDisplay = '07141 / 37 89 55';

// Administrative Adresse (Impressum / nicht öffentlich für Unterricht)
export const adminAddress = {
  street: 'Hecklestraße 16',
  postalCode: '71634',
  city: 'Ludwigsburg',
};

/**
 * Konvertiert eine deutsche Telefonnummer in E.164-Format für tel:-href.
 * Akzeptiert "0170 / 21 38 547", "07141-378955", "+49 170 …" usw.
 */
export function toTelHref(humanPhone: string): string {
  const digits = humanPhone.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return `tel:${digits}`;
  if (digits.startsWith('00')) return `tel:+${digits.slice(2)}`;
  if (digits.startsWith('0')) return `tel:+49${digits.slice(1)}`;
  return `tel:${digits}`;
}

export const locations: Location[] = [
  {
    id: 'eglosheim',
    name: 'Standort Eglosheim',
    address: 'Monreposstraße 2',
    postalCode: '71634',
    district: 'Eglosheim',
    city: '71634 Ludwigsburg-Eglosheim',
    phone: primaryPhoneDisplay,
    phoneTel: primaryPhoneTel,
    lessonDays: ['Montag', 'Donnerstag'],
    lessonTime: '19:00 – 20:30 Uhr',
    infoTime: 'Auskunft und Anmeldung: 18:00 – 19:00 Uhr',
    geo: { lat: 48.9124, lng: 9.1695 },
    landingPath: '/fahrschule-ludwigsburg-eglosheim',
    // TODO: Review-Link aus dem GBP-Profil eintragen, sobald vorhanden:
    // googleReviewUrl: 'https://search.google.com/local/writereview?placeid=<PLACE_ID_EGLOSHEIM>',
    // googleMapsProfileUrl: 'https://maps.google.com/?cid=<CID_EGLOSHEIM>',
  },
  {
    id: 'gruenbuehl',
    name: 'Standort Grünbühl',
    address: 'Netzestraße 31',
    postalCode: '71638',
    district: 'Grünbühl',
    city: '71638 Ludwigsburg-Grünbühl',
    phone: primaryPhoneDisplay,
    phoneTel: primaryPhoneTel,
    lessonDays: ['Dienstag', 'Donnerstag'],
    lessonTime: '19:00 – 20:30 Uhr',
    infoTime: 'Auskunft und Anmeldung: 18:00 – 19:00 Uhr',
    mapQuery: 'Netzestraße 31, 71638 Ludwigsburg, Deutschland',
    geo: { lat: 48.8794, lng: 9.2181 },
    landingPath: '/fahrschule-ludwigsburg-gruenbuehl',
    // TODO: Review-Link aus dem GBP-Profil eintragen, sobald vorhanden:
    // googleReviewUrl: 'https://search.google.com/local/writereview?placeid=<PLACE_ID_GRUENBUEHL>',
    // googleMapsProfileUrl: 'https://maps.google.com/?cid=<CID_GRUENBUEHL>',
  },
];

export const generalInfo = {
  email: 'fahrschule-ralf-nicolai@web.de',
  companyName: 'Fahrschule Nicolai',
  slogan: 'Dein Weg zum Führerschein!',
};
