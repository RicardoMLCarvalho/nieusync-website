import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { WhatsAppButton, ScrollProgressBar, CookieBanner } from './components/GlobalComponents';
import Home from './pages/Home';
import Servicos from './pages/Servicos';
import Sobre from './pages/Sobre';
import Blog from './pages/Blog';
import ArticlePage from './pages/ArticlePage';
import Contacto from './pages/Contacto';
import AvisosLegais from './pages/AvisosLegais';
import CodigoConduta from './pages/CodigoConduta';
import TermosCondicoes from './pages/TermosCondicoes';
import PoliticaCookies from './pages/PoliticaCookies';
import Privacidade from './pages/Privacidade';
import PoliticaUsoAceitavel from './pages/PoliticaUsoAceitavel';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/avisos-legais" element={<AvisosLegais />} />
        <Route path="/codigo-conduta" element={<CodigoConduta />} />
        <Route path="/termos-condicoes" element={<TermosCondicoes />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/politica-uso-aceitavel" element={<PoliticaUsoAceitavel />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}