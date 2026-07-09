import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'NIEUSYNC · Área Reservada — Recuperar palavra-passe';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (resetError) {
      setError('Não foi possível enviar o email de recuperação. Tente novamente.');
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-main)', padding: '24px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '40px 36px' }}>
        <Link to="/" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img src="logo_new.png" alt="NIEUSYNC" style={{ height: '64px', width: 'auto' }} />
        </Link>

        <h1 style={{ fontSize: '26px', textAlign: 'center', marginBottom: '8px', color: 'var(--blue)' }}>
          Recuperar palavra-passe
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(35,56,119,0.60)', marginBottom: '28px', fontSize: '15px' }}>
          Enviaremos um link de recuperação para o seu email.
        </p>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✓</div>
            <h3 style={{ color: 'var(--blue)', marginBottom: '10px', fontSize: '20px' }}>Email enviado</h3>
            <p style={{ color: 'rgba(35,56,119,0.65)', fontSize: '14px', marginBottom: '24px' }}>
              Verifique a sua caixa de entrada (e a pasta de spam). O link expira em breve.
            </p>
            <Link to="/login" className="btn-gradient" style={{ display: 'inline-flex' }}>
              Voltar ao início
            </Link>
          </div>
        ) : (
          <>
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
              <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '4px' }}>
                {loading ? 'A enviar...' : 'Enviar link de recuperação'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px' }}>
              <Link to="/login" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>
                Voltar ao início
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
