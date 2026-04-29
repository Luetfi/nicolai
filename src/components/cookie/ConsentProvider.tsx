import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  ConsentContext,
  SCHEMA_VERSION,
  STORAGE_KEY,
  type ConsentContextValue,
  type ConsentRecord,
} from '../../hooks/useConsent';
import { CookieBanner } from './CookieBanner';
import { CookieSettings } from './CookieSettings';

function readStored(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.v !== SCHEMA_VERSION) return null;
    if (typeof parsed.maps !== 'boolean' || typeof parsed.decidedAt !== 'string') return null;
    return parsed as ConsentRecord;
  } catch {
    return null;
  }
}

function writeStored(record: ConsentRecord) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Speicher nicht verfügbar (z. B. Privatmodus) – Entscheidung nur für die Sitzung
  }
}

interface ConsentProviderProps {
  children: ReactNode;
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [initialStored] = useState(() => readStored());
  const [decided, setDecided] = useState(() => initialStored !== null);
  const [maps, setMaps] = useState(() => initialStored?.maps ?? false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const ready = true;

  const persist = useCallback((next: { maps: boolean }) => {
    const record: ConsentRecord = {
      v: SCHEMA_VERSION,
      decidedAt: new Date().toISOString(),
      maps: next.maps,
    };
    writeStored(record);
    setMaps(next.maps);
    setDecided(true);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ maps: true });
    setSettingsOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ maps: false });
    setSettingsOpen(false);
  }, [persist]);

  const saveSelection = useCallback(
    (next: { maps: boolean }) => {
      persist(next);
      setSettingsOpen(false);
    },
    [persist],
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      ready,
      decided,
      maps,
      acceptAll,
      rejectAll,
      saveSelection,
      openSettings,
      closeSettings,
      settingsOpen,
    }),
    [
      ready,
      decided,
      maps,
      acceptAll,
      rejectAll,
      saveSelection,
      openSettings,
      closeSettings,
      settingsOpen,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <CookieBanner />
      <CookieSettings />
    </ConsentContext.Provider>
  );
}
