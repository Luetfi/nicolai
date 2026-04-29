import { createContext, useContext } from 'react';

export const STORAGE_KEY = 'nicolai_consent_v1';
export const SCHEMA_VERSION = 1 as const;

export type ConsentRecord = {
  v: typeof SCHEMA_VERSION;
  decidedAt: string;
  maps: boolean;
};

export type ConsentContextValue = {
  ready: boolean;
  decided: boolean;
  maps: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  saveSelection: (next: { maps: boolean }) => void;
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
