import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sobre() {
  useEffect(() => {
    document.title = 'Sobre Nós | NIEUSYNC · A equipa por detrás da consultora';
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

  const teamMembers = [
    {
      initials: 'RS', avatarGrad: 'var(--grad-main)',
      name: 'Ricardo Serrão de Carvalho', role: 'CEO · Direito & Gestão',
      bio: 'Especialista em Direito Empresarial e Gestão Estratégica com mais de 15 anos de experiência a apoiar PMEs portuguesas. Combina rigor jurídico com visão de negócio para criar soluções práticas e sustentáveis.',
      expertise: ['Direito Empresarial', 'Gestão Estratégica', 'Due Diligence'],
      linkedin: 'https://www.linkedin.com/in/ricardo-serrao-de-carvalho/',
    },
    {
      initials: 'RC', avatarGrad: 'var(--grad-reverse)',
      name: 'Ricardo M. Carvalho', role: 'CMO · Marketing & Crescimento',
      bio: 'Especialista em marketing digital B2B com foco em crescimento sustentável. Combina estratégia de conteúdo, paid media e análise de dados para gerar resultados mensuráveis para PMEs e Startups.',
      expertise: ['Marketing Digital B2B', 'Growth Strategy', 'Paid Media'],
      linkedin: 'https://www.linkedin.com/in/ricardo-m-carvalho/',
    },
    {
      initials: 'MP', avatarGrad: 'var(--grad-main)',
      name: 'Marlene S. Pereira', role: 'CHRO · Recursos Humanos & Cultura',
      bio: 'Especialista em Recursos Humanos e desenvolvimento organizacional. Apoia empresas na construção de equipas de alta performance, processos de recrutamento eficientes e culturas organizacionais saudáveis.',
      expertise: ['Recursos Humanos', 'Cultura Organizacional', 'Direito do Trabalho'],
      linkedin: 'https://www.linkedin.com/in/marlene-s-pereira/',
    },
  ];

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
            Uma consultora criada para sincronizar todas as dimensões do seu negócio, com a proximidade que as PMEs merecem.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--white)', padding: '100px 0' }}>
        <div className="container animate-on-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="mission-grid">
            <div>
              <span className="section-label">A nossa missão</span>
              <div className="accent-line" />
              <h2 style={{ color: 'var(--blue)', marginBottom: '24px' }}>Expertise real, preços justos.</h2>
              <div style={{ '4px solid var(--purple)', paddingLeft: '24px', marginBottom: '28px', maxWidth: '680px' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '18px', color: 'var(--blue)', lineHeight: 1.70 }}>
                  "Nascemos da convicção de que as PMEs portuguesas merecem o mesmo nível de expertise que as grandes empresas — sem os preços inacessíveis nem a burocracia das grandes consultoras."
                </p>
              </div>
              <p style={{ color: 'rgba(35,56,119,0.70)' }}>
                A NIEUSYNC nasceu no Alentejo Litoral e serve empresas em todo o país. Acreditamos que o crescimento sustentável começa com uma base sólida: jurídica, financeira e digital.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { value: '47+', label: 'Clientes activos' },
                { value: '15+', label: 'Anos de experiência' },
                { value: '3', label: 'Áreas especializadas' },
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
            <div className="accent-line accent-line-center" />
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

      {/* Team */}
      <section style={{ background: 'var(--white)', padding: '100px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">A equipa</span>
            <div className="accent-line accent-line-center" />
            <h2 style={{ color: 'var(--blue)' }}>A nossa equipa</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="team-grid animate-on-scroll">
            {teamMembers.map(({ initials, avatarGrad, name, role, bio, expertise, linkedin }) => (
              <div key={name} className="card stagger-child animate-on-scroll" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: avatarGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '26px', color: 'var(--white)', boxShadow: '0 4px 20px rgba(35,56,119,0.25)', marginBottom: '16px', flexShrink: 0 }}>
                  {initials}
                </div>
                <h3 style={{ fontSize: '18px', color: 'var(--blue)', marginBottom: '8px' }}>{name}</h3>
                <div style={{ marginBottom: '14px' }}><span className="badge badge-gradient">{role}</span></div>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.70)', marginBottom: '16px', lineHeight: 1.70, textAlign: 'center' }}>{bio}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
                  {expertise.map((e) => <span key={e} className="badge badge-light">{e}</span>)}
                </div>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm" style={{ fontSize: '12px' }}>
                  Ver perfil no LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .team-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2,1fr) !important; } }
        `}</style>
      </section>

      <section style={{ background: 'var(--grad-subtle)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container animate-on-scroll">
          <h2 style={{ color: 'var(--white)', marginBottom: '16px' }}>Pronto para trabalhar connosco?</h2>
          <p style={{ color: 'rgba(255,255,255,0.70)', maxWidth: '480px', margin: '0 auto 36px' }}>
            Uma chamada sem compromisso é tudo o que precisamos para perceber como podemos ajudar.
          </p>
          <Link to="/contacto" className="btn-gradient" style={{ padding: '16px 40px' }}>
            Marcar chamada gratuita →
          </Link>
        </div>
      </section>
    </main>
  );
}
