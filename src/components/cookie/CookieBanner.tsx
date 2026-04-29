import { Cookie, Settings, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConsent } from '../../hooks/useConsent';

export function CookieBanner() {
  const { ready, decided, settingsOpen, acceptAll, rejectAll, openSettings } = useConsent();

  if (!ready || decided || settingsOpen) return null;

  return (
    <div
      className="fixed inset-x-0 z-50 px-4 sm:px-6 bottom-24 lg:bottom-6 pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div
        role="region"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
        className="pointer-events-auto mx-auto max-w-3xl relative animate-slide-in-up rounded-2xl shadow-2xl shadow-black/60 glass-dark"
      >
        {/* Brand thread */}
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Cookie className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="cookie-banner-title"
                className="font-display text-lg md:text-xl text-white tracking-wider uppercase mb-1"
              >
                Deine Privatsphäre
              </h2>
              <p
                id="cookie-banner-description"
                className="text-sm text-gray-300 leading-relaxed"
              >
                Wir nutzen ausschließlich technisch notwendige Speicher­zugriffe. Für die eingebetteten Karten von{' '}
                <span className="text-primary font-medium">Google Maps</span> brauchen wir deine Einwilligung – dabei wird deine IP-Adresse an Google übertragen.{' '}
                <Link
                  to="/datenschutz"
                  className="text-accent hover:text-accent-dark underline underline-offset-2 transition-colors"
                >
                  Mehr erfahren
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center gap-3 sm:justify-end sm:flex-wrap">
            <button
              type="button"
              onClick={openSettings}
              className="inline-flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors py-2 sm:px-2"
            >
              <Settings className="w-4 h-4" />
              Einstellungen
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
              Nur Notwendige
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-secondary text-sm font-bold tracking-wide"
            >
              <Check className="w-4 h-4" />
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
