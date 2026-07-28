import { useEffect } from 'react';
import { kindFromHref, sendContactClick } from './contactClicks';

/**
 * Zählt Klicks auf Telefon-, WhatsApp- und E-Mail-Links.
 *
 * Ein einziger delegierter Listener auf document deckt alle Kontaktlinks der
 * Seite ab — Schnellkontakt-Leiste, Footer, Header, Kontaktseite, Standortseiten
 * und alles, was künftig dazukommt. Rendert nichts.
 */
export function ContactClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      // Klicks mit Modifier (neuer Tab) trotzdem zählen — die Absicht zählt.
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      const href = anchor?.getAttribute('href');
      if (!href) return;

      const kind = kindFromHref(href);
      if (kind) {
        sendContactClick(kind);
      }
    }

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
