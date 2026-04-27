import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type PageHeroProps = {
  crumb: string;
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: ReactNode;
  subtitle?: string;
};

export function PageHero({
  crumb,
  eyebrow,
  eyebrowIcon: EyebrowIcon = Sparkles,
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-secondary pt-40 md:pt-48 pb-20 md:pb-24 min-h-[26rem] md:min-h-[34rem] flex items-center">
      <img
        src="/images/hero/breadcrumb.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center scale-105 motion-safe:animate-[ken-burns_20s_ease-in-out_infinite_alternate]"
      />

      <div className="absolute inset-0 -z-10 bg-secondary/40 mix-blend-multiply" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/95 via-secondary/55 to-secondary" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary/90 via-transparent to-secondary/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 diagonal-stripes opacity-20" />

      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-2/3 h-[2px] -z-10 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute top-1/3 right-[12%] w-2 h-2 -z-10 bg-primary rounded-full animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 left-[15%] w-1.5 h-1.5 -z-10 bg-accent rounded-full animate-pulse-glow animation-delay-300"
      />

      <div className="absolute bottom-0 inset-x-0 h-24 -z-10 bg-gradient-to-t from-secondary to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <nav aria-label="Breadcrumb" className="mb-8 animate-fade-in">
          <ol className="flex items-center justify-center gap-2 text-sm font-medium tracking-[0.15em] uppercase">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Startseite
              </Link>
            </li>
            <li aria-hidden="true" className="text-primary/60 flex items-center">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li aria-current="page" className="text-primary">
              {crumb}
            </li>
          </ol>
        </nav>

        {eyebrow && (
          <div className="flex justify-center mb-6 animate-slide-in-up animation-delay-100">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <EyebrowIcon className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">{eyebrow}</span>
            </div>
          </div>
        )}

        <h1 className="display-xl text-white mb-6 text-center animate-slide-in-up animation-delay-200">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center animate-slide-in-up animation-delay-300">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
