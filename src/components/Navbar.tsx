import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sobreSubmenu = [
  { to: '/sobre', label: 'Sobre Nós' },
  { to: '/avisos-legais', label: 'Avisos Legais' },
  { to: '/codigo-conduta', label: 'Código de Conduta' },
  { to: '/termos-condicoes', label: 'Termos e Condições' },
  { to: '/politica-cookies', label: 'Política de Cookies' },
  { to: '/privacidade', label: 'Política de Privacidade' },
  { to: '/politica-uso-aceitavel', label: 'Política de Uso Aceitável' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sobreOpen, setSobreOpen] = useState(false);
  const [mobilesobreOpen, setMobilesobreOpen] = useState(false);
  const sobreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSobreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sobreRef.current && !sobreRef.current.contains(e.target as Node)) {
        setSobreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isSobreActive = sobreSubmenu.some((item) => location.pathname === item.to);

  const mainLinks = [
    { to: '/', label: 'Início' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/blog', label: 'Blog' },
    { to: '/contacto', label: 'Contactos' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: 'var(--white)',
        borderBottom: scrolled ? 'none' : '1px solid rgba(159,142,194,0.2)',
        boxShadow: scrolled ? '0 2px 24px rgba(35,56,119,0.10)' : 'none',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="logo_new.png" alt="NIEUSYNC" style={{ display: 'block', height: '150px', width: 'auto' }} />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {/* Início */}
            {mainLinks.slice(0, 1).map((link) => (
              <Link key={link.to} to={link.to}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px', color: isActive(link.to) ? 'var(--purple)' : 'var(--blue)', padding: '8px 14px', borderRadius: '6px', position: 'relative', transition: 'color 0.2s ease', textDecoration: 'none' }}
                onMouseEnter={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--purple)'; }}
                onMouseLeave={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; }}
              >
                {link.label}
                {isActive(link.to) && <span style={{ position: 'absolute', bottom: '2px', left: '14px', right: '14px', height: '2px', borderRadius: '1px', background: 'var(--blue)' }} />}
              </Link>
            ))}

            {/* Sobre Nós dropdown */}
            <div ref={sobreRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setSobreOpen((v) => !v)}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px',
                  color: isSobreActive || sobreOpen ? 'var(--purple)' : 'var(--blue)',
                  padding: '8px 14px', borderRadius: '6px', position: 'relative',
                  transition: 'color 0.2s ease', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '5px', minHeight: '44px',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--purple)'}
                onMouseLeave={(e) => { if (!isSobreActive && !sobreOpen) (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; }}
              >
                Sobre Nós
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ transition: 'transform 0.2s ease', transform: sobreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {isSobreActive && <span style={{ position: 'absolute', bottom: '2px', left: '14px', right: '14px', height: '2px', borderRadius: '1px', background: 'var(--blue)' }} />}
              </button>

              {sobreOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '0',
                  background: 'var(--white)', borderRadius: '12px', minWidth: '220px',
                  boxShadow: '0 8px 32px rgba(35,56,119,0.14)', border: '1px solid rgba(159,142,194,0.20)',
                  overflow: 'hidden', zIndex: 100,
                  animation: 'dropdownIn 0.18s ease',
                }}>
                  {sobreSubmenu.map((item, i) => (
                    <Link key={item.to} to={item.to}
                      style={{
                        display: 'block', fontFamily: 'Montserrat, sans-serif', fontWeight: i === 0 ? 700 : 400,
                        fontSize: '14px', color: isActive(item.to) ? 'var(--purple)' : 'var(--blue)',
                        padding: '11px 18px',
                        borderBottom: i < sobreSubmenu.length - 1 ? '1px solid rgba(159,142,194,0.10)' : 'none',
                        transition: 'background 0.15s ease, color 0.15s ease',
                        textDecoration: 'none',
                        background: isActive(item.to) ? 'rgba(159,142,194,0.08)' : 'transparent',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(159,142,194,0.08)'; (e.currentTarget as HTMLElement).style.color = 'var(--purple)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isActive(item.to) ? 'rgba(159,142,194,0.08)' : 'transparent'; (e.currentTarget as HTMLElement).style.color = isActive(item.to) ? 'var(--purple)' : 'var(--blue)'; }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Serviços, Blog e Contactos */}
            {mainLinks.slice(1).map((link) => (
              <Link key={link.to} to={link.to}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px', color: isActive(link.to) ? 'var(--purple)' : 'var(--blue)', padding: '8px 14px', borderRadius: '6px', position: 'relative', transition: 'color 0.2s ease', textDecoration: 'none' }}
                onMouseEnter={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--purple)'; }}
                onMouseLeave={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; }}
              >
                {link.label}
                {isActive(link.to) && <span style={{ position: 'absolute', bottom: '2px', left: '14px', right: '14px', height: '2px', borderRadius: '1px', background: 'var(--blue)' }} />}
              </Link>
            ))}
          </div>

          <Link to="/contacto" className="btn-gradient desktop-nav" style={{ fontSize: '12px', padding: '12px 24px' }}>
            Agendar Consulta
          </Link>

          {/* Hamburger */}
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ display: 'block', width: '24px', height: '2px', background: 'var(--blue)', borderRadius: '2px' }} />)}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1001 }} onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px',
        background: 'var(--grad-subtle)', zIndex: 1002,
        transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '4px',
        overflowY: 'auto',
      }}>
        <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu"
          style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'var(--white)', fontSize: '28px', cursor: 'pointer', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
          ×
        </button>

        {/* Início */}
        {mainLinks.slice(0, 1).map((link) => (
          <Link key={link.to} to={link.to}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--white)', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', background: isActive(link.to) ? 'rgba(255,255,255,0.12)' : 'transparent', transition: 'background 0.2s ease', minHeight: '44px', display: 'flex', alignItems: 'center' }}>
            {link.label}
          </Link>
        ))}

        {/* Sobre Nós accordion */}
        <div>
          <button
            onClick={() => setMobilesobreOpen((v) => !v)}
            style={{ width: '100%', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--white)', padding: '12px 16px', borderRadius: '8px', background: isSobreActive || mobilesobreOpen ? 'rgba(255,255,255,0.12)' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '44px', transition: 'background 0.2s ease' }}>
            Sobre Nós
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
              style={{ transition: 'transform 0.2s ease', transform: mobilesobreOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {mobilesobreOpen && (
            <div style={{ paddingLeft: '16px', marginTop: '4px' }}>
              {sobreSubmenu.map((item) => (
                <Link key={item.to} to={item.to}
                  style={{ display: 'flex', alignItems: 'center', fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.85)', padding: '9px 14px', borderRadius: '6px', textDecoration: 'none', background: isActive(item.to) ? 'rgba(255,255,255,0.10)' : 'transparent', minHeight: '40px', transition: 'background 0.2s ease' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Serviços, Blog e Contactos */}
        {mainLinks.slice(1).map((link) => (
          <Link key={link.to} to={link.to}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--white)', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', background: isActive(link.to) ? 'rgba(255,255,255,0.12)' : 'transparent', transition: 'background 0.2s ease', minHeight: '44px', display: 'flex', alignItems: 'center' }}>
            {link.label}
          </Link>
        ))}

        <Link to="/contacto" className="btn-gradient" style={{ marginTop: '20px', textAlign: 'center' }}>
          Agendar Consulta
        </Link>
      </div>

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
