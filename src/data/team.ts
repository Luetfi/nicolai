export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'ronald',
    name: 'Ronald Nicolai',
    role: 'Inhaber & Fahrlehrer',
    description: 'Gründer und Inhaber der Fahrschule Nicolai. Mit jahrelanger Erfahrung und Leidenschaft für die Fahrausbildung.',
    image: '/images/team/ronald.jpg',
  },
  {
    id: 'nina',
    name: 'Nina Pfannenstiel',
    role: 'Fahrlehrerin',
    description: 'Erfahrene Fahrlehrerin mit besonderem Fokus auf eine entspannte und strukturierte Ausbildung.',
    image: '/images/team/nina.jpg',
  },
  {
    id: 'alexander',
    name: 'Alexander Krüger',
    role: 'Fahrlehrer',
    description: 'Kompetenter Fahrlehrer für PKW und Motorrad mit viel Geduld und Einfühlungsvermögen.',
    image: '/images/team/alexander.jpg',
  },
  {
    id: 'stefanie',
    name: 'Stefanie Müller',
    role: 'Fahrlehrerin',
    description: 'Engagierte Fahrlehrerin, die Wert auf eine sichere und praxisnahe Ausbildung legt.',
    image: '/images/team/stefanie.jpg',
  },
];
