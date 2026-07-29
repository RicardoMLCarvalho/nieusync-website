import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../i18n';

export default function About() {
  const t = useT('about');

  useEffect(() => {
    document.title = t.documentTitle;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.stagger-child').forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 0.10}s`;
              child.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.10 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [t.documentTitle]);

  const valueIcons = [
    (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><circle cx="12" cy="12" r="10" stroke="url(#v1)" /><path stroke="url(#v1)" d="M8 12l3 3 5-5" /></svg>),
    (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><path stroke="url(#v2)" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" stroke="url(#v2)" /></svg>),
    (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><path stroke="url(#v3)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
    (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><polyline stroke="url(#v4)" points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline stroke="url(#v4)" points="16 7 22 7 22 13" /></svg>),
  ];

  const values = t.values.items.map((item, i) => ({ icon: valueIcons[i], ...item }));

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-main)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {[{ size: 300, top: '-80px', right: '-80px' }, { size: 200, bottom: '-60px', left: '10%' }].map((c, i) => (
          <div key={i} style={{ position: 'absolute', width: c.size, height: c.size, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.10)', top: (c as any).top, right: (c as any).right, bottom: (c as any).bottom, left: (c as any).left, pointerEvents: 'none' }} />
        ))}
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <span className="section-label section-label-white">{t.hero.label}</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '20px' }}>{t.hero.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '580px', margin: '0 auto', fontSize: '18px' }}>
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--white)', padding: '100px 0' }}>
        <div className="container animate-on-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="mission-grid">
            <div>
              <span className="section-label">{t.mission.label}</span>
              <div className="accent-line" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
              <h2 style={{ color: 'var(--blue)', marginBottom: '24px' }}>{t.mission.title}</h2>
              <div style={{ borderLeft: '4px solid var(--purple)', paddingLeft: '24px', marginBottom: '28px', maxWidth: '680px' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '18px', color: 'var(--blue)', lineHeight: 1.70 }}>
                  {t.mission.quote}
                </p>
              </div>
              <p style={{ color: 'rgba(35,56,119,0.70)' }}>
                {t.mission.body}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {t.mission.stats.map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center', padding: '24px', background: 'var(--bg)', borderRadius: '12px' }}>
                  <div className="gradient-text" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '36px', marginBottom: '6px' }}>{value}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(35,56,119,0.65)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .mission-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">{t.values.label}</span>
            <div className="accent-line accent-line-center" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
            <h2 style={{ color: 'var(--blue)' }}>{t.values.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }} className="values-grid animate-on-scroll">
            {values.map(({ icon, title, description }) => (
              <div key={title} className="card stagger-child animate-on-scroll" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '4px' }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--blue)', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .values-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

        {/* Why NIEUSYNC */}
  <section style={{ background: 'var(--white)', padding: '100px 0' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '55% 42%', gap: '64px', alignItems: 'center' }} className="why-grid animate-on-scroll">
        <div>
          <span className="section-label">{t.why.label}</span>
          <div className="accent-line" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
          <h2 style={{ color: 'var(--blue)', marginBottom: '20px' }}>{t.why.title}</h2>
          <p style={{ color: 'rgba(35,56,119,0.75)', marginBottom: '36px' }}>
            {t.why.body}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {t.why.items.map(({ title, description }) => (
            <div key={title} className="stagger-child animate-on-scroll" style={{ borderLeft: '3px solid var(--purple)', paddingLeft: '18px' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--blue)', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)' }}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`@media (max-width: 768px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
  
  {/* CTA Final */}
  <section style={{ background: 'var(--grad-subtle)', padding: '80px 0', textAlign: 'center' }}>
    <div className="container animate-on-scroll">
      <h2 style={{ color: 'var(--white)', marginBottom: '16px' }}>{t.cta.title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.70)', maxWidth: '480px', margin: '0 auto 36px' }}>
        {t.cta.subtitle}
      </p>
      <Link to="/demo/contact" className="btn-gradient" style={{ padding: '16px 40px' }}>
        {t.cta.button}
      </Link>
    </div>
  </section>
      </main>
  );
}
