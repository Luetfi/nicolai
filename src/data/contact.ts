export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  lessonDays: string[];
  lessonTime: string;
  infoTime?: string;
  mapQuery?: string;
}

export const locations: Location[] = [
  {
    id: 'eglosheim',
    name: 'Standort Eglosheim',
    address: 'Monreposstraße 2',
    city: '71634 Ludwigsburg-Eglosheim',
    phone: '0170 / 21 38 547',
    lessonDays: ['Montag', 'Donnerstag'],
    lessonTime: '19:00 – 20:30 Uhr',
    infoTime: 'Auskunft und Anmeldung: 18:00 – 19:00 Uhr',
  },
  {
    id: 'gruenbuehl',
    name: 'Standort Grünbühl',
    address: 'Netzestraße 31',
    city: '71638 Ludwigsburg-Grünbühl',
    phone: '0170 / 21 38 547',
    lessonDays: ['Dienstag', 'Donnerstag'],
    lessonTime: '19:00 – 20:30 Uhr',
    infoTime: 'Auskunft und Anmeldung: 18:00 – 19:00 Uhr',
    mapQuery: 'Netzestraße 31, 71638 Ludwigsburg, Deutschland',
  },
];

export const generalInfo = {
  email: 'fahrschule-ralf-nicolai@web.de',
  companyName: 'Fahrschule Nicolai',
  slogan: 'Dein Weg zum Führerschein!',
};
