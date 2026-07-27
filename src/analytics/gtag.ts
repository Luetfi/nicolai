// Google Analytics 4 (gtag.js) — wird ausschließlich nach ausdrücklicher
// Einwilligung ("Statistik"-Kategorie im Consent-System) geladen. Niemals im
// Prerender (Puppeteer setzt window.__PRERENDER__).

export const GA_MEASUREMENT_ID = 'G-4XG60YDMHY';

const SCRIPT_ID = 'ga-gtag';
const DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}`;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __PRERENDER__?: boolean;
  }
}

let loaded = false;

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    // Kanonischer gtag-Shim — muss das arguments-Objekt pushen (wie im
    // offiziellen Google-Snippet), damit gtag.js es korrekt verarbeitet.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    } as (...args: unknown[]) => void;
  }
}

function setDisableFlag(value: boolean) {
  (window as unknown as Record<string, unknown>)[DISABLE_KEY] = value;
}

/** Lädt gtag.js und initialisiert GA4. Idempotent. */
export function loadGa() {
  if (typeof window === 'undefined') return;
  if (window.__PRERENDER__) return; // niemals beim Build/Prerender feuern

  setDisableFlag(false); // ggf. vorherigen Widerruf in dieser Sitzung aufheben

  if (loaded || document.getElementById(SCRIPT_ID)) {
    loaded = true;
    return;
  }

  ensureGtagStub();

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag!('js', new Date());
  // send_page_view: false — Seitenaufrufe werden für diese SPA manuell bei
  // jedem Routenwechsel gesendet (siehe trackPageView), sonst Doppelzählung.
  window.gtag!('config', GA_MEASUREMENT_ID, { send_page_view: false });

  loaded = true;
}

/** Deaktiviert das Tracking und entfernt gesetzte GA-Cookies (Widerruf). */
export function disableGa() {
  if (typeof window === 'undefined') return;
  setDisableFlag(true);
  removeGaCookies();
}

function removeGaCookies() {
  const host = window.location.hostname;
  const domains = new Set<string>([host, `.${host}`]);
  const parts = host.split('.');
  if (parts.length > 2) domains.add(`.${parts.slice(-2).join('.')}`);

  for (const raw of document.cookie.split(';')) {
    const name = raw.split('=')[0]?.trim();
    if (!name) continue;
    if (name.startsWith('_ga') || name === '_gid' || name === '_gat') {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      for (const domain of domains) {
        document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  }
}

/** Sendet einen page_view. Wird bei jedem Routenwechsel aufgerufen. */
export function trackPageView(path: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
