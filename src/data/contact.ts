export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  lessonDays: string[];
  lessonTime: string;
  mapQuery?: string;
}

export const locations: Location[] = [
  {
    id: 'eglosheim',
    name: 'Standort Eglosheim',
    address: 'Monreposstraße 4',
    city: '71634 Ludwigsburg-Eglosheim',
    phone: '0171 / 38 58 010',
    lessonDays: ['Montag', 'Donnerstag'],
    lessonTime: '18:30 - 20:00 Uhr',
  },
  {
    id: 'gruenbuehl',
    name: 'Standort Grünbühl',
    address: 'Neckarweihinger Str. 21',
    city: 'Ludwigsburg-Grünbühl',
    phone: '0171 / 38 64 631',
    lessonDays: ['Dienstag', 'Donnerstag'],
    lessonTime: '18:30 - 20:00 Uhr',
    mapQuery: 'Neckarweihinger Straße 21, Ludwigsburg, Deutschland',
  },
];

export const generalInfo = {
  email: 'fahrschule-ralf-nicolai@web.de',
  companyName: 'Fahrschule Nicolai',
  slogan: 'Dein Weg zum Führerschein!',
};
