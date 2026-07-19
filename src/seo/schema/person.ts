import { SITE_URL, SITE_NAME } from '../siteConfig';
import type { TeamMember } from '../../data/team';

export function personSchema(member: TeamMember): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/fahrschule#person-${member.id}`,
    name: member.name,
    jobTitle: member.role,
    worksFor: { '@id': `${SITE_URL}/#organization`, '@type': 'Organization', name: SITE_NAME },
  };

  if (member.description) schema.description = member.description;
  if (member.image) {
    schema.image = member.image.startsWith('http') ? member.image : `${SITE_URL}${member.image}`;
  }

  return schema;
}
