import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { I18nProvider } from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { WhatsAppButton, ScrollProgressBar, CookieBanner } from './components/GlobalComponents';

const Landing              = lazy(() => import('./pages/Landing'));

const Home                 = lazy(() => import('./pages/Home'));
const Services             = lazy(() => import('./pages/Services'));
const About                = lazy(() => import('./pages/About'));
const Blog                 = lazy(() => import('./pages/Blog'));
const ArticlePage          = lazy(() => import('./pages/ArticlePage'));
const Contact              = lazy(() => import('./pages/Contact'));
const LegalNotices         = lazy(() => import('./pages/LegalNotices'));
const CodeOfConduct        = lazy(() => import('./pages/CodeOfConduct'));
const Terms                = lazy(() => import('./pages/Terms'));
const CookiePolicy         = lazy(() => import('./pages/CookiePolicy'));
const Privacy              = lazy(() => import('./pages/Privacy'));
const AcceptableUse        = lazy(() => import('./pages/AcceptableUse'));

// ponytail: URLs antigas em português continuam indexadas — apontam para o site em /demo
const LEGACY_ROUTES: Record<string, string> = {
  '/servicos': '/demo/services',
  '/sobre': '/demo/about',
  '/contacto': '/demo/contact',
  '/avisos-legais': '/demo/legal-notices',
  '/codigo-conduta': '/demo/code-of-conduct',
  '/termos-condicoes': '/demo/terms',
  '/politica-cookies': '/demo/cookie-policy',
  '/privacidade': '/demo/privacy',
  '/politica-uso-aceitavel': '/demo/acceptable-use',
};

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-[15px] text-purple">
      ...
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

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing "brevemente" — sem Navbar/Footer */}
          <Route path="/" element={<Suspense fallback={null}><Landing /></Suspense>} />

          {Object.entries(LEGACY_ROUTES).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}

          {/* Site completo, pré-lançamento */}
          <Route path="/demo" element={<MarketingLayout />}>
            <Route index                     element={<Home />} />
            <Route path="services"           element={<Services />} />
            <Route path="about"              element={<About />} />
            <Route path="blog"               element={<Blog />} />
            <Route path="blog/:slug"         element={<ArticlePage />} />
            <Route path="contact"            element={<Contact />} />
            <Route path="legal-notices"      element={<LegalNotices />} />
            <Route path="code-of-conduct"    element={<CodeOfConduct />} />
            <Route path="terms"              element={<Terms />} />
            <Route path="cookie-policy"      element={<CookiePolicy />} />
            <Route path="privacy"            element={<Privacy />} />
            <Route path="acceptable-use"     element={<AcceptableUse />} />
            <Route path="*"                  element={<Navigate to="/demo" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
