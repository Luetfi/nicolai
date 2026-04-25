import { Clock, MapPin, BookOpen, Monitor, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locations } from '../data/contact';

export function Theorieunterricht() {
  const theoryTopics = [
    'Risikofaktor Mensch',
    'Rechtliche Rahmenbedingungen',
    'Verkehrszeichen und Verkehrseinrichtungen',
    'Straßenverkehrssystem',
    'Vorfahrt und Verkehrsregelungen',
    'Verkehrsverhalten bei Fahrmanövern',
    'Ruhender Verkehr',
    'Verhalten in besonderen Situationen',
    'Lebenslanges Lernen',
    'Technische Bedingungen',
    'Fahren mit Solokraftfahrzeugen',
    'Personen- und Güterbeförderung',
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 diagonal-stripes opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Theorie lernen</span>
            </div>
            <h1 className="display-xl text-white mb-6">
              <span className="gradient-text">THEORIE</span>UNTERRICHT
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Die theoretische Grundlage für sicheres Fahren
            </p>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 bg-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="display-lg text-white mb-4">
              UNSERE <span className="gradient-text">UNTERRICHTSZEITEN</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Flexibel an beiden Standorten - wähle den Termin, der am besten zu dir passt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative bg-secondary-light rounded-3xl p-10 shadow-xl shadow-black/40 h-full card-hover border border-white/10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                    <MapPin className="w-10 h-10 text-secondary" />
                  </div>

                  <h3 className="font-display text-3xl text-white mb-4">{location.name}</h3>

                  <div className="flex items-center justify-center gap-2 text-gray-300 mb-6">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span>{location.address}, {location.city}</span>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-white">Unterrichtstage</span>
                    </div>
                    <p className="font-display text-4xl text-accent mb-2">
                      {location.lessonDays.join(' & ')}
                    </p>
                    <p className="text-xl text-white">
                      {location.lessonTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-300 mt-8 text-lg">
            Der Theorieunterricht findet regelmäßig an beiden Standorten statt.
            Du kannst flexibel zwischen den Standorten wechseln.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="py-24 bg-secondary-light relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="display-md text-white">THEMEN IM GRUNDSTOFF</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {theoryTopics.map((topic, index) => (
              <div
                key={topic}
                className="group flex items-center gap-4 bg-gradient-to-r from-secondary to-secondary-light rounded-2xl p-5 shadow-sm shadow-black/30 hover:shadow-md hover:shadow-black/40 transition-all border border-white/10 hover:border-primary/30 card-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-secondary font-display text-lg flex-shrink-0 shadow-md">
                  {index + 1}
                </span>
                <span className="text-white font-medium">{topic}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-300 mt-10 text-lg">
            Zusätzlich gibt es klassenspezifische Themen für PKW, Motorrad und Anhänger.
          </p>
        </div>
      </section>

      {/* Online Learning */}
      <section className="py-24 bg-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <h2 className="display-md text-white">ONLINE LERNEN</h2>
              </div>

              <div className="space-y-4 text-gray-300 text-lg mb-8">
                <p>
                  Ergänzend zum Präsenzunterricht bieten wir dir moderne Online-Lernmaterialien,
                  mit denen du flexibel und effektiv für die Theorieprüfung lernen kannst.
                </p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  'Alle aktuellen Prüfungsfragen',
                  'Lernstandskontrolle und Statistiken',
                  'Auf allen Geräten verfügbar',
                  'Simulierte Prüfungen',
                ].map((feature, index) => (
                  <li
                    key={feature}
                    className="flex items-center gap-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/kontakt"
                className="inline-flex items-center gap-3 btn-accent text-white px-8 py-4 rounded-xl font-bold text-lg group"
              >
                Jetzt informieren
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />

              <div className="relative bg-gradient-to-br from-secondary to-secondary-light rounded-3xl p-12 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
                  <Monitor className="w-16 h-16 text-white" />
                </div>
                <h3 className="font-display text-3xl text-white mb-3">
                  FAHREN LERNEN MAX
                </h3>
                <p className="text-gray-400 text-lg">
                  Das führende Online-Lernsystem für die Theorieprüfung
                </p>

                <div className="mt-8 flex justify-center gap-4">
                  <div className="px-6 py-3 glass rounded-xl">
                    <span className="text-primary font-display text-2xl">100%</span>
                    <p className="text-gray-400 text-sm">Prüfungsfragen</p>
                  </div>
                  <div className="px-6 py-3 glass rounded-xl">
                    <span className="text-primary font-display text-2xl">24/7</span>
                    <p className="text-gray-400 text-sm">Verfügbar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="display-md text-white mb-4">BEREIT FÜR DEN THEORIEUNTERRICHT?</h2>
          <p className="text-white/90 text-xl mb-8 max-w-xl mx-auto">
            Melde dich an und starte deine Fahrausbildung!
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 bg-secondary-light text-accent px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary transition-colors group"
          >
            Jetzt anmelden
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
