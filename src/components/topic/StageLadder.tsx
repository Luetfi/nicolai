import { ChevronRight } from 'lucide-react';

export interface LadderStage {
  klasse: string;
  age: string;
  label: string;
  /** Bedingung für den Aufstieg auf die nächste Stufe. */
  step?: string;
}

/**
 * Stufen-Diagramm des Motorrad-Führerscheins (AM → A1 → A2 → A).
 *
 * Der Stufenaufstieg ist die Frage, die Interessenten am häufigsten stellen
 * und die sich in Prosa schlecht erklärt. Horizontal auf großen Schirmen,
 * vertikal auf dem Handy — semantisch eine geordnete Liste.
 */
export function StageLadder({ stages }: { stages: LadderStage[] }) {
  return (
    <ol className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-0">
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
        return (
          <li key={stage.klasse} className="flex-1 flex flex-col lg:flex-row lg:items-stretch">
            <div className="flex-1 relative bg-secondary-light rounded-2xl border border-white/10 p-6 text-center overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40"
                style={{ opacity: 0.4 + index * 0.2 }}
              />

              <span className="font-display text-5xl text-white leading-none block mb-2">
                {stage.klasse}
              </span>
              <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wide mb-3">
                {stage.age}
              </span>
              <p className="text-gray-300 text-sm leading-relaxed">{stage.label}</p>
            </div>

            {!isLast && (
              <div className="flex items-center justify-center py-1 lg:py-0 lg:px-3">
                <div className="flex lg:flex-col items-center gap-2 text-center">
                  <ChevronRight
                    aria-hidden="true"
                    className="w-6 h-6 text-accent rotate-90 lg:rotate-0 flex-shrink-0"
                  />
                  {stage.step && (
                    <span className="text-gray-400 text-xs leading-tight lg:max-w-[6.5rem]">
                      {stage.step}
                    </span>
                  )}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
