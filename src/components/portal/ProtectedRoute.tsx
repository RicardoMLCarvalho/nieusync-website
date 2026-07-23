import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (!user) { setCheckingStatus(false); return; }

    let active = true;

    const checkStatus = async () => {
      const { data } = await supabase.from('profiles').select('estado').eq('id', user.id).maybeSingle();
      if (!active) return;
      if (data?.estado === 'cancelada') {
        setIsCancelled(true);
        await supabase.auth.signOut();
      }
      setCheckingStatus(false);
    };

    checkStatus();

    // Repete a verificação a cada 5 minutos, para apanhar sessões já abertas
    const interval = setInterval(checkStatus, 5 * 60 * 1000);

    return () => { active = false; clearInterval(interval); };
  }, [user]);

  if (loading || checkingStatus) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>
        A carregar...
      </div>
    );
  }

  if (!user || isCancelled) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

