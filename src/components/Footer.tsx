import { Link } from 'react-router-dom';

function LinkedInIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}
function InstagramIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
}
function FacebookIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
}

const colTitle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: '11px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.38)',
  letterSpacing: '0.12em',
  marginBottom: '14px',
  textAlign: 'center',
};

const lnk: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 400,
  fontSize: '13px',
  color: 'rgba(255,255,255,0.70)',
  marginBottom: '8px',
  transition: 'color 0.2s ease',
  textDecoration: 'none',
  lineHeight: 1.4,
  textAlign: 'center',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hoverPurple = (e: React.MouseEvent) => (e.currentTarget as HTMLElement).style.color = 'var(--purple)';
  const unhoverLink = (e: React.MouseEvent) => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.70)';

  const divider = (
    <div style={{ width: '1px', background: 'rgba(255,255,255,0.10)', alignSelf: 'stretch', flexShrink: 0 }} />
  );

  return (
    <footer style={{ background: '#233877' }}>
      <div className="container" style={{ padding: '40px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0' }} className="footer-flex">

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minWidth: '160px', paddingRight: '32px' }}>
            <img src="/assets/logo-nieusync-white.png" alt="NIEUSYNC" width="130" style={{ display: 'block', marginBottom: '14px' }} />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {[
                { href: 'https://www.linkedin.com/company/nieusync', Icon: LinkedInIcon },
                { href: 'https://www.instagram.com/nieusync', Icon: InstagramIcon },
                { href: 'https://www.facebook.com/nieusync', Icon: FacebookIcon },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--purple)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {divider}

          {/* Serviços */}
          <div style={{ flex: 1, padding: '0 28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '30px' }}>
            <p style={colTitle}>Serviços</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                {[
                  { to: '/servicos#direito', label: 'Direito Empresarial' },
                  { to: '/servicos#gestao', label: 'Gestão Estratégica' },
                  { to: '/servicos#marketing', label: 'Marketing Digital' },
                ].map(({ to, label }) => (
                  <Link key={label} to={to} style={lnk} onMouseEnter={hoverPurple} onMouseLeave={unhoverLink}>{label}</Link>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {[
                  { to: '/servicos#financas', label: 'Finanças & Contabilidade' },
                  { to: '/servicos#tecnologias', label: 'Tecnologias de Informação' },
                ].map(({ to, label }) => (
                  <Link key={label} to={to} style={lnk} onMouseEnter={hoverPurple} onMouseLeave={unhoverLink}>{label}</Link>
                ))}
              </div>
            </div>
          </div>

          {divider}

          {/* Contacto */}
          <div style={{ flexShrink: 0, minWidth: '180px', padding: '0 28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '30px' }}>
            <p style={colTitle}>Contacto</p>
            {[
              { label: '(+351) 269 030 096', href: 'tel:+351269030096' },
              { label: '(+351) 933 644 596', href: 'tel:+351933644596' },
              { label: 'geral@nieusync.com', href: 'mailto:geral@nieusync.com' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={lnk} onMouseEnter={hoverPurple} onMouseLeave={unhoverLink}>{label}</a>
            ))}
          </div>

          {divider}

          {/* Legal */}
          <div style={{ flex: 1, paddingLeft: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '30px' }}>
            <p style={colTitle}>Legal</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                {[
                  { to: '/avisos-legais', label: 'Avisos Legais' },
                  { to: '/codigo-conduta', label: 'Código de Conduta' },
                  { to: '/termos-condicoes', label: 'Termos e Condições' },
                ].map(({ to, label }) => (
                  <Link key={to} to={to} style={lnk} onMouseEnter={hoverPurple} onMouseLeave={unhoverLink}>{label}</Link>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {[
                  { to: '/politica-cookies', label: 'Política de Cookies' },
                  { to: '/privacidade', label: 'Política de Privacidade' },
                  { to: '/politica-uso-aceitavel', label: 'Política de Uso Aceitável' },
                ].map(({ to, label }) => (
                  <Link key={to} to={to} style={lnk} onMouseEnter={hoverPurple} onMouseLeave={unhoverLink}>{label}</Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '40px', padding: '16px 0', background: '#233877' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
            © {currentYear} NIEUSYNC — Todos os direitos reservados.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-flex { flex-wrap: wrap !important; gap: 24px !important; }
          .footer-flex > div { min-width: calc(50% - 12px) !important; padding: 0 !important; }
        }
        @media (max-width: 480px) {
          .footer-flex > div { min-width: 100% !important; }
        }
      `}</style>
    </footer>
  );
}
