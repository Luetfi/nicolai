import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FaqItem } from '../../seo/schema/faq';

type FaqSectionProps = {
  title?: string;
  items: FaqItem[];
};

/**
 * FAQ-Accordion auf Basis nativer <details>/<summary>-Elemente:
 * Die Antworten stehen vollständig im (prerenderten) HTML — Crawler und
 * KI-Dienste lesen sie ohne JavaScript.
 */
export function FaqSection({ title = 'HÄUFIGE FRAGEN', items }: FaqSectionProps) {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Gut zu wissen</span>
            </div>
          </div>
          <h2 className="display-lg text-white">{title}</h2>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group bg-secondary-light rounded-2xl border border-white/10 open:border-primary/40 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-white font-semibold [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 -mt-1">
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
