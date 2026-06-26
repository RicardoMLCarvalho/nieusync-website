import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path;

  const mainLinks = [
    { to: '/',         label: 'Início' },
    { to: '/sobre',    label: 'Sobre Nós' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/blog',     label: 'Blog' },
    { to: '/contacto', label: 'Contactos' },
  ];

  const navLinkStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '14px',
    color: active ? 'var(--purple)' : 'var(--blue)',
    padding: '8px 14px',
    borderRadius: '6px',
    position: 'relative',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '44px',
  });

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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="logo_new.png" alt="NIEUSYNC" style={{ display: 'block', height: '120px', width: 'auto' }} />
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={navLinkStyle(isActive(link.to))}
                onMouseEnter={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--purple)'; }}
                onMouseLeave={(e) => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; }}
              >
                {link.label}
                {isActive(link.to) && (
                  <span style={{ position: 'absolute', bottom: '2px', left: '14px', right: '14px', height: '2px', borderRadius: '1px', background: 'var(--blue)' }} />
                )}
              </Link>
            ))}
          </div>

          <Link to="/contacto" className="btn-gradient desktop-nav" style={{ fontSize: '12px', padding: '12px 24px' }}>
            Agendar Consulta
          </Link>

          {/* Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: 'block', width: '24px', height: '2px', background: 'var(--blue)', borderRadius: '2px' }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1001 }}
          onClick={() => setMobileOpen(false)}
        />
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
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
          style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'var(--white)', fontSize: '28px', cursor: 'pointer', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}
        >
          ×
        </button>

        {mainLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px',
              color: 'var(--white)', padding: '12px 16px', borderRadius: '8px',
              textDecoration: 'none',
              background: isActive(link.to) ? 'rgba(255,255,255,0.12)' : 'transparent',
              transition: 'background 0.2s ease', minHeight: '44px', display: 'flex', alignItems: 'center',
            }}
          >
            {link.label}
          </Link>
        ))}

        <Link to="/contacto" className="btn-gradient" style={{ marginTop: '20px', textAlign: 'center' }}>
          Agendar Consulta
        </Link>
      </div>

      <style>{`
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
