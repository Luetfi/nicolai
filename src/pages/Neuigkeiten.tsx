import { Calendar, ArrowRight, Bell, BookOpen, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common';
import { useJsonData } from '../hooks/useJsonData';
import type { NewsFile } from '../data/news';

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
  const { data: newsData } = useJsonData<NewsFile>('/data/news.json');
  const newsItems = newsData?.items ?? [];

  return (
    <>
      <PageHero
        crumb="Neuigkeiten"
        title={<span className="gradient-text">NEUIGKEITEN</span>}
        subtitle="Aktuelle Meldungen und Informationen aus der Fahrschule Nicolai"
      />

      {/* News List */}
      <section className="py-24 bg-secondary relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {!newsData && [0, 1, 2].map((i) => (
              <div key={`skeleton-${i}`} className="relative bg-secondary-light rounded-3xl p-8 border border-white/10 animate-pulse">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="h-8 w-28 bg-white/10 rounded-full" />
                  <div className="h-4 w-32 bg-white/10 rounded" />
                </div>
                <div className="h-7 w-2/3 bg-white/10 rounded mb-3" />
                <div className="h-5 w-full bg-white/10 rounded mb-2" />
                <div className="h-5 w-5/6 bg-white/10 rounded" />
              </div>
            ))}
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
