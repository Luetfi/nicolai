import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type TopicSectionProps = {
  id?: string;
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  /** Sichtbare Überschrift — wird in Versalien gesetzt (Display-Font). */
  title?: string;
  /** Einleitender Satz unter der Überschrift. */
  lead?: string;
  /** `base` = bg-secondary, `alt` = leicht aufgehellt (Rhythmus zwischen Sektionen). */
  tone?: 'base' | 'alt';
  /** Schmalerer Textkorpus für Lesefluss (Prosa, FAQ-artige Abschnitte). */
  width?: 'wide' | 'narrow';
  align?: 'left' | 'center';
  /** Dekorativer Farbschimmer am Rand — sparsam einsetzen. */
  glow?: 'none' | 'primary' | 'accent';
  children: ReactNode;
};

/**
 * Einheitlicher Sektions-Rahmen für die Themen-/Ratgeberseiten
 * (Führerschein-Hub, Klasse B, Motorrad, ASF). Hält Abstände, Überschriften-
 * hierarchie und Hintergrund-Rhythmus über alle vier Seiten identisch.
 */
export function TopicSection({
  id,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  lead,
  tone = 'base',
  width = 'wide',
  align = 'left',
  glow = 'none',
  children,
}: TopicSectionProps) {
  const centered = align === 'center';

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 md:py-24 scroll-mt-28 ${
        tone === 'alt' ? 'bg-secondary-light/30' : 'bg-secondary'
      }`}
    >
      {glow === 'primary' && (
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[28rem] h-[28rem] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"
        />
      )}
      {glow === 'accent' && (
        <div
          aria-hidden="true"
          className="absolute -bottom-32 left-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"
        />
      )}

      <div
        className={`relative mx-auto px-4 sm:px-6 lg:px-8 ${
          width === 'narrow' ? 'max-w-3xl' : 'max-w-7xl'
        }`}
      >
        {(eyebrow || title || lead) && (
          <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {eyebrow && (
              <div className={`flex mb-5 ${centered ? 'justify-center' : ''}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                  {EyebrowIcon && <EyebrowIcon className="w-4 h-4 text-primary" />}
                  <span className="text-primary font-medium text-sm">{eyebrow}</span>
                </div>
              </div>
            )}
            {title && <h2 className="display-lg text-white">{title.toUpperCase()}</h2>}
            {lead && (
              <p
                className={`text-gray-300 text-lg leading-relaxed mt-5 ${
                  centered ? 'max-w-2xl mx-auto' : 'max-w-3xl'
                }`}
              >
                {lead}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

/**
 * Absatzfolge mit einheitlicher Typografie. Bewusst schmal gehalten —
 * lange Zeilen kosten Lesbarkeit und damit Verweildauer.
 */
export function Prose({ paragraphs, className = '' }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`space-y-5 ${className}`}>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 48)} className="text-gray-300 text-lg leading-relaxed">
          {text}
        </p>
      ))}
    </div>
  );
}
