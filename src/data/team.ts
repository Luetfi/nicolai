export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  phone?: string;
  image?: string;
}

export interface TeamFile {
  _updated: string;
  members: TeamMember[];
}
