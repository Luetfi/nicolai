import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ConsentProvider } from './components/cookie';
import { Home, Leistungen, Fahrschule, Theorieunterricht, Neuigkeiten, Kontakt, Impressum, Datenschutz } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ConsentProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/fahrschule" element={<Fahrschule />} />
            <Route path="/theorieunterricht" element={<Theorieunterricht />} />
            <Route path="/neuigkeiten" element={<Neuigkeiten />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </Layout>
      </ConsentProvider>
    </BrowserRouter>
  );
}

export default App;
