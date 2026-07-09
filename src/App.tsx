import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/portal/ProtectedRoute';
import PortalLayout from './components/portal/PortalLayout';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Registo = lazy(() => import('./pages/Registo'));
const RecuperarPassword = lazy(() => import('./pages/RecuperarPassword'));
const Resumo = lazy(() => import('./pages/portal/Resumo'));
const Conta = lazy(() => import('./pages/portal/Conta'));
const PacotesFaturacao = lazy(() => import('./pages/portal/PacotesFaturacao'));
const Documentos = lazy(() => import('./pages/portal/Documentos'));
const Consultas = lazy(() => import('./pages/portal/Consultas'));

function PageLoader() {
  return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif', color: 'var(--purple)', fontSize: '15px' }}>A carregar...</div>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function AuthLayout() {
  return <><ScrollToTop /><Suspense fallback={<PageLoader />}><Outlet /></Suspense></>;
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>A carregar...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<PageLoader />}><ScrollToTop /><Home /></Suspense>} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registo" element={<Registo />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
      </Route>

      <Route path="/portal" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
        <Route index element={<Suspense fallback={<PageLoader />}><Resumo /></Suspense>} />
        <Route path="conta" element={<Suspense fallback={<PageLoader />}><Conta /></Suspense>} />
        <Route path="pacotes" element={<Suspense fallback={<PageLoader />}><PacotesFaturacao /></Suspense>} />
        <Route path="documentos" element={<Suspense fallback={<PageLoader />}><Documentos /></Suspense>} />
        <Route path="consultas" element={<Suspense fallback={<PageLoader />}><Consultas /></Suspense>} />
      </Route>

      <Route path="*" element={<Suspense fallback={<PageLoader />}><ScrollToTop /><Home /></Suspense>} />
    </Routes>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}
