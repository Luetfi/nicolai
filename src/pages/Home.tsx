import { Hero, Services, CallToAction } from '../components/home';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UpcomingCourseCard } from '../components/common';
import { useJsonData } from '../hooks/useJsonData';
import type { UpcomingCourse } from '../data/services';

export function Home() {
  const { data: nextAsfCourse } = useJsonData<UpcomingCourse>('/data/asf-course.json');

  const features = [
    'Erfahrene & geduldige Fahrlehrer',
    'Moderne Fahrzeuge',
    'Flexible Unterrichtszeiten',
    'Hohe Bestehensquote',
    'Zwei Standorte in Ludwigsburg',
    'Faire Preise',
  ];

  return (
    <>
      <Hero />

      {/* Aktuelles - Nächster Kurs */}
      <section className="py-16 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10">
            <h2 className="display-md text-white mb-3">
              <span className="gradient-text">AKTUELLES</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Der nächste Aufbauseminar-Kurs auf einen Blick
            </p>
          </div>
          {nextAsfCourse ? (
            <UpcomingCourseCard course={nextAsfCourse} />
          ) : (
            <div className="relative bg-gradient-to-br from-secondary-light to-secondary rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-2xl shadow-black/50 animate-pulse">
              <div className="h-6 w-40 bg-white/10 rounded-full mb-6" />
              <div className="h-10 w-64 bg-white/10 rounded mb-4" />
              <div className="h-6 w-72 bg-white/10 rounded mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-2xl" />
                <div className="h-24 bg-white/5 rounded-2xl" />
              </div>
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/neuigkeiten"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
            >
              Alle Neuigkeiten ansehen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Services />

      {/* About Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-white font-medium text-sm">Über 55 Jahre Erfahrung</span>
              </div>

              <h2 className="display-lg text-white mb-6">
                DEINE FAHRSCHULE IN{' '}
                <span className="gradient-text">LUDWIGSBURG</span>
              </h2>

              <div className="space-y-4 text-gray-300 text-lg mb-8">
                <p>
                  Seit über 55 Jahren bilden wir Fahrschüler erfolgreich aus.
                  Mit zwei Standorten in Eglosheim und Grünbühl sind wir immer in deiner Nähe.
                </p>
                <p>
                  Unser erfahrenes Team aus qualifizierten Fahrlehrern begleitet dich
                  auf deinem Weg zum Führerschein - kompetent, geduldig und mit viel Engagement.
                </p>
              </div>

              {/* Feature list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/fahrschule#team"
                className="inline-flex items-center gap-3 btn-primary text-secondary px-8 py-4 rounded-xl font-bold text-lg group"
              >
                Unser Team kennenlernen
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right column - Visual */}
            <div className="relative">
              {/* Main visual */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-2xl" />

                {/* Card stack */}
                <div className="relative">
                  {/* Background card */}
                  <div className="absolute top-8 left-8 right-0 bottom-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl" />

                  {/* Main card */}
                  <div className="relative bg-gradient-to-br from-secondary to-secondary-light rounded-3xl p-10 shadow-2xl">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img
                          src="/images/logo.png"
                          alt="Fahrschule Nicolai"
                          className="h-56 md:h-64 w-auto relative z-10 animate-pulse-glow"
                        />
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/40 to-accent/40 rounded-3xl opacity-50 blur-2xl" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <p className="text-primary font-medium tracking-wide">
                        Dein Weg zum Führerschein
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-display text-2xl text-primary">55+</div>
                        <div className="text-gray-500 text-xs">Jahre</div>
                      </div>
                      <div>
                        <div className="font-display text-2xl text-primary">6000+</div>
                        <div className="text-gray-500 text-xs">Schüler</div>
                      </div>
                      <div>
                        <div className="font-display text-2xl text-primary">😊</div>
                        <div className="text-gray-500 text-xs">Erfolg</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-secondary rounded-2xl px-6 py-4 shadow-xl shadow-black/50 border border-white/10 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-semibold">Anmeldung offen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
