import { Link } from 'react-router-dom';
import { Phone, ClipboardCheck, ArrowRight } from 'lucide-react';
import { primaryPhoneDisplay, primaryPhoneTel } from '../../data/contact';

type TopicCtaProps = {
  title: string;
  subtitle: string;
  /** Ziel des Anmelde-Buttons — erlaubt Vorauswahl der Klasse im Formular. */
  signupTo?: string;
  signupLabel?: string;
};

/** Abschluss-CTA der Themenseiten: Anruf und Online-Anmeldung gleichrangig. */
export function TopicCta({
  title,
  subtitle,
  signupTo = '/kontakt#anmeldung',
  signupLabel = 'Online anmelden',
}: TopicCtaProps) {
  return (
    <section className="relative overflow-hidden py-24 bg-secondary">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-0 diagonal-stripes opacity-30" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="display-lg text-white mb-5">{title.toUpperCase()}</h2>
        <p className="text-gray-300 text-lg mb-10">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${primaryPhoneTel}`}
            className="inline-flex items-center gap-3 btn-primary text-secondary px-8 py-4 rounded-2xl font-bold text-lg"
          >
            <Phone className="w-5 h-5" />
            {primaryPhoneDisplay}
          </a>
          <Link
            to={signupTo}
            className="inline-flex items-center gap-3 btn-accent text-white px-8 py-4 rounded-2xl font-bold text-lg group"
          >
            <ClipboardCheck className="w-5 h-5" />
            {signupLabel}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
