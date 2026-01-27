import { Car, Bike, AlertTriangle, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { licenseClasses, specialServices } from '../data/services';

export function Leistungen() {
  const pkwClasses = licenseClasses.filter((c) => c.category === 'pkw');
  const motorradClasses = licenseClasses.filter((c) => c.category === 'motorrad');

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 diagonal-stripes opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Alle Führerscheinklassen</span>
            </div>
            <h1 className="display-xl text-white mb-6">
              UNSERE <span className="gradient-text">LEISTUNGEN</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Von PKW bis Motorrad - wir bieten dir die komplette Führerscheinausbildung
            </p>
          </div>
        </div>
      </section>

      {/* PKW Section */}
      <section className="py-24 bg-background relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="display-md text-secondary">PKW-FÜHRERSCHEINE</h2>
              <p className="text-gray-600">Dein Einstieg in die Mobilität</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkwClasses.map((license, index) => (
              <div
                key={license.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 h-full card-hover border border-gray-100">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="font-display text-4xl text-white">{license.name}</span>
                    </div>
                    <span className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full">
                      ab {license.minAge} Jahren
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-secondary mb-2">{license.title}</h3>
                  <p className="text-gray-600 mb-6">{license.description}</p>

                  <div>
                    <h4 className="font-semibold text-secondary mb-3 text-sm uppercase tracking-wide">
                      Voraussetzungen
                    </h4>
                    <ul className="space-y-2">
                      {license.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motorrad Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
              <Bike className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="display-md text-secondary">MOTORRAD-FÜHRERSCHEINE</h2>
              <p className="text-gray-600">Freiheit auf zwei Rädern</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {motorradClasses.map((license, index) => (
              <div
                key={license.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-orange-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 h-full card-hover border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="font-display text-3xl text-white">{license.name}</span>
                    </div>
                    <span className="px-3 py-1.5 bg-orange-50 text-accent text-xs font-semibold rounded-full">
                      ab {license.minAge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-secondary mb-2">{license.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{license.description}</p>

                  <ul className="space-y-1.5">
                    {license.requirements.slice(0, 2).map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-xs">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="display-md text-secondary">ZUSATZANGEBOTE</h2>
              <p className="text-gray-600">Seminare und Spezialtraining</p>
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

                <div className="relative bg-white rounded-3xl p-10 shadow-xl shadow-gray-200/50 h-full card-hover border border-gray-100">
                  <h3 className="font-display text-3xl text-secondary mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-lg mb-6">{service.description}</p>

                  <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
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
