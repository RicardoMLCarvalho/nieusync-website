import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useT, LanguageToggle } from '../i18n';
import { BLOG_URL } from '../hooks/useArticles';

// ponytail: the client area lives in the "platform" app; set VITE_PLATFORM_URL in production
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
    { to: BLOG_URL,         label: t.links.blog, external: true },
    { to: '/demo/checkup',  label: t.links.checkup },
    { to: '/demo/contact',  label: t.links.contact },
  ];

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[1000] bg-white transition-[box-shadow,border-color] duration-300 ${
          scrolled ? 'border-b-0 shadow-[0_2px_24px_rgba(35,56,119,0.10)]' : 'border-b border-purple/20'
        }`}
      >
        <div className="container flex h-[72px] items-center justify-between">

          {/* Logo */}
          <Link to="/demo" className="flex shrink-0 items-center">
            <img src="/logo_horizontal.png" alt={t.logoAlt} className="block h-[120px] w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {mainLinks.map((link) => {
              const cls = `relative inline-flex min-h-[44px] items-center rounded-md px-[14px] py-2 text-sm font-bold transition-colors duration-200 hover:text-purple ${
                isActive(link.to) ? 'text-purple' : 'text-blue'
              }`;
              // The blog is on another domain (Ghost), hence <a> and not <Link>
              if (link.external) return <a key={link.to} href={link.to} className={cls}>{link.label}</a>;
              return (
                <Link key={link.to} to={link.to} className={cls}>
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute inset-x-[14px] bottom-0.5 h-0.5 rounded-sm bg-blue" />
                  )}
                </Link>
              );
            })}
            <LanguageToggle className="ml-2 text-blue" />
          </div>

          <a href={PLATFORM_URL} className="btn-portal hidden md:inline-flex">
            {t.portal}
          </a>

          <Link to="/demo/contact" className="btn-gradient hidden px-6 py-3 text-xs md:inline-flex">
            {t.bookConsultation}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label={t.openMenu}
            aria-expanded={mobileOpen}
            className="flex min-h-[44px] min-w-[44px] cursor-pointer flex-col items-center justify-center gap-[5px] border-none bg-transparent p-2 md:hidden"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-0.5 w-6 rounded-sm bg-blue" />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[1001] bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[1002] flex w-[280px] flex-col gap-1 overflow-y-auto bg-grad-main p-6 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label={t.closeMenu}
          className="mb-2 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center self-end border-none bg-transparent text-[28px] text-white"
        >
          ×
        </button>

        {mainLinks.map((link) => {
          const cls = `flex min-h-[44px] items-center rounded-lg px-4 py-3 text-base font-bold text-white transition-colors duration-200 ${
            isActive(link.to) ? 'bg-white/[0.12]' : 'bg-transparent'
          }`;
          if (link.external) return <a key={link.to} href={link.to} className={cls}>{link.label}</a>;
          return <Link key={link.to} to={link.to} className={cls}>{link.label}</Link>;
        })}

        <LanguageToggle className="ml-4 mt-3 self-start text-white" />

        <a href={PLATFORM_URL} className="btn-gradient mt-2 text-center">
          {t.portal}
        </a>

        <Link to="/demo/contact" className="btn-gradient mt-5 text-center">
          {t.bookConsultation}
        </Link>
      </div>
    </>
  );
}
