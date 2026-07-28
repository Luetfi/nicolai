// Anonymer Zähler für Kontaktklicks (Telefon, WhatsApp, E-Mail).
//
// Sendet ausschließlich die Art des Klicks an /api/track.php, die dort auf einen
// Monatszähler addiert wird. Keine Cookies, kein localStorage, keine IDs — daher
// bewusst NICHT an die Statistik-Einwilligung gekoppelt (anders als GA4, siehe
// gtag.ts). Nie im Prerender feuern.

export type ContactClickKind = 'phone' | 'whatsapp' | 'email';

const ENDPOINT = '/api/track.php';

/** Verhindert Doppelzählung bei Doppelklick oder Doppel-Tap. */
const DEDUPE_MS = 3000;

const lastSent = new Map<ContactClickKind, number>();

/** Leitet die Klick-Art aus einem href ab. null = kein Kontaktlink. */
export function kindFromHref(href: string): ContactClickKind | null {
  const value = href.trim().toLowerCase();
  if (value.startsWith('tel:')) return 'phone';
  if (value.startsWith('mailto:')) return 'email';
  if (value.startsWith('http')) {
    try {
      const host = new URL(value).hostname.replace(/^www\./, '');
      if (host === 'wa.me' || host === 'api.whatsapp.com') return 'whatsapp';
    } catch {
      return null;
    }
  }
  return null;
}

/** Meldet einen Kontaktklick. Fehler werden bewusst geschluckt. */
export function sendContactClick(kind: ContactClickKind): void {
  if (typeof window === 'undefined') return;
  if (window.__PRERENDER__) return;

  const now = Date.now();
  const previous = lastSent.get(kind);
  if (previous !== undefined && now - previous < DEDUPE_MS) return;
  lastSent.set(kind, now);

  const payload = JSON.stringify({ kind });

  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      if (navigator.sendBeacon(ENDPOINT, blob)) return;
    }
    // Fallback: keepalive, damit der Request den Seitenwechsel übersteht
    void fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Zählen ist Nice-to-have — niemals die Nutzeraktion beeinträchtigen
  }
}
