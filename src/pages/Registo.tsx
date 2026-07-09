import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Registo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ empresa_nome: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'NIEUSYNC · Área Reservada — Criar conta';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres.');
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
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        empresa_nome: form.empresa_nome,
        email: form.email,
      });

      if (profileError) {
        setError('Conta criada, mas houve um problema a inicializar o perfil. Contacte-nos.');
        setLoading(false);
        return;
      }
    }

    navigate('/portal');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-main)', padding: '24px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
        <Link to="/" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img src="logo_new.png" alt="NIEUSYNC" style={{ height: '64px', width: 'auto' }} />
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
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" required autoComplete="new-password" />
          </div>
          <div>
            <label htmlFor="confirm">Confirmar palavra-passe</label>
            <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="••••••••" required autoComplete="new-password" />
          </div>
          <button type="submit" className="btn-gradient" disabled={loading} style={{ width: '100%', marginTop: '4px' }}>
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
