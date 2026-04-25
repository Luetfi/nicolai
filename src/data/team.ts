export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  phone?: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'roland',
    name: 'Roland Nicolai',
    role: 'Fahrlehrer aller Klassen',
    description: 'Seit 1984 in der Fahrausbildung tätig. Moderator ASF.',
    image: '/images/team/roland.jpg',
  },
  {
    id: 'ralf',
    name: 'Ralf Nicolai',
    role: 'Fahrlehrer der Klassen A und B/BE',
    description: 'Seit 1981 in der Fahrausbildung tätig. Moderator ASF und FES, Ausbildungsfahrlehrer.',
    phone: '0170 / 21 38 547',
    image: '/images/team/ralf.jpg',
  },
  {
    id: 'maja',
    name: 'Maja Milovanovic',
    role: 'Fahrlehrerin der Klassen A, B/BE und C/CE',
    description: 'Seit 1999 in der Fahrausbildung tätig. Moderatorin ASF und FES, Ausbildungsfahrlehrerin.',
    phone: '0175 / 8642673',
    image: '/images/team/maja.jpg',
  },
  {
    id: 'alexander',
    name: 'Alexander Nicolai',
    role: 'Fahrlehrer der Klassen B/BE',
    description: '',
    phone: '0170 / 4925140',
    image: '/images/team/alexander.jpg',
  },
];
