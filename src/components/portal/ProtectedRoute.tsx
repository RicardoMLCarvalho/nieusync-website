import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

// Guarda de rota: redireciona para /login se não houver sessão.
// Enquanto carrega a sessão, mostra um loader simples. Quando
// autenticado, renderiza os children (o layout do portal, que por
// sua vez tem o seu próprio <Outlet /> para as sub-rotas).
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>
        A carregar...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
