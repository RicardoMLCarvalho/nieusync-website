import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useT } from '../i18n';

function ServiceSection({
  id, bg, iconEl, title, description, services, highlight, ctaText, reverse,
}: {
  id: string; bg: string; iconEl: React.ReactNode; title: string; description: string;
  services: string[]; highlight: { title: string; items: string[] }; ctaText: string; reverse?: boolean;
}) {
  return (
    <section id={id} style={{ background: bg, padding: '100px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start', direction: reverse ? 'rtl' : 'ltr' }} className="service-layout">
          <div style={{ direction: 'ltr' }} className="animate-on-scroll">
            {iconEl}
            <h2 style={{ color: 'var(--blue)', marginBottom: '10px', marginTop: '20px' }}>{title}</h2>
            <div className="accent-line" style={{ width: '15%', background: 'var(--purple)', backgroundImage: 'none' }} />
            <p style={{ color: 'rgba(35,56,119,0.75)', marginBottom: '24px' }}>{description}</p>
            <ul style={{ listStyle: 'none', marginBottom: '28px' }}>
              {services.map((s) => (
                <li key={s} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '15px', color: 'rgba(35,56,119,0.80)', padding: '6px 0', paddingLeft: '20px', position: 'relative', borderBottom: '1px solid rgba(159,142,194,0.12)' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700, fontSize: '18px' }}>·</span>
                  {s}
                </li>
              ))}
            </ul>
            <Link to="/demo/contact" className="btn-gradient">{ctaText}</Link>
          </div>

          <div style={{ direction: 'ltr' }} className="animate-on-scroll">
            <div style={{ background: 'rgba(159,142,194,0.08)', borderLeft: '4px solid var(--purple)', borderRadius: '0 12px 12px 0', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--blue)', marginBottom: '14px' }}>
                {highlight.title}
              </p>
              <ul style={{ listStyle: 'none' }}>
                {highlight.items.map((item) => (
                  <li key={item} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(35,56,119,0.70)', padding: '6px 0', paddingLeft: '18px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--purple)', fontWeight: 700 }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .service-layout { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </section>
  );
}

export default function Servicos() {
  const location = useLocation();
  const t = useT('services');

  useEffect(() => {
    document.title = t.meta.documentTitle;
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
  }, [t.meta.documentTitle]);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const legalIcon = (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 9l4 4-4 4M21 9l-4 4 4 4" />
      <path d="M3 13h5M16 13h5" />
      <circle cx="12" cy="21" r="1" fill="var(--blue)" stroke="none" />
    </svg>
  );

  const gestaoIcon = (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );

  const mktIcon = (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label section-label-white">{t.hero.label}</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '16px' }}>{t.hero.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto', fontSize: '18px' }}>
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      <ServiceSection
        id="legal"
        bg="var(--white)"
        iconEl={legalIcon}
        title={t.areas.legal.title}
        description={t.areas.legal.description}
        services={t.areas.legal.services}
        highlight={{ title: t.highlightTitle, items: t.areas.legal.highlightItems }}
        ctaText={t.areas.legal.ctaText}
      />

      <ServiceSection
        id="management"
        bg="var(--bg)"
        iconEl={gestaoIcon}
        title={t.areas.management.title}
        description={t.areas.management.description}
        services={t.areas.management.services}
        highlight={{ title: t.highlightTitle, items: t.areas.management.highlightItems }}
        ctaText={t.areas.management.ctaText}
        reverse
      />

      <ServiceSection
        id="marketing"
        bg="var(--white)"
        iconEl={mktIcon}
        title={t.areas.marketing.title}
        description={t.areas.marketing.description}
        services={t.areas.marketing.services}
        highlight={{ title: t.highlightTitle, items: t.areas.marketing.highlightItems }}
        ctaText={t.areas.marketing.ctaText}
      />

      <ServiceSection
        id="compliance"
        bg="var(--bg)"
        iconEl={(
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        )}
        title={t.areas.compliance.title}
        description={t.areas.compliance.description}
        services={t.areas.compliance.services}
        highlight={{ title: t.highlightTitle, items: t.areas.compliance.highlightItems }}
        ctaText={t.areas.compliance.ctaText}
        reverse
      />

      <ServiceSection
        id="technology"
        bg="var(--white)"
        iconEl={(
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        )}
        title={t.areas.technology.title}
        description={t.areas.technology.description}
        services={t.areas.technology.services}
        highlight={{ title: t.highlightTitle, items: t.areas.technology.highlightItems }}
        ctaText={t.areas.technology.ctaText}
      />

      {/* Packages */}
      <section style={{ background: 'var(--grad-subtle)', padding: '100px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label section-label-white">{t.packages.label}</span>
            <div className="accent-line accent-line-white accent-line-center" />
            <h2 style={{ color: 'var(--white)', marginBottom: '16px' }}>{t.packages.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.70)', maxWidth: '520px', margin: '0 auto' }}>
              {t.packages.subtitle}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="packages-grid animate-on-scroll">
            {t.packages.tiers.map(({ name, desc, includes }) => (
              <div key={name} className="card stagger-child animate-on-scroll" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--blue)', marginBottom: '8px', textAlign: 'center' }}>{name}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px', minHeight: '80px' }}>{desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: '24px', flex: 1 }}>
                  {includes.map((item) => (
                    <li key={item} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(35,56,119,0.75)', padding: '5px 0', paddingLeft: '18px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--purple)' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--blue)' }}>{t.packages.priceLabel}</span>
                </div>
                <Link to="/demo/contact" className="btn-gradient" style={{ width: '100%', justifyContent: 'center' }}>
                  {t.packages.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .packages-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </main>
  );
}