import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Home, Leistungen, Fahrschule, Theorieunterricht, Neuigkeiten, Kontakt } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<Leistungen />} />
          <Route path="/fahrschule" element={<Fahrschule />} />
          <Route path="/theorieunterricht" element={<Theorieunterricht />} />
          <Route path="/neuigkeiten" element={<Neuigkeiten />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
