import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/portal', label: 'Resumo', end: true,
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>,
  },
  {
    to: '/portal/conta', label: 'Conta',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  },
  {
    to: '/portal/pacotes', label: 'Pacotes & Faturação',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
  },
  {
    to: '/portal/documentos', label: 'Documentação',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>,
  },
  {
    to: '/portal/consultas', label: 'Consultas',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  },
];

export default function PortalLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [empresaNome, setEmpresaNome] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');

  useEffect(() => { document.title = 'NIEUSYNC · Área Reservada'; }, []);

  useEffect(() => {
  if (!user) return;
  supabase.from('profiles').select('empresa_nome, nome_completo').eq('id', user.id).maybeSingle().then(({ data }) => {
    if (data) {
      setEmpresaNome(data.empresa_nome);
      setNomeCompleto(data.nome_completo);
    }
  });
}, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', fontFamily: 'Montserrat, sans-serif' }}>A carregar...</div>;
  }
  if (!user) { navigate('/login'); return null; }

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
    fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px',
    color: isActive ? 'var(--white)' : 'rgba(255,255,255,0.70)',
    background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
    textDecoration: 'none', transition: 'background 0.2s ease, color 0.2s ease', minHeight: '44px',
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <aside className="portal-sidebar" style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px', background: 'var(--grad-main)', padding: '28px 20px', display: 'flex', flexDirection: 'column', zIndex: 100 }}>
        <Link to="/" style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <img src="/assets/logo-nieusync-white.png" alt="NIEUSYNC" style={{ height: '160px', width: 'auto' }} />
        </Link>
        <div style={{ padding: '0 16px 24px', borderBottom: '1px solid rgba(255,255,255,0.12)', marginBottom: '16px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: '4px' }}>Cliente</p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--white)', wordBreak: 'break-word' }}>{empresaNome || user.email}</p>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} style={({ isActive }) => navLinkStyle(isActive)}>
              {item.icon}{item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.70)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '16px', minHeight: '44px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Sair
        </button>
      </aside>

      <div className="portal-topbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '60px', background: 'var(--grad-main)', display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', zIndex: 100 }}>
        <img src="/assets/logo_white_1080x1080_horizontal.png" alt="NIEUSYNC" style={{ height: '75px', width: 'auto' }} />
        <button onClick={() => setMobileOpen(true)} aria-label="Abrir menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'var(--white)', borderRadius: '2px' }} />)}
        </button>
      </div>

      {mobileOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 }} onClick={() => setMobileOpen(false)} />}

      <div className="portal-drawer" style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', background: 'var(--grad-main)', zIndex: 201, padding: '24px 20px', display: 'flex', flexDirection: 'column', transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease', overflowY: 'auto' }}>
        <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu" style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'var(--white)', fontSize: '28px', cursor: 'pointer', minWidth: '44px', minHeight: '44px' }}>×</button>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, marginTop: '16px' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMobileOpen(false)} style={({ isActive }) => navLinkStyle(isActive)}>
              {item.icon}{item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.70)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '16px', minHeight: '44px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Sair
        </button>
      </div>

      <div className="portal-content" style={{ paddingLeft: '260px', minHeight: '100vh' }}>
        <div style={{ padding: '40px' }} className="portal-inner"><Outlet /></div>
      </div>

      <style>{`@media (max-width: 768px) { .portal-sidebar { display: none !important; } .portal-topbar { display: flex !important; } .portal-content { padding-left: 0 !important; padding-top: 60px; } .portal-inner { padding: 24px 20px !important; } }`}</style>
    </div>
  );
}
