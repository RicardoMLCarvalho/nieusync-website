import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useT, LanguageToggle } from '../i18n';

// ponytail: área de cliente vive na app "platform"; definir VITE_PLATFORM_URL em produção
const PLATFORM_URL = import.meta.env.VITE_PLATFORM_URL ?? 'http://localhost:5174';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const t = useT('nav');

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
    { to: '/demo',         label: t.links.home },
    { to: '/demo/about',    label: t.links.about },
    { to: '/demo/services', label: t.links.services },
    { to: '/demo/blog',     label: t.links.blog },
    { to: '/demo/contact',  label: t.links.contact },
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
          <Link to="/demo" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="logo_new.png" alt={t.logoAlt} style={{ display: 'block', height: '120px', width: 'auto' }} />
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
            <LanguageToggle style={{ color: 'var(--blue)', marginLeft: '8px' }} />
          </div>

          <a href={PLATFORM_URL} className="btn-portal desktop-nav">
            {t.portal}
          </a>

          <Link to="/demo/contact" className="btn-gradient desktop-nav" style={{ fontSize: '12px', padding: '12px 24px' }}>
            {t.bookConsultation}
          </Link>

          {/* Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label={t.openMenu}
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
          aria-label={t.closeMenu}
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

        <LanguageToggle style={{ color: 'var(--white)', alignSelf: 'flex-start', marginTop: '12px', marginLeft: '16px' }} />

        <a href={PLATFORM_URL} className="btn-gradient" style={{ marginTop: '8px', textAlign: 'center' }}>
          {t.portal}
        </a>

        <Link to="/demo/contact" className="btn-gradient" style={{ marginTop: '20px', textAlign: 'center' }}>
          {t.bookConsultation}
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