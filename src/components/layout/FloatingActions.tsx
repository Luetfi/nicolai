import { Link } from 'react-router-dom';
import { Phone, Mail, ClipboardCheck } from 'lucide-react';
import { locations, generalInfo } from '../../data/contact';

const PRIMARY_PHONE_TEL = `tel:${locations[0].phone.replace(/[\s/]/g, '')}`;
const EMAIL_HREF = `mailto:${generalInfo.email}`;
const WHATSAPP_URL = 'https://wa.me/491702138547';
const REGISTER_PATH = '/kontakt#anmeldung';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.732.244-1.075 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 01-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 005.218 1.34c5.96 0 10.804-4.842 10.804-10.802 0-5.958-4.842-10.8-10.802-10.8z" />
    </svg>
  );
}

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

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Auf WhatsApp schreiben"
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/5 hover:bg-green-500/10 text-green-500 hover:text-green-400 transition-colors"
        >
          <WhatsAppIcon className="w-7 h-7" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-secondary-light text-white text-sm font-medium px-3 py-1.5 shadow-lg shadow-black/40 border border-white/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            WhatsApp
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
            className="group flex-1 flex flex-col items-center justify-center gap-1 py-3 text-primary hover:bg-white/5 transition-colors border-l border-white/10"
          >
            <Mail className="w-5 h-5" />
            <span className="text-[11px] font-medium text-white">E-Mail</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 flex flex-col items-center justify-center gap-1 py-3 text-green-500 hover:bg-white/5 transition-colors border-x border-white/10"
            aria-label="Auf WhatsApp schreiben"
          >
            <WhatsAppIcon className="w-7 h-7" />
            <span className="text-[11px] font-medium text-white">WhatsApp</span>
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
