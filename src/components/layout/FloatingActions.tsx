import { Link } from 'react-router-dom';
import { Phone, Mail, ClipboardCheck } from 'lucide-react';
import { locations, generalInfo } from '../../data/contact';

const PRIMARY_PHONE_TEL = `tel:${locations[0].phone.replace(/[\s/]/g, '')}`;
const EMAIL_HREF = `mailto:${generalInfo.email}`;
const REGISTER_PATH = '/kontakt#anmeldung';

export function FloatingActions() {
  return (
    <>
      {/* Desktop: vertikale Rail rechts */}
      <aside
        aria-label="Schnellkontakt"
        className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 glass-dark rounded-2xl border border-white/10 p-2 shadow-xl shadow-black/40"
      >
        <a
          href={PRIMARY_PHONE_TEL}
          aria-label="Anrufen"
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-colors"
        >
          <Phone className="w-5 h-5 group-hover:animate-pulse" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-secondary-light text-white text-sm font-medium px-3 py-1.5 shadow-lg shadow-black/40 border border-white/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Anrufen
          </span>
        </a>

        <a
          href={EMAIL_HREF}
          aria-label="E-Mail schreiben"
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-secondary-light text-white text-sm font-medium px-3 py-1.5 shadow-lg shadow-black/40 border border-white/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            E-Mail
          </span>
        </a>

        <div className="group relative">
          <Link
            to={REGISTER_PATH}
            aria-label="Zum Anmeldeformular"
            className="flex items-center justify-center w-12 h-12 rounded-xl btn-primary text-secondary"
          >
            <ClipboardCheck className="w-5 h-5 relative" />
          </Link>
          <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-full mr-3 whitespace-nowrap rounded-lg bg-secondary-light text-white text-sm font-medium px-3 py-1.5 shadow-lg shadow-black/40 border border-white/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Anmelden
          </span>
        </div>
      </aside>

      {/* Mobile: horizontale Bar unten */}
      <nav
        aria-label="Schnellkontakt"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-secondary/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch">
          <a
            href={PRIMARY_PHONE_TEL}
            className="group flex-1 flex flex-col items-center justify-center gap-1 py-3 text-primary hover:bg-white/5 transition-colors"
          >
            <Phone className="w-5 h-5 group-hover:animate-pulse" />
            <span className="text-[11px] font-medium text-white">Anrufen</span>
          </a>

          <a
            href={EMAIL_HREF}
            className="group flex-1 flex flex-col items-center justify-center gap-1 py-3 text-primary hover:bg-white/5 transition-colors border-x border-white/10"
          >
            <Mail className="w-5 h-5" />
            <span className="text-[11px] font-medium text-white">E-Mail</span>
          </a>

          <Link
            to={REGISTER_PATH}
            className="group flex-1 flex flex-col items-center justify-center gap-1 py-3 btn-primary text-secondary"
          >
            <ClipboardCheck className="w-5 h-5 relative" />
            <span className="text-[11px] font-bold relative">Anmelden</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
