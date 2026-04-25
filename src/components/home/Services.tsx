import { Car, Bike, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    icon: Car,
    title: 'PKW',
    subtitle: 'Führerscheine',
    description: 'Vom klassischen Autoführerschein bis zum Anhänger - wir machen dich mobil.',
    classes: [
      { name: 'B', desc: 'PKW bis 3,5t' },
      { name: 'BE', desc: 'Mit Anhänger' },
      { name: 'B96', desc: 'Erweiterung' },
    ],
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: Bike,
    title: 'MOTORRAD',
    subtitle: 'Führerscheine',
    description: 'Vom Moped bis zur unbeschränkten Maschine - erlebe Freiheit auf zwei Rädern.',
    classes: [
      { name: 'A', desc: 'Unbeschränkt' },
      { name: 'A2', desc: 'Bis 35 kW' },
      { name: 'A1', desc: '125ccm' },
      { name: 'AM', desc: 'Moped' },
    ],
    gradient: 'from-accent to-orange-600',
    bgGradient: 'from-accent/10 to-orange-600/10',
  },
  {
    icon: Truck,
    title: 'EXTRAS',
    subtitle: 'Angebote',
    description: 'Aufbauseminare und Spezialtraining für deine sichere Fahrausbildung.',
    classes: [
      { name: 'ASF', desc: 'Aufbauseminar' },
      { name: 'FES', desc: 'Punkte abbauen' },
    ],
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
  },
];

export function Services() {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Unser Angebot</span>
          </div>
          <h2 className="display-lg text-white mb-4">
            WÄHLE DEINE <span className="gradient-text">KLASSE</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Egal ob Auto, Motorrad oder Zusatzausbildung -
            wir haben das passende Angebot für dich.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

              {/* Card */}
              <div className="relative bg-secondary-light rounded-3xl p-8 shadow-xl shadow-black/40 h-full card-hover border border-white/10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} mb-6 shadow-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className="font-display text-3xl text-white">
                    {category.title}
                  </h3>
                  <span className="text-gray-400 text-sm tracking-wide">
                    {category.subtitle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6">
                  {category.description}
                </p>

                {/* Classes */}
                <div className="space-y-3 mb-8">
                  {category.classes.map((cls) => (
                    <div
                      key={cls.name}
                      className={`flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r ${category.bgGradient} group/item hover:scale-[1.02] transition-transform cursor-pointer`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-md`}>
                        <span className="font-display text-xl text-white">{cls.name}</span>
                      </div>
                      <span className="text-white font-medium">{cls.desc}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to="/leistungen"
                  className={`inline-flex items-center gap-2 font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent hover:gap-4 transition-all`}
                >
                  Mehr erfahren
                  <ArrowRight className={`w-4 h-4 text-current`} style={{ color: category.gradient.includes('blue') ? '#3b82f6' : category.gradient.includes('accent') ? '#FF6B00' : '#22c55e' }} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-3 btn-primary text-secondary px-10 py-5 rounded-2xl font-bold text-lg"
          >
            Alle Führerscheinklassen ansehen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
