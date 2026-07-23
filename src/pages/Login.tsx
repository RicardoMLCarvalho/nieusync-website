import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'NIEUSYNC · Área Reservada — Entrar';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError('Email ou palavra-passe incorretos.');
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('estado')
        .eq('id', userId)
        .maybeSingle();

      if (profileData?.estado === 'cancelada') {
        await supabase.auth.signOut();
        setError('Esta conta foi cancelada. Contacte-nos se pretender reverter o pedido.');
        setLoading(false);
        return;
      }
    }

    navigate('/portal');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-main)', padding: '24px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '40px 36px' }}>
        <Link to="/" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img src="/logo_new.png" alt="NIEUSYNC" style={{ height: '72px', width: 'auto' }} />
        </Link>
        <h1 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '8px', color: 'var(--blue)' }}>
          Área Reservada
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(35,56,119,0.60)', marginBottom: '28px', fontSize: '15px' }}>
          Entre na sua conta de cliente NIEUSYNC.
        </p>
        {error && (
          <div style={{ background: 'rgba(229,62,62,0.10)', border: '1px solid rgba(229,62,62,0.30)', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
            <p style={{ color: '#e53e3e', fontSize: '14px', margin: 0 }}>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@empresa.pt" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="password">Palavra-passe</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '4px' }}>
            {loading ? 'A entrar...' : 'Entrar →'}
          </button>
        </form>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '13px', flexWrap: 'wrap', gap: '8px' }}>
          <Link to="/recuperar-password" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>
            Esqueceu a palavra-passe?
          </Link>
          <Link to="/registo" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>
            Criar conta
          </Link>
        </div>
      </div>
    </main>
  );
}