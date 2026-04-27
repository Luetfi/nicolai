import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Shield, Users, Trophy } from 'lucide-react';

export function Hero() {
  const stats = [
    { icon: Trophy, number: '25+', label: 'Jahre Erfahrung' },
    { icon: Users, number: '1000+', label: 'Erfolgreiche Schüler' },
    { icon: Shield, number: '98%', label: 'Bestehensquote' },
    { icon: Zap, number: '2', label: 'Standorte' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-secondary">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,209,0,0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,209,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Diagonal speed lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{
                width: '200%',
                top: `${20 + i * 15}%`,
                left: '-50%',
                transform: 'rotate(-5deg)',
                animation: `speed-lines ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl animate-float animation-delay-300" />

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <div>
            {/* Spacer (replaces former badge — keeps original hero height) */}
            <div aria-hidden="true" className="h-9 mb-8" />

            {/* Headline */}
            <h1 className="display-xl text-white mb-6 animate-slide-in-left">
              DEIN WEG ZUM
              <br />
              <span className="gradient-text">FÜHRERSCHEIN</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 max-w-lg mb-10 animate-slide-in-left animation-delay-200">
              Professionelle Fahrausbildung in Ludwigsburg.
              Modern, freundlich und mit über 25 Jahren Erfahrung
              begleiten wir dich sicher ans Ziel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-in-left animation-delay-300">
              <Link
                to="/kontakt#anmeldung"
                className="group btn-primary text-secondary px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3"
              >
                Jetzt Anmelden
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/leistungen"
                className="group glass text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-3 hover:bg-white/10 transition-all"
              >
                <Play className="w-5 h-5" />
                Alle Klassen
              </Link>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative animate-scale-in">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl" />

              {/* Card */}
              <div className="relative glass-dark rounded-3xl p-8 border border-white/10">
                {/* License classes preview */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { code: 'B', label: 'PKW', image: '/images/hero/pkw.jpg', to: '/leistungen#pkw' },
                    { code: 'A', label: 'Motorrad', image: '/images/hero/motorrad.jpg', to: '/leistungen#motorrad' },
                  ].map((cls, i) => (
                    <Link
                      key={cls.code}
                      to={cls.to}
                      className="group relative overflow-hidden rounded-2xl aspect-[4/5] block border border-white/10 hover:border-primary/30 transition-all"
                      style={{ animationDelay: `${400 + i * 100}ms` }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                        style={{ backgroundImage: `url(${cls.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-secondary/10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                        <div className="font-display text-6xl text-primary mb-1 group-hover:scale-110 transition-transform">
                          {cls.code}
                        </div>
                        <div className="text-gray-200 text-sm tracking-wide uppercase">
                          {cls.label}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* More classes hint */}
                <Link
                  to="/leistungen"
                  className="flex items-center justify-center gap-2 text-primary font-medium hover:gap-4 transition-all"
                >
                  Alle 7 Führerscheinklassen
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-6 -right-6 glass rounded-2xl px-6 py-4 animate-float animation-delay-200">
              <div className="text-primary font-display text-3xl">98%</div>
              <div className="text-gray-400 text-sm">Bestehensquote</div>
            </div>

            {/* Floating badge 2 */}
            <div className="absolute -bottom-4 -left-8 glass rounded-2xl px-6 py-4 animate-float animation-delay-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">Kurse verfügbar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-4xl text-white mb-1">{stat.number}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
