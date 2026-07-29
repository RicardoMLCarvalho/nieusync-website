import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useT } from '../i18n';

function ServiceSection({
  id, bgClass, iconEl, title, description, services, highlight, ctaText, reverse,
}: {
  id: string; bgClass: string; iconEl: React.ReactNode; title: string; description: string;
  services: string[]; highlight: { title: string; items: string[] }; ctaText: string; reverse?: boolean;
}) {
  return (
    <section id={id} className={`${bgClass} py-[100px]`}>
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
          <div className={`animate-on-scroll ${reverse ? 'md:order-2' : ''}`}>
            {iconEl}
            <h2 className="mb-2.5 mt-5 text-blue">{title}</h2>
            <div className="accent-line w-[15%] bg-purple bg-none" />
            <p className="mb-6 text-blue/75">{description}</p>
            <ul className="mb-7 list-none">
              {services.map((s) => (
                <li key={s} className="relative border-b border-purple/[0.12] py-1.5 pl-5 text-[15px] font-normal text-blue/80">
                  <span className="absolute left-0 text-lg font-bold text-purple">·</span>
                  {s}
                </li>
              ))}
            </ul>
            <Link to="/demo/contact" className="btn-gradient">{ctaText}</Link>
          </div>

          <div className={`animate-on-scroll ${reverse ? 'md:order-1' : ''}`}>
            <div className="rounded-r-xl border-l-4 border-purple bg-purple/[0.08] px-7 py-6">
              <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-blue">
                {highlight.title}
              </p>
              <ul className="list-none">
                {highlight.items.map((item) => (
                  <li key={item} className="relative py-1.5 pl-[18px] text-sm font-normal text-blue/70">
                    <span className="absolute left-0 font-bold text-purple">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
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
    <main className="pt-[72px]">
      <section className="bg-grad-main py-20">
        <div className="container text-center">
          <span className="section-label section-label-white">{t.hero.label}</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 className="mb-4 text-white">{t.hero.title}</h1>
          <p className="mx-auto max-w-[560px] text-lg text-white/75">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      <ServiceSection
        id="legal"
        bgClass="bg-white"
        iconEl={legalIcon}
        title={t.areas.legal.title}
        description={t.areas.legal.description}
        services={t.areas.legal.services}
        highlight={{ title: t.highlightTitle, items: t.areas.legal.highlightItems }}
        ctaText={t.areas.legal.ctaText}
      />

      <ServiceSection
        id="management"
        bgClass="bg-bg"
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
        bgClass="bg-white"
        iconEl={mktIcon}
        title={t.areas.marketing.title}
        description={t.areas.marketing.description}
        services={t.areas.marketing.services}
        highlight={{ title: t.highlightTitle, items: t.areas.marketing.highlightItems }}
        ctaText={t.areas.marketing.ctaText}
      />

      <ServiceSection
        id="compliance"
        bgClass="bg-bg"
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
        bgClass="bg-white"
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
      <section className="bg-grad-main py-[100px]">
        <div className="container">
          <div className="animate-on-scroll mb-14 text-center">
            <span className="section-label section-label-white">{t.packages.label}</span>
            <div className="accent-line accent-line-white accent-line-center" />
            <h2 className="mb-4 text-white">{t.packages.title}</h2>
            <p className="mx-auto max-w-[520px] text-white/70">
              {t.packages.subtitle}
            </p>
          </div>
          <div className="animate-on-scroll grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.packages.tiers.map(({ name, desc, includes }) => (
              <div key={name} className="card stagger-child animate-on-scroll flex flex-col">
                <h3 className="mb-2 text-center text-blue">{name}</h3>
                <p className="mb-5 min-h-[80px] text-sm text-blue/65">{desc}</p>
                <ul className="mb-6 flex-1 list-none">
                  {includes.map((item) => (
                    <li key={item} className="relative py-[5px] pl-[18px] text-sm font-normal text-blue/75">
                      <span className="absolute left-0 text-purple">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mb-4 text-center">
                  <span className="text-lg font-bold text-blue">{t.packages.priceLabel}</span>
                </div>
                <Link to="/demo/contact" className="btn-gradient w-full justify-center">
                  {t.packages.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
