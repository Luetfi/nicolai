import { SITE_URL } from '../siteConfig';

export interface HowToStepInput {
  name: string;
  text: string;
}

/**
 * HowTo-Schema für Ablauf-Beschreibungen (z. B. „Führerschein machen in
 * 7 Schritten"). Google zeigt dafür keine Rich Results mehr, die Auszeichnung
 * bleibt aber die klarste maschinenlesbare Form einer Schrittfolge — genau die
 * Struktur, aus der KI-Antworten ihre Aufzählungen bauen.
 *
 * Die step-URLs zeigen auf die Anker der StepTimeline (#schritt-1 …).
 */
export function howToSchema(opts: {
  name: string;
  description: string;
  path: string;
  steps: HowToStepInput[];
  anchorPrefix?: string;
  /** ISO-8601-Dauer, z. B. 'P3M' für „etwa drei Monate". */
  totalTime?: string;
}): object {
  const { name, description, path, steps, anchorPrefix = 'schritt', totalTime } = opts;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}${path}#howto`,
    name,
    description,
    inLanguage: 'de',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${SITE_URL}${path}#${anchorPrefix}-${index + 1}`,
    })),
  };

  if (totalTime) schema.totalTime = totalTime;

  return schema;
}
