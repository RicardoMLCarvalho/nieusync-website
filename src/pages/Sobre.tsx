import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sobre() {
  useEffect(() => {
    document.title = 'NIEUSYNC - Sobre Nós';
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
  }, []);

  const values = [
    {
      icon: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><circle cx="12" cy="12" r="10" stroke="url(#v1)" /><path stroke="url(#v1)" d="M8 12l3 3 5-5" /></svg>),
      title: 'Integração', desc: 'Legal, financeiro e digital nunca funcionam em silos. Tratamos o seu negócio como um sistema único.',
    },
    {
      icon: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><path stroke="url(#v2)" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" stroke="url(#v2)" /></svg>),
      title: 'Transparência', desc: 'Comunicamos com clareza, sem jargão desnecessário. Sabe sempre o que estamos a fazer e porquê.',
    },
    {
      icon: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><path stroke="url(#v3)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
      title: 'Agilidade', desc: 'Respondemos em 24 horas. Adaptamo-nos rapidamente às mudanças do seu negócio e do mercado.',
    },
    {
      icon: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="v4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#233877" /><stop offset="100%" stopColor="#9F8EC2" /></linearGradient></defs><polyline stroke="url(#v4)" points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline stroke="url(#v4)" points="16 7 22 7 22 13" /></svg>),
      title: 'Resultado', desc: 'Tudo o que fazemos é medido. Resultados concretos, reportados com dados, desde o primeiro mês.',
    },
  ];

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-main)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {[{ size: 300, top: '-80px', right: '-80px' }, { size: 200, bottom: '-60px', left: '10%' }].map((c, i) => (
          <div key={i} style={{ position: 'absolute', width: c.size, height: c.size, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.10)', top: (c as any).top, right: (c as any).right, bottom: (c as any).bottom, left: (c as any).left, pointerEvents: 'none' }} />
        ))}
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <span className="section-label section-label-white">A nossa história</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '20px' }}>Quem somos</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '580px', margin: '0 auto', fontSize: '18px' }}>
            Um parceiro fundamental para sincronizar todas as necessidades do seu negócio, com a proximidade que as PMEs merecem.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--white)', padding: '100px 0' }}>
        <div className="container animate-on-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="mission-grid">
            <div>
              <span className="section-label">A nossa missão</span>
              <div className="accent-line" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
              <h2 style={{ color: 'var(--blue)', marginBottom: '24px' }}>Expertise real, preços justos.</h2>
              <div style={{ borderLeft: '4px solid var(--purple)', paddingLeft: '24px', marginBottom: '28px', maxWidth: '680px' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '18px', color: 'var(--blue)', lineHeight: 1.70 }}>
                  "Nascemos da convicção absoluta de que as PMEs portuguesas merecem o mesmo nível de expertise que as grandes empresas — sem os preços inacessíveis nem a burocracia desnecessária."
                </p>
              </div>
              <p style={{ color: 'rgba(35,56,119,0.70)' }}>
                A NIEUSYNC serve empresas em todo o país. Acreditamos que o crescimento sustentável começa com uma base sólida: jurídica, financeira e digital.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { value: '360º', label: 'Visão multidisciplinar' },
                { value: '5', label: 'Áreas especializadas' },
                { value: '24h', label: 'Tempo de resposta garantido' },
                { value: '100%', label: 'Foco em resultados' },
              ].map(({ value, label }) => (
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
            <span className="section-label">Os nossos valores</span>
            <div className="accent-line accent-line-center" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
            <h2 style={{ color: 'var(--blue)' }}>O que nos guia todos os dias</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }} className="values-grid animate-on-scroll">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="card stagger-child animate-on-scroll" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '4px' }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--blue)', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.70)' }}>{desc}</p>
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
          <span className="section-label">Porquê a NIEUSYNC?</span>
          <div className="accent-line" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
          <h2 style={{ color: 'var(--blue)', marginBottom: '20px' }}>Tudo o que precisa, numa só parceria.</h2>
          <p style={{ color: 'rgba(35,56,119,0.75)', marginBottom: '36px' }}>
            A NIEUSYNC foca-se na Criação, Crescimento e Recuperação de Start-Ups e PME's. Próxima, ágil e completamente orientada para os seus resultados reais.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[
            { title: 'Multidisciplinar 360º', desc: 'Legal, financeiro e digital num só lugar' },
            { title: 'Resposta ágil', desc: 'Acesso directo à equipa, sem intermediários' },
            { title: 'Decisão com dados', desc: 'Relatórios simples para escolhas inteligentes' },
            { title: 'Preço transparente', desc: 'Sem surpresas, sem letras pequenas' },
          ].map(({ title, desc }) => (
            <div key={title} className="stagger-child animate-on-scroll" style={{ borderLeft: '3px solid var(--purple)', paddingLeft: '18px' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--blue)', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)' }}>{desc}</p>
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
      <h2 style={{ color: 'var(--white)', marginBottom: '16px' }}>Pronto para trabalhar connosco?</h2>
      <p style={{ color: 'rgba(255,255,255,0.70)', maxWidth: '480px', margin: '0 auto 36px' }}>
        Uma consulta sem compromisso é tudo o que precisamos para perceber como podemos ajudar.
      </p>
      <Link to="/contacto" className="btn-gradient" style={{ padding: '16px 40px' }}>
        Agendar Consulta →
      </Link>
    </div>
  </section>
      </main>
  );
}
