import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronRight } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Startseite' },
  { path: '/leistungen', label: 'Leistungen' },
  { path: '/fahrschule', label: 'Fahrschule' },
  { path: '/theorieunterricht', label: 'Theorie' },
  { path: '/neuigkeiten', label: 'News' },
  { path: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-secondary/95 backdrop-blur-xl shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28 md:h-32">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="Fahrschule Nicolai - Startseite">
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="Fahrschule Nicolai"
                className="h-24 md:h-28 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300
                  ${isActive(link.path)
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="tel:017138580010"
            className="hidden md:flex items-center gap-2 btn-accent text-white px-5 py-2.5 rounded-xl font-semibold text-sm group"
          >
            <Phone className="w-4 h-4 group-hover:animate-pulse" />
            <span>Jetzt anrufen</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-12 h-12 flex items-center justify-center"
            aria-label="Menü öffnen"
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-primary rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 top-[116px] md:top-[132px] bg-secondary/98 backdrop-blur-xl transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center justify-between px-6 py-4 rounded-2xl font-display text-2xl tracking-wide
                  transition-all duration-300
                  ${mobileMenuOpen ? 'animate-slide-in-left' : ''}
                  ${isActive(link.path)
                    ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary'
                    : 'text-white hover:bg-white/5'
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
                <ChevronRight className={`w-6 h-6 ${isActive(link.path) ? 'text-primary' : 'text-gray-500'}`} />
              </Link>
            ))}
          </div>

          <div className="mt-8 px-6">
            <a
              href="tel:017138580010"
              className="flex items-center justify-center gap-3 btn-accent text-white px-8 py-4 rounded-2xl font-bold text-lg w-full"
            >
              <Phone className="w-5 h-5" />
              0171 / 38 58 010
            </a>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        </nav>
      </div>
    </header>
  );
}
