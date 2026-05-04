import { useMemo, useState } from 'react';
import { Clock, MapPin, BookOpen, Monitor, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common';
import { locations } from '../data/contact';
import { useJsonData } from '../hooks/useJsonData';
import type { TheoryScheduleFile } from '../data/theory';

const WEEKDAYS_DE = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'];
const MONTHS_SHORT_DE = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'];
const MONTHS_LONG_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const DEFAULT_VISIBLE = 8;

function parseLocalDate(yyyymmdd: string): Date {
  const [y, m, d] = yyyymmdd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function Theorieunterricht() {
  const { data: scheduleData } = useJsonData<TheoryScheduleFile>('/data/theory-schedule.json');
  const [showAll, setShowAll] = useState(false);

  const locationsById = useMemo(
    () => Object.fromEntries(locations.map((l) => [l.id, l])),
    []
  );

  const upcoming = useMemo(() => {
    if (!scheduleData?.items) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [...scheduleData.items]
      .filter((l) => parseLocalDate(l.date).getTime() >= today.getTime())
      .sort((a, b) => {
        const cmp = a.date.localeCompare(b.date);
        if (cmp !== 0) return cmp;
        return a.startTime.localeCompare(b.startTime);
      });
  }, [scheduleData]);

  const visibleLessons = showAll ? upcoming : upcoming.slice(0, DEFAULT_VISIBLE);

  const theoryTopics = [
    'Persönliche Voraussetzungen / Risikofaktor Mensch',
    'Rechtliche Rahmenbedingungen',
    'Grundregel / Verkehrszeichen und Verkehrseinrichtungen',
    'Straßenverkehrssystem und seine Nutzungen, Bahnübergänge',
    'Vorfahrt / Vorrang',
    'Verkehrsregelungen',
    'Geschwindigkeit / Abstand und umweltschonende Fahrweise',
    'Andere Teilnehmer im Straßenverkehr',
    'Verkehrsverhalten bei Fahrmanövern, Verkehrsbeobachtung',
    'Ruhender Verkehr / Absichern / Abschleppen',
    'Besondere Situationen / Verstöße gegen Vorschrift',
    'Lebenslanges Lernen',
  ];

  const zusatzPkwTopics = [
    'Technische Bedingungen, umweltbewusster Umgang mit Kraftfahrzeugen',
    'Fahren mit Solokraftfahrzeugen und Zügen, Personen- und Güterbeförderung',
  ];

  const zusatzMotorradTopics = [
    'Fahrer/Beifahrer, Fahrzeug, Persönliche Voraussetzungen',
    'Fahrtechnik und Fahrphysik',
    'Besondere Schwierigkeiten und Gefahren beim Motorradfahren',
    'Besonderes Verhalten beim Motorradfahren',
  ];

  return (
    <>
      <PageHero
        crumb="Theorie"
        title={<><span className="gradient-text">THEORIE</span>UNTERRICHT</>}
        subtitle="Die theoretische Grundlage für sicheres Fahren"
      />

      {/* Upcoming Termine — Starting-Grid Schedule */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        {/* Subtle atmospheric gradient + speed lines */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-white font-medium text-sm">Stundenplan</span>
            </div>
            <h2 className="display-lg text-white mb-4">
              NÄCHSTE <span className="gradient-text">TERMINE</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Konkrete Theorieunterrichts-Termine an beiden Standorten — Datum, Uhrzeit und Thema auf einen Blick.
            </p>
          </div>

          {/* Loading skeleton */}
          {!scheduleData && (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={`skeleton-${i}`}
                  className="bg-secondary-light rounded-2xl p-5 sm:p-6 border border-white/10 animate-pulse"
                >
                  <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[88px_1fr_auto] gap-5 items-center">
                    <div className="h-20 bg-white/5 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-6 w-2/3 bg-white/10 rounded" />
                      <div className="h-4 w-1/2 bg-white/5 rounded" />
                    </div>
                    <div className="hidden sm:block h-9 w-36 bg-white/5 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {scheduleData && upcoming.length === 0 && (
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" />
              <div className="relative bg-secondary-light rounded-3xl p-10 text-center border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-display text-2xl text-white mb-3">
                  AKTUELL KEINE TERMINE GEPLANT
                </h3>
                <p className="text-gray-300 text-lg mb-6 max-w-md mx-auto">
                  Schau gerne bald wieder vorbei — oder sprich uns direkt an, wir nennen dir den nächsten Termin persönlich.
                </p>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-3 btn-primary text-secondary px-8 py-4 rounded-xl font-bold text-lg group"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Lesson rows */}
          {scheduleData && upcoming.length > 0 && (
            <>
              <div className="space-y-3">
                {visibleLessons.map((lesson, index) => {
                  const lessonDate = parseLocalDate(lesson.date);
                  const month = lessonDate.getMonth();
                  const year = lessonDate.getFullYear();
                  const prev = index > 0 ? parseLocalDate(visibleLessons[index - 1].date) : null;
                  const showMonthDivider =
                    !prev || prev.getMonth() !== month || prev.getFullYear() !== year;
                  const location = locationsById[lesson.locationId];
                  const isGruenbuehl = lesson.locationId === 'gruenbuehl';
                  const accentBand = isGruenbuehl
                    ? 'from-accent to-accent-dark'
                    : 'from-primary to-primary-dark';
                  const chipStyle = isGruenbuehl
                    ? 'bg-accent/15 text-accent border-accent/30'
                    : 'bg-primary/15 text-primary border-primary/30';

                  return (
                    <div key={lesson.id}>
                      {showMonthDivider && (
                        <div className="flex items-center gap-4 pt-6 pb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/5" />
                          <span className="font-display text-xl tracking-[0.25em] text-gray-400">
                            {MONTHS_LONG_DE[month]} {year}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/5" />
                        </div>
                      )}

                      <div
                        className="group relative"
                        style={{ animationDelay: `${index * 60}ms` }}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                        <div className="relative bg-secondary-light rounded-2xl border border-white/10 group-hover:border-primary/30 shadow-lg shadow-black/40 transition-all duration-300 overflow-hidden group-hover:-translate-y-0.5">
                          {/* Left vertical accent bar — appears on hover */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                          <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[88px_1fr_auto] gap-x-5 gap-y-3 p-5 sm:p-6 items-center">
                            {/* Calendar leaf */}
                            <div className="relative bg-secondary rounded-xl overflow-hidden border border-white/10 text-center w-[88px]">
                              <div className={`h-1.5 bg-gradient-to-r ${accentBand}`} />
                              <div className="px-3 py-2.5">
                                <div className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-0.5">
                                  {WEEKDAYS_DE[lessonDate.getDay()]}
                                </div>
                                <div className="font-display text-4xl text-white leading-none tabular-nums">
                                  {String(lessonDate.getDate()).padStart(2, '0')}
                                </div>
                                <div className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mt-1.5">
                                  {MONTHS_SHORT_DE[month]}
                                </div>
                              </div>
                            </div>

                            {/* Topic + notes */}
                            <div className="min-w-0">
                              <h3 className="font-display text-xl sm:text-2xl text-white leading-tight tracking-wide group-hover:text-primary transition-colors">
                                {lesson.topic || 'Theorieunterricht'}
                              </h3>
                              {lesson.notes && (
                                <p className="text-gray-400 text-sm mt-1.5 leading-snug">
                                  {lesson.notes}
                                </p>
                              )}
                            </div>

                            {/* Time + location */}
                            <div className="col-span-2 sm:col-span-1 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 mt-1 sm:mt-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                              <div className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg whitespace-nowrap">
                                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="tabular-nums">
                                  {lesson.startTime} – {lesson.endTime}
                                </span>
                              </div>
                              {location && (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${chipStyle}`}>
                                  <MapPin className="w-3.5 h-3.5" />
                                  {location.name.replace('Standort ', '')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!showAll && upcoming.length > DEFAULT_VISIBLE && (
                <div className="text-center mt-10">
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="inline-flex items-center gap-3 bg-secondary-light hover:bg-secondary border border-white/10 hover:border-primary/30 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all"
                  >
                    Alle {upcoming.length} Termine anzeigen
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              <p className="text-center text-gray-400 text-sm mt-12 max-w-xl mx-auto">
                Standortübergreifend — du kannst flexibel zwischen Eglosheim und Grünbühl wechseln.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 bg-secondary relative border-t border-white/5">
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
                    {location.infoTime && (
                      <p className="text-sm text-gray-300 mt-2">
                        {location.infoTime}
                      </p>
                    )}
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
      <section className="py-24 bg-secondary relative overflow-hidden">
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
                className="group flex items-center gap-4 bg-gradient-to-r from-secondary-light to-secondary-light/50 rounded-2xl p-5 shadow-sm shadow-black/30 hover:shadow-md hover:shadow-black/40 transition-all border border-white/10 hover:border-primary/30 card-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-secondary font-display text-lg flex-shrink-0 shadow-md">
                  {index + 1}
                </span>
                <span className="text-white font-medium">{topic}</span>
              </div>
            ))}
          </div>

          {/* Zusatzstoff PKW */}
          <div className="mt-24">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="display-md text-white">THEMEN IM ZUSATZSTOFF PKW</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {zusatzPkwTopics.map((topic, index) => (
                <div
                  key={topic}
                  className="group flex items-center gap-4 bg-gradient-to-r from-secondary-light to-secondary-light/50 rounded-2xl p-5 shadow-sm shadow-black/30 hover:shadow-md hover:shadow-black/40 transition-all border border-white/10 hover:border-blue-500/40 card-hover"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-display text-lg flex-shrink-0 shadow-md">
                    {index + 1}
                  </span>
                  <span className="text-white font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zusatzstoff Motorrad */}
          <div className="mt-24">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="display-md text-white">THEMEN IM ZUSATZSTOFF MOTORRAD</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {zusatzMotorradTopics.map((topic, index) => (
                <div
                  key={topic}
                  className="group flex items-center gap-4 bg-gradient-to-r from-secondary-light to-secondary-light/50 rounded-2xl p-5 shadow-sm shadow-black/30 hover:shadow-md hover:shadow-black/40 transition-all border border-white/10 hover:border-accent/40 card-hover"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-10 h-10 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center text-white font-display text-lg flex-shrink-0 shadow-md">
                    {index + 1}
                  </span>
                  <span className="text-white font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>

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
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="display-md text-secondary mb-4">BEREIT FÜR DEN THEORIEUNTERRICHT?</h2>
          <p className="text-secondary/90 text-xl mb-8 max-w-xl mx-auto">
            Melde dich an und starte deine Fahrausbildung!
          </p>
          <Link
            to="/kontakt#anmeldung"
            className="inline-flex items-center gap-3 bg-secondary-light text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary transition-colors group"
          >
            Jetzt anmelden
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
