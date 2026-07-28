import { CheckCircle } from 'lucide-react';

export interface CheckGroup {
  title: string;
  items: string[];
  tone?: 'primary' | 'accent' | 'green';
}

const ICON_TONE = {
  primary: 'text-primary',
  accent: 'text-accent',
  green: 'text-green-500',
} as const;

/**
 * Gruppierte Häkchen-Listen (Voraussetzungen, Unterlagen, Leistungsumfang).
 * Bleibt eine echte <ul> pro Gruppe — die Aufzählungen sind der Teil, den
 * Suchmaschinen und KI-Dienste am liebsten als Antwort übernehmen.
 */
export function CheckGrid({ groups }: { groups: CheckGroup[] }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        groups.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'
      } ${groups.length > 2 ? 'lg:grid-cols-3' : ''}`}
    >
      {groups.map((group) => (
        <div key={group.title} className="bg-secondary-light rounded-3xl border border-white/10 p-7">
          <h3 className="font-display text-2xl text-white mb-5 tracking-wide">
            {group.title.toUpperCase()}
          </h3>
          <ul className="space-y-3">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${ICON_TONE[group.tone ?? 'green']}`}
                />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
