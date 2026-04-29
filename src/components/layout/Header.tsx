import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronRight, ClipboardCheck } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Startseite' },
  { path: '/leistungen', label: 'Leistungen' },
  { path: '/fahrschule', label: 'Fahrschule' },
  { path: '/theorieunterricht', label: 'Theorie' },
  { path: '/neuigkeiten', label: 'Neuigkeiten' },
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

  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        mobileMenuOpen
          ? 'bg-secondary'
          : scrolled
          ? 'bg-secondary/95 backdrop-blur-xl shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-24 md:h-28' : 'h-36 md:h-44'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="Fahrschule Nicolai - Startseite">
            <img
              src="/images/logo.png"
              alt="Fahrschule Nicolai"
              className={`w-auto transform group-hover:scale-105 transition-all duration-300 ${scrolled ? 'h-20 md:h-24' : 'h-32 md:h-40'}`}
            />
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

          {/* CTA Group */}
          <div className="hidden md:flex items-center gap-2">
            {/* Anrufen — ghost / secondary */}
            <a
              href="tel:017138580010"
              className="flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-xl border border-white/15 hover:border-primary/50 text-white hover:text-primary font-semibold text-sm transition-all duration-300 group"
              aria-label="Jetzt anrufen"
              title="Jetzt anrufen"
            >
              <Phone className="w-4 h-4 group-hover:animate-pulse" />
              <span className="hidden xl:inline">Anrufen</span>
            </a>
            {/* Anmelden — primary CTA */}
            <Link
              to="/kontakt#anmeldung"
              className="flex items-center gap-2 btn-primary text-secondary px-5 py-2.5 rounded-xl font-bold text-sm group"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Anmelden</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

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
        className={`lg:hidden fixed inset-0 ${scrolled ? 'top-[100px] md:top-[116px]' : 'top-[148px] md:top-[180px]'} bg-secondary ${
          mobileMenuOpen
            ? 'visible pointer-events-auto'
            : 'invisible pointer-events-none'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 pb-28 h-full overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center justify-between px-5 py-2.5 rounded-xl font-display text-lg tracking-wide
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
                <ChevronRight className={`w-5 h-5 ${isActive(link.path) ? 'text-primary' : 'text-gray-500'}`} />
              </Link>
            ))}
          </div>

          <div className="mt-4 px-5 space-y-2">
            <Link
              to="/kontakt#anmeldung"
              className="flex items-center justify-center gap-2 btn-primary text-secondary px-6 py-3 rounded-xl font-bold text-base w-full"
            >
              <ClipboardCheck className="w-4 h-4" />
              Jetzt anmelden
            </Link>
            <a
              href="tel:017138580010"
              className="flex items-center justify-center gap-2 btn-accent text-white px-6 py-3 rounded-xl font-bold text-base w-full"
            >
              <Phone className="w-4 h-4" />
              0171 / 38 58 010
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
