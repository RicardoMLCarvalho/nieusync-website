import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { WhatsAppButton, ScrollProgressBar, CookieBanner } from './components/GlobalComponents';

const Home                 = lazy(() => import('./pages/Home'));
const Servicos             = lazy(() => import('./pages/Servicos'));
const Sobre                = lazy(() => import('./pages/Sobre'));
const Blog                 = lazy(() => import('./pages/Blog'));
const ArticlePage          = lazy(() => import('./pages/ArticlePage'));
const Contacto             = lazy(() => import('./pages/Contacto'));
const AvisosLegais         = lazy(() => import('./pages/AvisosLegais'));
const CodigoConduta        = lazy(() => import('./pages/CodigoConduta'));
const TermosCondicoes      = lazy(() => import('./pages/TermosCondicoes'));
const PoliticaCookies      = lazy(() => import('./pages/PoliticaCookies'));
const Privacidade          = lazy(() => import('./pages/Privacidade'));
const PoliticaUsoAceitavel = lazy(() => import('./pages/PoliticaUsoAceitavel'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif', color: 'var(--purple)', fontSize: '15px',
    }}>
      A carregar...
    </div>
  );
}

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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                        element={<Home />} />
          <Route path="/servicos"                element={<Servicos />} />
          <Route path="/sobre"                   element={<Sobre />} />
          <Route path="/blog"                    element={<Blog />} />
          <Route path="/blog/:slug"              element={<ArticlePage />} />
          <Route path="/contacto"                element={<Contacto />} />
          <Route path="/avisos-legais"           element={<AvisosLegais />} />
          <Route path="/codigo-conduta"          element={<CodigoConduta />} />
          <Route path="/termos-condicoes"        element={<TermosCondicoes />} />
          <Route path="/politica-cookies"        element={<PoliticaCookies />} />
          <Route path="/privacidade"             element={<Privacidade />} />
          <Route path="/politica-uso-aceitavel"  element={<PoliticaUsoAceitavel />} />
          <Route path="*"                        element={<Home />} />
        </Routes>
      </Suspense>
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