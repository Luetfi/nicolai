import { Calendar, ArrowRight, Bell, BookOpen, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: 'news' | 'course' | 'info';
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Neue Theoriezeiten ab sofort',
    date: '2024-01-15',
    summary: 'Ab sofort bieten wir zusätzliche Theorieunterrichtszeiten an beiden Standorten an. Montag, Dienstag und Donnerstag von 18:30 - 20:00 Uhr.',
    category: 'news',
  },
  {
    id: '2',
    title: 'Motorrad-Saison startet',
    date: '2024-03-01',
    summary: 'Die Motorradsaison beginnt! Jetzt ist der perfekte Zeitpunkt, um mit deiner Motorrad-Ausbildung zu starten. Wir haben freie Plätze in allen Motorradklassen.',
    category: 'course',
  },
  {
    id: '3',
    title: 'Ferienkurse in den Sommerferien',
    date: '2024-06-15',
    summary: 'Auch in diesem Jahr bieten wir wieder Intensivkurse in den Sommerferien an. Schnell und effektiv zum Führerschein - ideal für Schüler und Studenten.',
    category: 'course',
  },
  {
    id: '4',
    title: 'Führerschein mit 17 (BF17)',
    date: '2024-02-01',
    summary: 'Begleitetes Fahren ab 17 Jahren - eine tolle Möglichkeit, früh Fahrerfahrung zu sammeln. Informiere dich bei uns über die Voraussetzungen.',
    category: 'info',
  },
];

const categoryConfig = {
  news: {
    icon: Bell,
    label: 'Neuigkeit',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/15',
    textColor: 'text-blue-300',
  },
  course: {
    icon: BookOpen,
    label: 'Kurs',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/15',
    textColor: 'text-green-300',
  },
  info: {
    icon: Info,
    label: 'Information',
    gradient: 'from-accent to-orange-500',
    bgColor: 'bg-accent/15',
    textColor: 'text-accent',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function Neuigkeiten() {
  return (
    <>
      <PageHero
        crumb="News"
        title={<span className="gradient-text">NEUIGKEITEN</span>}
        subtitle="Aktuelle Meldungen und Informationen aus der Fahrschule Nicolai"
      />

      {/* News List */}
      <section className="py-24 bg-secondary relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {newsItems.map((item, index) => {
              const config = categoryConfig[item.category];
              const Icon = config.icon;

              return (
                <div
                  key={item.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${config.gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />

                  <div className="relative bg-secondary-light rounded-3xl p-8 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50 transition-all border border-white/10 border-l-4 border-l-transparent hover:border-l-primary">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bgColor} ${config.textColor} text-sm font-semibold`}>
                        <Icon className="w-4 h-4" />
                        {config.label}
                      </span>
                      <span className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.date)}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300 text-lg">{item.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Card */}
          <div className="mt-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" />

            <div className="relative bg-secondary-light rounded-3xl p-10 shadow-xl shadow-black/40 text-center border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bell className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-display text-2xl text-white mb-3">
                IMMER AUF DEM LAUFENDEN
              </h3>
              <p className="text-gray-300 text-lg mb-6 max-w-lg mx-auto">
                Hier findest du regelmäßig aktuelle Informationen zu Kursen, Seminaren und
                wichtigen Änderungen in der Fahrschule.
              </p>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-3 btn-primary text-secondary px-8 py-4 rounded-xl font-bold text-lg group"
              >
                Bei Fragen kontaktiere uns
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 diagonal-stripes opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="display-md text-secondary mb-4">KEINE NEUIGKEIT VERPASSEN</h2>
          <p className="text-secondary/80 text-xl mb-8 max-w-xl mx-auto">
            Folge uns auf Social Media oder kontaktiere uns direkt für aktuelle Informationen.
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center gap-3 bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary-light transition-colors group"
          >
            Kontakt aufnehmen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
