import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function getPasswordChecks(password: string) {
  return {
    length:  password.length >= 8,
    upper:   /[A-Z]/.test(password),
    number:  /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

function getStrengthLevel(checks: ReturnType<typeof getPasswordChecks>) {
  const passed = Object.values(checks).filter(Boolean).length;
  if (passed <= 1) return { label: 'Fraca',  color: '#e53e3e', pct: 25 };
  if (passed <= 3) return { label: 'Média',  color: '#d69e2e', pct: 65 };
  return               { label: 'Forte',  color: '#38a169', pct: 100 };
}

export default function Registo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ empresa_nome: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    document.title = 'NIEUSYNC · Área Reservada — Criar conta';
  }, []);

  const checks   = useMemo(() => getPasswordChecks(form.password), [form.password]);
  const strength = useMemo(() => getStrengthLevel(checks), [checks]);
  const isStrongEnough = Object.values(checks).filter(Boolean).length >= 2 && checks.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (e.target.name === 'password') setPasswordTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isStrongEnough) {
      setError('A palavra-passe é demasiado fraca. Cumpre pelo menos 2 dos requisitos indicados.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('As palavras-passe não coincidem.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (signUpError) {
      setError(signUpError.message === 'User already registered' ? 'Já existe uma conta com este email.' : signUpError.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      await supabase.from('profiles').upsert({
        id: userId,
        empresa_nome: form.empresa_nome,
        email: form.email,
        estado: 'ativa',
      }, { onConflict: 'id' });
    }

    navigate('/portal');
  };

  const requisitos = [
    { key: 'length',  label: 'Mínimo 8 caracteres' },
    { key: 'upper',   label: 'Uma letra maiúscula' },
    { key: 'number',  label: 'Um número' },
    { key: 'special', label: 'Um caractere especial' },
  ] as const;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-main)', padding: '24px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
        <Link to="/" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'Magistral, Montserrat, sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--blue)' }}>NIEUSYNC</span>
        </Link>

        <h1 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '8px', color: 'var(--blue)' }}>
          Criar conta
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(35,56,119,0.60)', marginBottom: '28px', fontSize: '15px' }}>
          Aceda à área reservada de clientes NIEUSYNC.
        </p>

        {error && (
          <div style={{ background: 'rgba(229,62,62,0.10)', border: '1px solid rgba(229,62,62,0.30)', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
            <p style={{ color: '#e53e3e', fontSize: '14px', margin: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="empresa_nome">Nome da empresa</label>
            <input id="empresa_nome" name="empresa_nome" type="text" value={form.empresa_nome} onChange={handleChange} placeholder="A sua empresa, Lda." required />
          </div>
          <div>
            <label htmlFor="email">Email profissional</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@empresa.pt" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="password">Palavra-passe</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres" required autoComplete="new-password" />

            {passwordTouched && (
              <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(35,56,119,0.12)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${strength.pct}%`, height: '100%', borderRadius: '3px',
                      background: strength.color, transition: 'width 0.25s ease, background 0.25s ease',
                    }} />
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', color: strength.color, minWidth: '42px' }}>
                    {strength.label}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                  {requisitos.map((r) => (
                    <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0,
                        background: checks[r.key] ? '#38a169' : 'rgba(35,56,119,0.15)',
                        color: 'var(--white)', fontSize: '9px', fontWeight: 700,
                      }}>
                        {checks[r.key] ? '✓' : ''}
                      </span>
                      <span style={{
                        fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px',
                        color: checks[r.key] ? '#38a169' : 'rgba(35,56,119,0.50)',
                        textTransform: 'none', letterSpacing: 'normal',
                      }}>
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirm">Confirmar palavra-passe</label>
            <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="••••••••" required autoComplete="new-password" />
          </div>
          <button
            type="submit"
            className="btn-gradient"
            disabled={loading || (passwordTouched && !isStrongEnough)}
            style={{ width: '100%', marginTop: '4px', opacity: (passwordTouched && !isStrongEnough) ? 0.6 : 1 }}
          >
            {loading ? 'A criar conta...' : 'Criar conta →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'rgba(35,56,119,0.60)' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}