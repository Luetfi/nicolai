import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  ChevronRight,
  ChevronDown,
  ClipboardCheck,
  MapPin,
  Compass,
  Car,
  Bike,
  AlertTriangle,
  ListChecks,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Picture } from '../common/Picture';
import { locations } from '../../data/contact';

type NavChild = { path: string; label: string; icon?: LucideIcon };

type NavLink =
  | { path: string; label: string }
  | { label: string; childIcon: LucideIcon; children: NavChild[] };

const navLinks: NavLink[] = [
  { path: '/', label: 'Startseite' },
  {
    label: 'Führerschein',
    childIcon: ListChecks,
    children: [
      { path: '/fuehrerschein-ludwigsburg', label: 'Führerschein in Ludwigsburg', icon: Compass },
      { path: '/fuehrerschein-klasse-b-ludwigsburg', label: 'Klasse B — Auto', icon: Car },
      { path: '/motorradfuehrerschein-ludwigsburg', label: 'Motorrad — A, A2, A1', icon: Bike },
      { path: '/asf-aufbauseminar-ludwigsburg', label: 'ASF-Aufbauseminar', icon: AlertTriangle },
      { path: '/leistungen', label: 'Alle Leistungen', icon: ListChecks },
    ],
  },
  { path: '/fahrschule', label: 'Fahrschule' },
  {
    label: 'Standorte',
    childIcon: MapPin,
    children: locations.map((l) => ({ path: l.landingPath, label: l.district })),
  },
  { path: '/theorieunterricht', label: 'Theorie' },
  { path: '/neuigkeiten', label: 'Neuigkeiten' },
  { path: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** Label der im Mobilmenü aufgeklappten Gruppe — es kann immer nur eine offen sein. */
  const [openGroup, setOpenGroup] = useState<string | null>(null);
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
    setOpenGroup(null);
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
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
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
            <Picture
              src="/images/logo.png"
              alt="Fahrschule Nicolai"
              loading="eager"
              fetchPriority="high"
              className={`w-auto transform group-hover:scale-105 transition-all duration-300 ${scrolled ? 'h-20 md:h-24' : 'h-32 md:h-40'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => {
              if ('children' in link) {
                const groupActive = link.children.some((c) => isActive(c.path));
                return (
                  <div
                    key={link.label}
                    className="relative group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      type="button"
                      className={`
                        relative flex items-center gap-1 px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300
                        ${groupActive ? 'text-primary' : 'text-gray-300 hover:text-white'}
                      `}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                      {groupActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                      )}
                    </button>
                    {/* Dropdown panel (pt-3 bridges the gap so hover stays alive) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
                      <div className="min-w-[250px] bg-secondary-light rounded-2xl border border-white/10 shadow-2xl shadow-black/40 p-2">
                        {link.children.map((child) => {
                          const ChildIcon = child.icon ?? link.childIcon;
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`
                                flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap
                                ${isActive(child.path)
                                  ? 'bg-primary/15 text-primary'
                                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }
                              `}
                            >
                              <ChildIcon className="w-4 h-4 flex-shrink-0 text-primary" />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
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
              );
            })}
          </nav>

          {/* CTA Group */}
          <div className="hidden md:flex items-center gap-2">
            {/* Anrufen — ghost / secondary */}
            <a
              href="tel:+491702138547"
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
            {navLinks.map((link, index) => {
              if ('children' in link) {
                const groupActive = link.children.some((c) => isActive(c.path));
                const groupOpen = openGroup === link.label;
                return (
                  <div
                    key={link.label}
                    className={mobileMenuOpen ? 'animate-slide-in-left' : ''}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenGroup((current) => (current === link.label ? null : link.label))}
                      aria-expanded={groupOpen}
                      className={`
                        w-full flex items-center justify-between px-5 py-2.5 rounded-xl font-display text-lg tracking-wide
                        transition-all duration-300
                        ${groupActive
                          ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary'
                          : 'text-white hover:bg-white/5'
                        }
                      `}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          groupOpen ? 'rotate-180 text-primary' : 'text-gray-500'
                        }`}
                      />
                    </button>
                    {groupOpen && (
                      <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-white/10 pl-3">
                        {link.children.map((child) => {
                          const ChildIcon = child.icon ?? link.childIcon;
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`
                                flex items-center justify-between gap-3 px-5 py-2 rounded-xl text-base transition-all duration-300
                                ${isActive(child.path)
                                  ? 'text-primary'
                                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }
                              `}
                            >
                              <span className="flex items-center gap-2.5">
                                <ChildIcon className="w-4 h-4 flex-shrink-0 text-primary" />
                                {child.label}
                              </span>
                              <ChevronRight
                                className={`w-4 h-4 flex-shrink-0 ${isActive(child.path) ? 'text-primary' : 'text-gray-600'}`}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
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
              );
            })}
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
              href="tel:+491702138547"
              className="flex items-center justify-center gap-2 btn-accent text-white px-6 py-3 rounded-xl font-bold text-base w-full"
            >
              <Phone className="w-4 h-4" />
              0170 / 21 38 547
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
