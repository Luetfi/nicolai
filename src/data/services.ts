export interface LicenseClass {
  id: string;
  name: string;
  title: string;
  description: string;
  requirements: string[];
  minAge: number;
  category: 'pkw' | 'motorrad' | 'sonstige';
  icon: string;
}

export const licenseClasses: LicenseClass[] = [
  // PKW
  {
    id: 'b',
    name: 'B',
    title: 'PKW-Führerschein',
    description: 'Der Klassiker: Kraftfahrzeuge bis 3,5 t zulässiger Gesamtmasse und nicht mehr als 8 Sitzplätze außer dem Führersitz.',
    requirements: [
      'Mindestalter 18 Jahre (17 Jahre bei BF17)',
      'Erste-Hilfe-Kurs',
      'Sehtest',
      'Passbild',
    ],
    minAge: 17,
    category: 'pkw',
    icon: 'Car',
  },
  {
    id: 'be',
    name: 'BE',
    title: 'PKW mit Anhänger',
    description: 'Kombination aus Klasse B und Anhänger über 750 kg zulässiger Gesamtmasse.',
    requirements: [
      'Vorbesitz Klasse B',
      'Keine theoretische Prüfung erforderlich',
      'Praktische Prüfung',
    ],
    minAge: 18,
    category: 'pkw',
    icon: 'CarTaxiFront',
  },
  {
    id: 'b96',
    name: 'B96',
    title: 'B96 Schlüsselzahl',
    description: 'Erweiterung der Klasse B für Fahrzeugkombinationen über 3.500 kg bis 4.250 kg zulässiger Gesamtmasse.',
    requirements: [
      'Vorbesitz Klasse B',
      'Nur Schulung erforderlich',
      'Keine Prüfung',
    ],
    minAge: 18,
    category: 'pkw',
    icon: 'Truck',
  },
  // Motorrad
  {
    id: 'a',
    name: 'A',
    title: 'Motorrad unbeschränkt',
    description: 'Krafträder ohne Leistungsbeschränkung. Für alle, die das Fahren ohne Limits erleben wollen.',
    requirements: [
      'Mindestalter 24 Jahre (20 Jahre bei Vorbesitz A2)',
      'Erste-Hilfe-Kurs',
      'Sehtest',
      'Passbild',
    ],
    minAge: 24,
    category: 'motorrad',
    icon: 'Bike',
  },
  {
    id: 'a2',
    name: 'A2',
    title: 'Motorrad bis 35 kW',
    description: 'Krafträder bis 35 kW Leistung. Der perfekte Einstieg in die Welt der großen Motorräder.',
    requirements: [
      'Mindestalter 18 Jahre',
      'Erste-Hilfe-Kurs',
      'Sehtest',
      'Passbild',
    ],
    minAge: 18,
    category: 'motorrad',
    icon: 'Bike',
  },
  {
    id: 'a1',
    name: 'A1',
    title: 'Leichtkrafträder bis 125ccm',
    description: 'Krafträder bis 125 ccm und 11 kW Leistung. Ideal für den frühen Einstieg.',
    requirements: [
      'Mindestalter 16 Jahre',
      'Erste-Hilfe-Kurs',
      'Sehtest',
      'Passbild',
    ],
    minAge: 16,
    category: 'motorrad',
    icon: 'Bike',
  },
  {
    id: 'am',
    name: 'AM',
    title: 'Moped / Roller',
    description: 'Kleinkrafträder bis 45 km/h und 50 ccm. Der erste Schritt zur Mobilität.',
    requirements: [
      'Mindestalter 15 Jahre',
      'Erste-Hilfe-Kurs',
      'Sehtest',
      'Passbild',
    ],
    minAge: 15,
    category: 'motorrad',
    icon: 'Bike',
  },
];

export interface SpecialService {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface UpcomingCourse {
  id: string;
  title: string;
  type: string;
  startDate: string;
  price: string;
  spotsAvailable: boolean;
  contactPhone: string;
  contactEmail: string;
}

export const nextAsfCourse: UpcomingCourse = {
  id: 'asf-next',
  title: 'Aufbauseminar',
  type: 'ASF-Kurs',
  startDate: '2026-05-15',
  price: '330,- Euro',
  spotsAvailable: true,
  contactPhone: '0170 2138547',
  contactEmail: 'fahrschule-ralf-nicolai@web.de',
};

export const specialServices: SpecialService[] = [
  {
    id: 'asf',
    title: 'Aufbauseminar (ASF)',
    description: 'Für Fahranfänger in der Probezeit bei Verkehrsverstößen.',
    details: [
      'Pflicht bei Auffälligkeiten in der Probezeit',
      '4 Sitzungen zu je 135 Minuten',
      'Beobachtungsfahrt zwischen 3. und 4. Sitzung',
      'Gruppenseminar mit 6-12 Teilnehmern',
    ],
  },
  {
    id: 'zweirad',
    title: 'Spezialunterricht Zweirad',
    description: 'Spezielle Ausbildung für Motorrad und Roller.',
    details: [
      'Grundfahrübungen auf dem Übungsplatz',
      'Übungen in Schrittgeschwindigkeit',
      'Slalom und Ausweichübungen',
      'Gefahrenbremsung',
    ],
  },
];
