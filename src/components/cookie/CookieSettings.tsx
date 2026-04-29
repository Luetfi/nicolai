import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Lock, MapPin, X, Check, Save } from 'lucide-react';
import { useConsent } from '../../hooks/useConsent';

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  label: string;
}

function Toggle({ checked, onChange, disabled, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary ${
        disabled
          ? 'bg-primary/30 cursor-not-allowed'
          : checked
            ? 'bg-gradient-to-r from-primary to-primary-dark shadow-lg shadow-primary/30'
            : 'bg-white/10 hover:bg-white/20'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        } ${disabled ? 'opacity-70' : ''}`}
      />
    </button>
  );
}

export function CookieSettings() {
  const { settingsOpen } = useConsent();
  if (!settingsOpen) return null;
  return <CookieSettingsDialog />;
}

function CookieSettingsDialog() {
  const { closeSettings, maps, saveSelection, acceptAll, rejectAll } = useConsent();
  const [draftMaps, setDraftMaps] = useState(maps);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousActiveEl = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSettings();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousActiveEl?.focus?.();
    };
  }, [closeSettings]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div
        aria-hidden="true"
        onClick={closeSettings}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-secondary-light rounded-3xl shadow-2xl shadow-black/70 border border-white/10 animate-slide-in-up">
        {/* Brand thread */}
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10"
        />

        {/* Atmospheric overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 diagonal-stripes opacity-30 rounded-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 w-72 h-72 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 w-72 h-72 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"
        />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeSettings}
          aria-label="Schließen"
          className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6 pr-12">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
              <Cookie className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-1">
                DSGVO · Art. 6 Abs. 1
              </p>
              <h2
                id="cookie-settings-title"
                className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight"
              >
                Cookie-Einstellungen
              </h2>
            </div>
          </div>

          {/* Intro */}
          <p className="text-gray-300 text-sm leading-relaxed mb-7">
            Diese Webseite verwendet ausschließlich technisch notwendige Speicher­zugriffe. Eingebettete Inhalte von Drittanbietern werden nur geladen, wenn du das hier ausdrücklich erlaubst. Details findest du in unserer{' '}
            <Link
              to="/datenschutz"
              onClick={closeSettings}
              className="text-accent hover:text-accent-dark underline underline-offset-2 transition-colors"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>

          {/* Categories */}
          <div className="space-y-4">
            {/* Notwendig */}
            <div className="rounded-2xl bg-secondary border border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-lg text-white tracking-wide uppercase">
                        Notwendig
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                        Immer aktiv
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                      Speichert deine Cookie-Entscheidung lokal in deinem Browser, damit dieser Hinweis nicht bei jedem Besuch erneut erscheint. Es findet keine Übertragung an Dritte statt.
                    </p>
                  </div>
                </div>
                <Toggle checked onChange={() => undefined} disabled label="Notwendig (immer aktiv)" />
              </div>
            </div>

            {/* Maps */}
            <div className="rounded-2xl bg-secondary border border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-white tracking-wide uppercase">
                      Externe Karten
                    </h3>
                    <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                      Lädt eingebettete Karten von <span className="text-white font-medium">Google Maps</span> auf der Kontakt­seite. Beim Laden werden deine IP-Adresse, der Referrer und Browser-Informationen an Google Ireland Ltd. (Server in den USA) übertragen.
                    </p>
                  </div>
                </div>
                <Toggle
                  checked={draftMaps}
                  onChange={setDraftMaps}
                  label="Externe Karten von Google Maps zulassen"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:justify-between">
            <button
              type="button"
              onClick={rejectAll}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
              Alle ablehnen
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => saveSelection({ maps: draftMaps })}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-colors"
              >
                <Save className="w-4 h-4" />
                Auswahl speichern
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
    </div>
  );
}
