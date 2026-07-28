export interface Step {
  title: string;
  body: string;
  /** Kurzer Zusatzhinweis, wird abgesetzt dargestellt. */
  note?: string;
}

type StepTimelineProps = {
  steps: Step[];
  /** Präfix für die Anker-IDs — ermöglicht Deep-Links wie #schritt-3. */
  anchorPrefix?: string;
};

/**
 * Nummerierte Ablauf-Timeline mit konturierten Display-Ziffern.
 *
 * Semantisch eine <ol> — die Reihenfolge ist Teil der Information, und
 * Suchmaschinen wie KI-Dienste lesen die Schritte dadurch als Sequenz
 * (passend zum HowTo-Schema derselben Seite).
 */
/**
 * minmax(0,1fr) statt 1fr: `1fr` entspricht `minmax(auto, 1fr)` und kann nicht
 * unter die Min-Content-Breite schrumpfen — lange Wörter wie
 * „FAHRERLAUBNISBEHÖRDE" würden auf schmalen Displays aus dem Layout ragen.
 */
const ROW_CLASS =
  'relative grid grid-cols-[3.25rem_minmax(0,1fr)] sm:grid-cols-[5rem_minmax(0,1fr)] gap-5 sm:gap-8 pb-10 last:pb-0 scroll-mt-28';

export function StepTimeline({ steps, anchorPrefix = 'schritt' }: StepTimelineProps) {
  return (
    <ol className="relative">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} id={`${anchorPrefix}-${index + 1}`} className={ROW_CLASS}>
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[1.55rem] sm:left-[2.4rem] top-12 sm:top-14 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-white/5"
              />
            )}

            <div className="flex justify-center">
              <span
                aria-hidden="true"
                className="font-display text-4xl sm:text-5xl leading-none text-stroke select-none"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="pt-1">
              <h3 className="font-display text-2xl text-white mb-2 tracking-wide break-words hyphens-auto">
                {step.title.toUpperCase()}
              </h3>
              <p className="text-gray-300 leading-relaxed">{step.body}</p>
              {step.note && (
                <p className="mt-3 inline-block rounded-xl bg-primary/10 border border-primary/20 px-4 py-2 text-primary text-sm">
                  {step.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
