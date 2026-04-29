import { Fragment, useState } from 'react';
import { ArrowRight, Eye, ExternalLink, Lock, MapPin } from 'lucide-react';
import { useConsent } from '../../hooks/useConsent';

interface MapsConsentProps {
  query: string;
  locationName: string;
  address: string;
  city: string;
}

export function MapsConsent({ query, locationName, address, city }: MapsConsentProps) {
  const { maps, saveSelection } = useConsent();
  const [oneTime, setOneTime] = useState(false);
  const encodedQuery = encodeURIComponent(query);
  const shouldLoad = maps || oneTime;

  if (shouldLoad) {
    return (
      <Fragment>
        <iframe
          title={`Karte: ${locationName}`}
          src={`https://maps.google.com/maps?q=${encodedQuery}&z=15&hl=de&output=embed`}
          className="absolute inset-0 w-full h-full grayscale-[18%] contrast-[1.05] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.02]"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-secondary-light/80 via-secondary-light/20 to-transparent"
        />

        {oneTime && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-light/80 backdrop-blur-sm border border-white/10 text-[10px] uppercase tracking-widest text-primary"
          >
            <Eye className="w-3 h-3" />
            Sitzung
          </div>
        )}

        <a
          href={`https://maps.google.com/?q=${encodedQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${locationName} in Google Maps öffnen`}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-dark text-accent text-sm font-semibold tracking-wide shadow-lg shadow-black/50 hover:text-primary hover:border-primary/40 hover:gap-3 transition-all duration-300"
        >
          <MapPin className="w-4 h-4" />
          In Google Maps öffnen
          <ArrowRight className="w-4 h-4" />
        </a>
      </Fragment>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-secondary via-secondary-light to-secondary">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div aria-hidden="true" className="absolute inset-0 diagonal-stripes opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="relative w-32 h-32 md:w-44 md:h-44">
          <span className="absolute inset-0 rounded-full border border-primary/15 animate-pulse-glow" />
          <span className="absolute inset-3 rounded-full border border-primary/10" />
          <span className="absolute inset-6 rounded-full border border-accent/15" />
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center p-5 md:p-7 text-center">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary-light to-secondary border border-white/10 rounded-2xl flex items-center justify-center shadow-lg shadow-black/40 mb-3">
          <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        <p className="font-display text-base md:text-lg text-white uppercase tracking-wider mb-1">
          Karte deaktiviert
        </p>
        <p className="text-xs md:text-sm text-gray-400 max-w-sm leading-relaxed mb-5">
          Diese Karte wird von <span className="text-white">Google Maps</span> geladen. Erst mit deiner Einwilligung wird deine IP-Adresse an Google übertragen.
        </p>

        <div className="flex flex-col gap-2 w-full max-w-xs">
          <button
            type="button"
            onClick={() => saveSelection({ maps: true })}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-secondary text-sm font-bold tracking-wide"
          >
            <MapPin className="w-4 h-4" />
            Karte aktivieren
          </button>
          <button
            type="button"
            onClick={() => setOneTime(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium border border-white/10 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Nur einmalig laden
          </button>
        </div>

        <div className="mt-5 pt-5 border-t border-white/5 w-full max-w-xs">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1.5">Adresse</p>
          <p className="text-sm font-medium text-white">{address}</p>
          <p className="text-xs text-gray-400">{city}</p>
          <a
            href={`https://maps.google.com/?q=${encodedQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-dark transition-colors"
          >
            In Google Maps öffnen
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
