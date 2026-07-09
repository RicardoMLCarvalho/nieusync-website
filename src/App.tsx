import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/portal/ProtectedRoute';
import PortalLayout from './components/portal/PortalLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { WhatsAppButton, ScrollProgressBar, CookieBanner } from './components/GlobalComponents';

const Home                 = lazy(() => import('./pages/Home'));
const Servicos              = lazy(() => import('./pages/Servicos'));
const Sobre                 = lazy(() => import('./pages/Sobre'));
const Blog                  = lazy(() => import('./pages/Blog'));
const ArticlePage           = lazy(() => import('./pages/ArticlePage'));
const Contacto               = lazy(() => import('./pages/Contacto'));
const AvisosLegais          = lazy(() => import('./pages/AvisosLegais'));
const CodigoConduta         = lazy(() => import('./pages/CodigoConduta'));
const TermosCondicoes       = lazy(() => import('./pages/TermosCondicoes'));
const PoliticaCookies       = lazy(() => import('./pages/PoliticaCookies'));
const Privacidade           = lazy(() => import('./pages/Privacidade'));
const PoliticaUsoAceitavel  = lazy(() => import('./pages/PoliticaUsoAceitavel'));

const Login              = lazy(() => import('./pages/Login'));
const Registo            = lazy(() => import('./pages/Registo'));
const RecuperarPassword  = lazy(() => import('./pages/RecuperarPassword'));

const Resumo            = lazy(() => import('./pages/portal/Resumo'));
const Conta             = lazy(() => import('./pages/portal/Conta'));
const PacotesFaturacao  = lazy(() => import('./pages/portal/PacotesFaturacao'));
const Documentos        = lazy(() => import('./pages/portal/Documentos'));
const Consultas         = lazy(() => import('./pages/portal/Consultas'));

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif', color: 'var(--purple)', fontSize: '15px' }}>
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

// Layout do site público — com Navbar, Footer, WhatsApp, cookies
function MarketingLayout() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}

// Layout de autenticação — sem Navbar/Footer do site
function AuthLayout() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>
        A carregar...
      </div>
    );
  }

  return (
    <Routes>
      {/* Site público */}
      <Route element={<MarketingLayout />}>
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
      </Route>

      {/* Autenticação */}
      <Route element={<AuthLayout />}>
        <Route path="/login"               element={<Login />} />
        <Route path="/registo"             element={<Registo />} />
        <Route path="/recuperar-password"  element={<RecuperarPassword />} />
      </Route>

      {/* Área reservada */}
      <Route path="/portal" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
        <Route index               element={<Suspense fallback={<PageLoader />}><Resumo /></Suspense>} />
        <Route path="conta"        element={<Suspense fallback={<PageLoader />}><Conta /></Suspense>} />
        <Route path="pacotes"      element={<Suspense fallback={<PageLoader />}><PacotesFaturacao /></Suspense>} />
        <Route path="documentos"   element={<Suspense fallback={<PageLoader />}><Documentos /></Suspense>} />
        <Route path="consultas"    element={<Suspense fallback={<PageLoader />}><Consultas /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}