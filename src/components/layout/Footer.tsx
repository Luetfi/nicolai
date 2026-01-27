import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Mail, ArrowUpRight } from 'lucide-react';
import { locations, generalInfo } from '../../data/contact';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/leistungen', label: 'Führerscheinklassen' },
    { path: '/fahrschule', label: 'Über uns' },
    { path: '/theorieunterricht', label: 'Theorieunterricht' },
    { path: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <footer className="bg-secondary relative overflow-hidden">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="font-display text-secondary text-xl">FN</span>
              </div>
              <div className="font-display text-xl">
                <span className="text-white">FAHRSCHULE</span>
                <span className="text-primary ml-1">NICOLAI</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              {generalInfo.slogan}
            </p>
            <p className="text-gray-500 text-sm">
              Deine professionelle Fahrschule in Ludwigsburg für PKW- und Motorrad-Führerscheine.
            </p>
          </div>

          {/* Locations */}
          {locations.map((location) => (
            <div key={location.id}>
              <h3 className="font-display text-xl text-primary mb-6">{location.name.toUpperCase()}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400 text-sm">
                    <p>{location.address}</p>
                    <p>{location.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="text-gray-400 text-sm hover:text-primary transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400 text-sm">
                    <p className="font-medium text-gray-300">{location.lessonDays.join(' & ')}</p>
                    <p>{location.lessonTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl text-primary mb-6">NAVIGATION</h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary transition-colors group"
                >
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href={`mailto:${generalInfo.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">{generalInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} {generalInfo.companyName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/kontakt" className="text-gray-500 hover:text-primary transition-colors">
              Impressum
            </Link>
            <Link to="/kontakt" className="text-gray-500 hover:text-primary transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
