import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Section {
  title: string;
  content: string | string[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  docTitle: string;
}

export default function LegalPage({ title, subtitle, lastUpdated, sections, docTitle }: LegalPageProps) {
  useEffect(() => {
    document.title = `${title} | NIEUSYNC`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title]);

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link to="/sobre" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            ← Sobre Nós
          </Link>
          <h1 style={{ color: 'var(--white)', marginBottom: '12px', fontSize: 'clamp(28px,4vw,48px)' }}>{title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}>
            {subtitle} · Última actualização: {lastUpdated}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '48px', alignItems: 'start' }} className="legal-layout">
            {/* Sidebar TOC */}
            <div style={{ position: 'sticky', top: '90px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--purple)', marginBottom: '14px' }}>
                  Índice
                </p>
                <nav>
                  {sections.map((s, i) => (
                    <a key={i} href={`#section-${i}`}
                      style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(35,56,119,0.70)', padding: '6px 0', borderBottom: i < sections.length - 1 ? '1px solid rgba(159,142,194,0.10)' : 'none', textDecoration: 'none', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--purple)'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(35,56,119,0.70)'}
                    >
                      {i + 1}. {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="card" style={{ marginTop: '16px', padding: '20px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(35,56,119,0.65)', marginBottom: '14px' }}>
                  Questões sobre este documento?
                </p>
                <Link to="/contacto" className="btn-gradient" style={{ fontSize: '12px', padding: '10px 20px', display: 'inline-flex' }}>
                  Contacte-nos
                </Link>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="card" style={{ padding: '40px 48px' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(35,56,119,0.55)', marginBottom: '36px', borderBottom: '1px solid rgba(159,142,194,0.15)', paddingBottom: '20px' }}>
                  Documento: <strong style={{ color: 'var(--blue)' }}>{docTitle}</strong>
                </p>

                {sections.map((section, i) => (
                  <div key={i} id={`section-${i}`} style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--blue)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--grad-main)', color: 'var(--white)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      {section.title}
                    </h2>
                    {Array.isArray(section.content) ? (
                      <ul style={{ listStyle: 'none', paddingLeft: '38px' }}>
                        {section.content.map((item, j) => (
                          <li key={j} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '15px', color: 'rgba(35,56,119,0.75)', lineHeight: 1.80, padding: '4px 0', paddingLeft: '16px', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700 }}>·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '15px', color: 'rgba(35,56,119,0.75)', lineHeight: 1.80, paddingLeft: '38px' }}>
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}

                <div style={{ borderTop: '1px solid rgba(159,142,194,0.15)', paddingTop: '24px', marginTop: '8px' }}>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(35,56,119,0.45)' }}>
                    Para questões relacionadas com este documento, contacte-nos através do email{' '}
                    <a href="mailto:geral@nieusync.com" style={{ color: 'var(--purple)', textDecoration: 'underline' }}>geral@nieusync.com</a>
                    {' '}ou ligue-nos para o número (+351) 269 030 096.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .legal-layout { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
