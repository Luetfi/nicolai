import { useEffect, useRef, useState } from 'react';
import { Car, Bike, AlertTriangle, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common';
import { licenseClasses, specialServices } from '../data/services';

function useCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState<'start' | 'end'>('start');

  const scrollByCard = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const scrollToSide = (target: 'start' | 'end') => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: target === 'start' ? 0 : el.scrollWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      setSide(el.scrollLeft / max > 0.5 ? 'end' : 'start');
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return { ref, side, scrollByCard, scrollToSide };
}

export function Leistungen() {
  const pkwClasses = licenseClasses.filter((c) => c.category === 'pkw');
  const motorradClasses = licenseClasses.filter((c) => c.category === 'motorrad');

  const pkw = useCarousel();
  const moto = useCarousel();

  return (
    <>
      <PageHero
        crumb="Leistungen"
        title={<>UNSERE <span className="gradient-text">LEISTUNGEN</span></>}
        subtitle="Von PKW bis Motorrad - wir bieten dir die komplette Führerscheinausbildung"
      />

      {/* PKW Section */}
      <section id="pkw" className="py-24 bg-secondary relative scroll-mt-24">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="display-md text-white">PKW-FÜHRERSCHEINE</h2>
              <p className="text-gray-300">Dein Einstieg in die Mobilität</p>
            </div>
          </div>

          <div className="relative">
            <div
              ref={pkw.ref}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
            >
              {pkwClasses.map((license, index) => (
                <div
                  key={license.id}
                  data-card
                  className="snap-start shrink-0 basis-[88%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  <div className="relative bg-secondary-light rounded-3xl p-8 shadow-xl shadow-black/40 h-full card-hover border border-white/10 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="font-display text-4xl text-white">{license.name}</span>
                      </div>
                      <span className="px-4 py-2 bg-blue-500/15 text-blue-300 text-sm font-semibold rounded-full">
                        ab {license.minAge} Jahren
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-white mb-2">{license.title}</h3>
                    <p className="text-gray-300 mb-6">{license.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                        Voraussetzungen
                      </h4>
                      <ul className="space-y-2">
                        {license.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to={`/kontakt?klasse=${license.name}#anmeldung`}
                      className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-5 py-3 rounded-xl font-bold transition-all group/btn"
                    >
                      Jetzt anmelden
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => pkw.scrollByCard(-1)}
              aria-label="Vorherige Klasse"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 rounded-full bg-secondary-light/90 backdrop-blur border border-white/10 text-white items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 transition-colors z-10 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => pkw.scrollByCard(1)}
              aria-label="Nächste Klasse"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 rounded-full bg-secondary-light/90 backdrop-blur border border-white/10 text-white items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 transition-colors z-10 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => pkw.scrollToSide('start')}
                aria-label="Zum Anfang"
                className={`h-2 rounded-full transition-all ${
                  pkw.side === 'start' ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
              <button
                type="button"
                onClick={() => pkw.scrollToSide('end')}
                aria-label="Zum Ende"
                className={`h-2 rounded-full transition-all ${
                  pkw.side === 'end' ? 'w-8 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Motorrad Section */}
      <section id="motorrad" className="py-24 bg-secondary relative scroll-mt-24">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
              <Bike className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="display-md text-white">MOTORRAD-FÜHRERSCHEINE</h2>
              <p className="text-gray-300">Freiheit auf zwei Rädern</p>
            </div>
          </div>

          <div className="relative">
            <div
              ref={moto.ref}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
            >
              {motorradClasses.map((license, index) => (
                <div
                  key={license.id}
                  data-card
                  className="snap-start shrink-0 basis-[88%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-orange-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  <div className="relative bg-secondary-light rounded-3xl p-6 shadow-xl shadow-black/40 h-full card-hover border border-white/10 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="font-display text-3xl text-white">{license.name}</span>
                      </div>
                      <span className="px-3 py-1.5 bg-accent/15 text-accent text-xs font-semibold rounded-full">
                        ab {license.minAge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl text-white mb-2">{license.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{license.description}</p>

                    <div className="mb-5">
                      <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                        Voraussetzungen
                      </h4>
                      <ul className="space-y-1.5">
                        {license.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-xs">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to={`/kontakt?klasse=${license.name}#anmeldung`}
                      className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-accent to-orange-600 hover:from-accent-dark hover:to-orange-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all group/btn"
                    >
                      Jetzt anmelden
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => moto.scrollByCard(-1)}
              aria-label="Vorherige Klasse"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 rounded-full bg-secondary-light/90 backdrop-blur border border-white/10 text-white items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition-colors z-10 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => moto.scrollByCard(1)}
              aria-label="Nächste Klasse"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 rounded-full bg-secondary-light/90 backdrop-blur border border-white/10 text-white items-center justify-center hover:bg-accent/20 hover:border-accent/40 transition-colors z-10 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => moto.scrollToSide('start')}
                aria-label="Zum Anfang"
                className={`h-2 rounded-full transition-all ${
                  moto.side === 'start' ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
              <button
                type="button"
                onClick={() => moto.scrollToSide('end')}
                aria-label="Zum Ende"
                className={`h-2 rounded-full transition-all ${
                  moto.side === 'end' ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-24 bg-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="display-md text-white">ZUSATZANGEBOTE</h2>
              <p className="text-gray-300">Seminare und Spezialtraining</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialServices.map((service, index) => (
              <div
                key={service.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative bg-secondary-light rounded-3xl p-10 shadow-xl shadow-black/40 h-full card-hover border border-white/10">
                  <h3 className="font-display text-3xl text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 text-lg mb-6">{service.description}</p>

                  <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="display-md text-secondary mb-4">INTERESSE GEWECKT?</h2>
          <p className="text-secondary/80 text-xl mb-8 max-w-xl mx-auto">
            Kontaktiere uns für eine persönliche Beratung oder komm einfach vorbei!
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary-light transition-colors group"
          >
            Jetzt Kontakt aufnehmen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
