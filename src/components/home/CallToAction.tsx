import { Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CallToAction() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-float animation-delay-300" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Diagonal stripes */}
      <div className="absolute inset-0 diagonal-stripes opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Starte jetzt durch</span>
          </div>

          {/* Headline */}
          <h2 className="display-lg text-white mb-6">
            BEREIT FÜR DEIN
            <br />
            <span className="gradient-text">ABENTEUER?</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Melde dich jetzt an und starte deine Fahrausbildung bei uns.
            Wir freuen uns auf dich!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              to="/kontakt#anmeldung"
              className="group btn-primary text-secondary px-10 py-5 rounded-2xl font-bold text-lg inline-flex items-center justify-center gap-3"
            >
              Jetzt Anmelden
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:017138580010"
              className="group glass text-white px-10 py-5 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5 group-hover:animate-pulse" />
              0171 / 38 58 010
            </a>
          </div>
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: 'Eglosheim',
              address: 'Monreposstraße 4',
              city: '71634 Ludwigsburg',
              days: 'Mo & Do',
              time: '18:30 - 20:00',
            },
            {
              name: 'Grünbühl',
              address: 'Neckarweihinger Str. 21',
              city: 'Ludwigsburg',
              days: 'Di & Do',
              time: '18:30 - 20:00',
            },
          ].map((location, index) => (
            <div
              key={location.name}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              {/* Card */}
              <div className="relative glass-dark rounded-3xl p-8 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-white mb-2">
                      {location.name}
                    </h3>
                    <p className="text-gray-400">{location.address}</p>
                    <p className="text-gray-400 mb-4">{location.city}</p>

                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 rounded-xl bg-white/5">
                        <span className="text-primary font-semibold">{location.days}</span>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-white/5">
                        <span className="text-gray-300">{location.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
