import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { RouteFallback } from './components/layout/RouteFallback';
import { ConsentProvider } from './components/cookie';
import { Home, Leistungen, Fahrschule, Theorieunterricht, Neuigkeiten, Kontakt, StandortEglosheim, StandortGruenbuehl, Impressum, Datenschutz } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ConsentProvider>
        <Layout>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leistungen" element={<Leistungen />} />
              <Route path="/fahrschule" element={<Fahrschule />} />
              <Route path="/theorieunterricht" element={<Theorieunterricht />} />
              <Route path="/neuigkeiten" element={<Neuigkeiten />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/fahrschule-ludwigsburg-eglosheim" element={<StandortEglosheim />} />
              <Route path="/fahrschule-ludwigsburg-gruenbuehl" element={<StandortGruenbuehl />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
            </Routes>
          </Suspense>
        </Layout>
      </ConsentProvider>
    </BrowserRouter>
  );
}

export default App;
