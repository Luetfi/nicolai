import { ListChecks } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Fact {
  label: string;
  value: string;
  /** Optionale Präzisierung in kleiner Schrift unter dem Wert. */
  hint?: string;
}

type FactPanelProps = {
  title?: string;
  facts: Fact[];
  icon?: LucideIcon;
  /** Fußnote, z. B. Quellenhinweis oder Einschränkung. */
  footnote?: string;
};

/**
 * „Auf den Punkt"-Faktenblock: Label/Wert-Paare als <dl>.
 *
 * Doppelter Zweck — Besucher überfliegen die harten Zahlen, und Suchmaschinen
 * wie KI-Dienste finden pro Zeile eine in sich geschlossene, zitierfähige
 * Aussage (Label liefert den Kontext, Wert die Antwort). Steht deshalb auf
 * jeder Themenseite weit oben.
 */
export function FactPanel({ title = 'Auf den Punkt', facts, icon: Icon = ListChecks, footnote }: FactPanelProps) {
  return (
    // @container: Das Label/Wert-Layout richtet sich nach der Breite des Panels,
    // nicht nach dem Viewport — in der schmalen Seitenspalte bleibt es gestapelt,
    // in einer breiten Spalte wird daraus eine zweispaltige Definitionsliste.
    <div className="relative @container">
      <div
        aria-hidden="true"
        className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-accent/15 rounded-3xl blur-xl opacity-70"
      />

      <div className="relative bg-secondary-light rounded-3xl border border-white/10 shadow-xl shadow-black/40 overflow-hidden">
        <div className="flex items-center gap-3 px-6 sm:px-8 py-5 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-b border-white/10">
          <Icon className="w-5 h-5 text-primary flex-shrink-0" />
          <h3 className="font-display text-2xl text-white tracking-wide">{title.toUpperCase()}</h3>
        </div>

        <dl className="divide-y divide-white/5">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="px-6 sm:px-8 py-4 @md:grid @md:grid-cols-[10rem_minmax(0,1fr)] @md:gap-6 @md:items-baseline"
            >
              <dt className="text-gray-400 text-xs font-semibold uppercase tracking-[0.12em] mb-1.5 @md:mb-0">
                {fact.label}
              </dt>
              <dd className="text-white font-semibold leading-snug">
                {fact.value}
                {fact.hint && (
                  <span className="block text-gray-400 text-sm font-normal mt-1">{fact.hint}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {footnote && (
          <p className="px-6 sm:px-8 py-4 border-t border-white/10 text-gray-500 text-sm">{footnote}</p>
        )}
      </div>
    </div>
  );
}
