import { createContext, useContext } from 'react';

export const STORAGE_KEY = 'nicolai_consent_v1';
// v2: neue Kategorie "analytics" (Google Analytics). Alte v1-Datensätze werden
// verworfen → Nutzer entscheiden erneut (DSGVO-konform bei neuer Kategorie).
export const SCHEMA_VERSION = 2 as const;

export type ConsentSelection = {
  maps: boolean;
  analytics: boolean;
};

export type ConsentRecord = ConsentSelection & {
  v: typeof SCHEMA_VERSION;
  decidedAt: string;
};

export type ConsentContextValue = {
  ready: boolean;
  decided: boolean;
  maps: boolean;
  analytics: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  saveSelection: (next: ConsentSelection) => void;
  openSettings: () => void;
  closeSettings: () => void;
  settingsOpen: boolean;
};

export const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within <ConsentProvider>');
  }
  return ctx;
}
