import { lazy } from 'react';

export const Home = lazy(() => import('./Home').then((m) => ({ default: m.Home })));
export const Leistungen = lazy(() => import('./Leistungen').then((m) => ({ default: m.Leistungen })));
export const FuehrerscheinLudwigsburg = lazy(() =>
  import('./FuehrerscheinLudwigsburg').then((m) => ({ default: m.FuehrerscheinLudwigsburg })),
);
export const FuehrerscheinKlasseB = lazy(() =>
  import('./FuehrerscheinKlasseB').then((m) => ({ default: m.FuehrerscheinKlasseB })),
);
export const Motorradfuehrerschein = lazy(() =>
  import('./Motorradfuehrerschein').then((m) => ({ default: m.Motorradfuehrerschein })),
);
export const AsfAufbauseminar = lazy(() =>
  import('./AsfAufbauseminar').then((m) => ({ default: m.AsfAufbauseminar })),
);
export const Fahrschule = lazy(() => import('./Fahrschule').then((m) => ({ default: m.Fahrschule })));
export const Theorieunterricht = lazy(() => import('./Theorieunterricht').then((m) => ({ default: m.Theorieunterricht })));
export const Neuigkeiten = lazy(() => import('./Neuigkeiten').then((m) => ({ default: m.Neuigkeiten })));
export const Kontakt = lazy(() => import('./Kontakt').then((m) => ({ default: m.Kontakt })));
export const StandortEglosheim = lazy(() => import('./Standort').then((m) => ({ default: m.StandortEglosheim })));
export const StandortGruenbuehl = lazy(() => import('./Standort').then((m) => ({ default: m.StandortGruenbuehl })));
export const Impressum = lazy(() => import('./Impressum').then((m) => ({ default: m.Impressum })));
export const Datenschutz = lazy(() => import('./Datenschutz').then((m) => ({ default: m.Datenschutz })));
