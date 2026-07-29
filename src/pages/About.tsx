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
    <main className="pt-[72px]">
      <section className="relative overflow-hidden bg-grad-main py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-[60px] left-[10%] h-[200px] w-[200px] rounded-full border border-white/10" />
        <div className="container relative text-center">
          <span className="section-label section-label-white">{t.hero.label}</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 className="mb-5 text-white">{t.hero.title}</h1>
          <p className="mx-auto max-w-[580px] text-lg text-white/75">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-[100px]">
        <div className="container animate-on-scroll">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <span className="section-label">{t.mission.label}</span>
              <div className="accent-line bg-purple bg-none" />
              <h2 className="mb-6 text-blue">{t.mission.title}</h2>
              <div className="mb-7 max-w-[680px] border-l-4 border-purple pl-6">
                <p className="text-lg font-normal leading-[1.7] text-blue">
                  {t.mission.quote}
                </p>
              </div>
              <p className="text-blue/70">
                {t.mission.body}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {t.mission.stats.map(({ value, label }) => (
                <div key={label} className="rounded-xl bg-bg p-6 text-center">
                  <div className="gradient-text mb-1.5 text-4xl font-bold">{value}</div>
                  <div className="text-[13px] font-normal text-blue/65">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg py-[100px]">
        <div className="container">
          <div className="animate-on-scroll mb-14 text-center">
            <span className="section-label">{t.values.label}</span>
            <div className="accent-line accent-line-center bg-purple bg-none" />
            <h2 className="text-blue">{t.values.title}</h2>
          </div>
          <div className="animate-on-scroll grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map(({ icon, title, description }) => (
              <div key={title} className="card stagger-child animate-on-scroll flex items-start gap-5">
                <div className="mt-1 shrink-0">{icon}</div>
                <div>
                  <h3 className="mb-2 text-lg text-blue">{title}</h3>
                  <p className="text-sm text-blue/70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NIEUSYNC */}
      <section className="bg-white py-[100px]">
        <div className="container">
          <div className="animate-on-scroll grid grid-cols-1 items-center gap-16 md:grid-cols-[55%_42%]">
            <div>
              <span className="section-label">{t.why.label}</span>
              <div className="accent-line bg-purple bg-none" />
              <h2 className="mb-5 text-blue">{t.why.title}</h2>
              <p className="mb-9 text-blue/75">
                {t.why.body}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {t.why.items.map(({ title, description }) => (
                <div key={title} className="stagger-child animate-on-scroll border-l-[3px] border-purple pl-[18px]">
                  <h3 className="mb-1.5 text-[15px] text-blue">{title}</h3>
                  <p className="text-sm text-blue/65">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-grad-main py-20 text-center">
        <div className="container animate-on-scroll">
          <h2 className="mb-4 text-white">{t.cta.title}</h2>
          <p className="mx-auto mb-9 max-w-[480px] text-white/70">
            {t.cta.subtitle}
          </p>
          <Link to="/demo/contact" className="btn-gradient px-10 py-4">
            {t.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
