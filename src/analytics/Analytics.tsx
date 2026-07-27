import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useConsent } from '../hooks/useConsent';
import { loadGa, disableGa, trackPageView } from './gtag';

/**
 * Steuert Google Analytics anhand der "Statistik"-Einwilligung.
 * Rendert nichts. Muss innerhalb von Router + ConsentProvider stehen.
 */
export function Analytics() {
  const { analytics } = useConsent();
  const location = useLocation();
  const wasEnabled = useRef(false);

  // Consent an/aus
  useEffect(() => {
    if (analytics) {
      loadGa();
    } else if (wasEnabled.current) {
      // war in dieser Sitzung aktiv und wurde widerrufen
      disableGa();
    }
    wasEnabled.current = analytics;
  }, [analytics]);

  // Seitenaufrufe bei jedem Routenwechsel (nur mit Einwilligung)
  useEffect(() => {
    if (!analytics) return;
    // Minimaler Timeout, damit Helmet den neuen document.title gesetzt hat
    const id = window.setTimeout(() => {
      trackPageView(location.pathname + location.search);
    }, 60);
    return () => window.clearTimeout(id);
  }, [analytics, location.pathname, location.search]);

  return null;
}
