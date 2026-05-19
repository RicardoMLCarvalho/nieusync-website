import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Article } from '../hooks/useArticles';

const sanityClient = createClient({
  projectId: 'j7qyuhtx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' });
};

function BlogPreview() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "article"] | order(publishedAt desc)[0..2] {
      _id, title, slug, category, author, readTime, publishedAt, excerpt, mainImage
    }`).then((data) => {
      setArticles(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--purple)', fontFamily: 'Montserrat,sans-serif' }}>
      A carregar artigos...
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="blog-grid">
      {articles.map((a) => (
        <div key={a._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          {a.mainImage && (
            <div style={{ marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', height: '160px' }}>
              <img
                src={urlFor(a.mainImage).width(400).height(160).fit('crop').url()}
                alt={a.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}
          <div style={{ marginBottom: '12px' }}>
            <span className="badge badge-purple">{a.category}</span>
          </div>
          <Link to={`/blog/${a.slug.current}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ fontSize: '17px', color: 'var(--blue)', marginBottom: '12px', lineHeight: 1.4 }}>{a.title}</h3>
          </Link>
          <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.60)', marginBottom: '20px', flex: 1 }}>{a.excerpt}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(159,142,194,0.15)', paddingTop: '14px', marginTop: 'auto' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'var(--purple)' }}>
              {a.readTime} min · {formatDate(a.publishedAt)}
            </span>
            <Link to={`/blog/${a.slug.current}`} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--purple)' }}>
              Ler artigo →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScaleIcon({ size = 40, color = 'var(--blue)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 9l4 4-4 4M21 9l-4 4 4 4" />
      <path d="M3 13h5M16 13h5" />
      <circle cx="12" cy="21" r="1" fill={color} stroke="none" />
    </svg>
  );
}

function ChartIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function MegaphoneIcon({ size = 40, color = 'var(--blue)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'NIEUSYNC - Consultora B2B · Direito Empresarial, Gestão Financeira, Marketing Digital e Tecnologias de Informação';
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

  return (
    <main style={{ paddingTop: '72px' }}>
     {/* ── HERO ── */}
      <section style={{ background: 'var(--grad-subtle)', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        {[
          { size: 400, top: '-100px', right: '-100px', opacity: 0.10 },
          { size: 280, top: '40%', right: '5%', opacity: 0.12 },
          { size: 180, bottom: '-60px', left: '-60px', opacity: 0.14 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: c.size,
            height: c.size,
            borderRadius: '50%',
            border: `1px solid rgba(159,142,194,${c.opacity})`,
            top: (c as any).top,
            right: (c as any).right,
            bottom: (c as any).bottom,
            left: (c as any).left,
            pointerEvents: 'none',
          }} />
        ))}

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '55% 42%', gap: '48px', alignItems: 'center' }} className="hero-grid">
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '100px',
                padding: '7px 18px',
                marginBottom: '28px',
              }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Consultora B2B · Portugal
                </span>
              </div>

              <h1 style={{ color: 'var(--white)', marginBottom: '24px', fontSize: '64px' }}>
                WE ARE THE BASIS FOR <br />
                <span style={{ color: 'var(--purple)' }}>YOUR BUSINESS</span> TO FLY
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '17px', maxWidth: '520px', marginBottom: '36px' }}>
                Direito Empresarial, Gestão Financeira, Marketing Digital e Tecnologia de Informação integrados num único parceiro de confiança.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <Link
                  to="/contacto"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--white)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--purple)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--purple)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--white)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                  style={{
                    fontSize: '13px',
                    padding: '15px 28px',
                    background: 'var(--purple)',
                    color: 'var(--white)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'background 0.25s ease, color 0.25s ease, transform 0.2s ease',
                  }}
                >
                  Agendar Consulta →
                </Link>
                <Link to="/servicos" className="btn-outline-white">
                  Conhecer os Serviços
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {['Multidisciplinar 360º', 'Resposta em 24h', 'Sem compromisso'].map((t) => (
                  <span key={t} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-card-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className="animate-float"
                style={{
                  background: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '20px',
                  padding: '40px',
                  backdropFilter: 'blur(10px)',
                  width: '100%',
                  maxWidth: '400px',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {[
                    { value: '360°', label: 'Visão multidisciplinar' },
                    { value: '5', label: 'Áreas de serviço integradas' },
                    { value: '24h', label: 'Tempo de resposta garantido' },
                    { value: '100%', label: 'Foco em resultados' },
                  ].map(({ value, label }, i) => (
                    <div
                      key={label}
                      style={{
                        padding: '20px 16px',
                        borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.10)' : 'none',
                        borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none',
                      }}
                    >
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '38px', lineHeight: 1, marginBottom: '6px', background: 'linear-gradient(135deg,#fff,rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {value}
                      </div>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-card-wrapper { display: none !important; }
          }
        `}</style>
      </section>

            {/* ── TRUST BAR ── */}
      <section style={{ background: 'var(--white)', borderTop: '1px solid rgba(159,142,194,0.18)', borderBottom: '1px solid rgba(159,142,194,0.18)', padding: '48px 0', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: 'rgba(35,56,119,0.50)', marginBottom: '28px' }}>
            Presença activa em associações e comunidades empresariais:
          </p>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div className="partners-track">
            {[...Array(4)].map((_, ri) => (
              <div key={ri} className="partners-set">
                {[
                  { src: '/aep-logo-novo-2.png', alt: 'AEP', href: 'https://www.aeportugal.pt' },
                  { src: '/apersalogo.png', alt: 'APERSA', href: 'https://www.cppme.pt' },
                  { src: '/ADL.svg', alt: 'ADL Litoral Alentejano', href: 'https://litoralalentejano.pt' },
                  { src: '/AES.png', alt: 'AE Sines', href: 'https://www.aesines.com' },
                  { src: '/anpme-logo.svg', alt: 'ANPME', href: 'https://www.anpme.pt' },
                ].map(({ src, alt, href }) => (
                  <a key={alt} href={href} target="_blank" rel="noopener noreferrer"
  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s ease', width: '180px' }}
                  >
                    <img src={src} alt={alt} style={{ height: '48px', width: 'auto', maxWidth: '140px', objectFit: 'contain', opacity: 0.55, transition: 'opacity 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLImageElement).style.opacity = '1'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLImageElement).style.opacity = '0.55'}
                  />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .partners-track {
            display: flex;
            width: max-content;
            animation: scrollPartners 25s linear infinite;
          }
          .partners-set {
            display: flex;
            align-items: center;
          }
          @keyframes scrollPartners {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .partners-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

           {/* ── SERVICES ── */}
      <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">Os nossos serviços</span>
            <div className="accent-line accent-line-center" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
            <h2 style={{ color: 'var(--blue)', marginBottom: '16px' }}>Cinco áreas. Uma visão integrada.</h2>
            <p style={{ color: 'rgba(35,56,119,0.60)', maxWidth: '560px', margin: '0 auto' }}>
              Não tratamos problemas isolados. Sincronizamos o seu negócio.
            </p>
          </div>
      
          <div className="services-orbit animate-on-scroll" style={{ position: 'relative', width: '520px', height: '520px', margin: '0 auto' }}>
            {/* Logo central */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'var(--white)', boxShadow: '0 8px 40px rgba(35,56,119,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(159,142,194,0.20)', zIndex: 2,
            }}>
              <img src="/Logo_sem_letras.png" alt="NIEUSYNC" style={{ width: '200px', height: '200px'}} />
            </div>

      
            {/* Setas entre itens */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 520 520">
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L0,8 L8,4 z" fill="var(--purple)" />
                </marker>
              </defs>
              {[-90, -18, 54, 126, 198].map((angle, i) => {
                const radius = 180;
                const cx = 260, cy = 260;
                const circleR = 32;
            
                const rad = (angle * Math.PI) / 180;
                const nextRad = ((angle + 72) * Math.PI) / 180;
            
                const x1 = cx + Math.cos(rad) * radius;
                const y1 = cy + Math.sin(rad) * radius;
                const x2 = cx + Math.cos(nextRad) * radius;
                const y2 = cy + Math.sin(nextRad) * radius;
            
                // ponto de controlo curvo
                const midRad = (rad + nextRad) / 2;
                const mx = cx + Math.cos(midRad) * (radius + 30);
                const my = cy + Math.sin(midRad) * (radius + 30);
            
                // ponto a 45% do caminho (antes do meio) para a seta ficar no meio do arco
                const t = 0.45;
                const ax = (1-t)*(1-t)*x1 + 2*(1-t)*t*mx + t*t*x2;
                const ay = (1-t)*(1-t)*y1 + 2*(1-t)*t*my + t*t*y2;
                const t2 = 0.55;
                const bx = (1-t2)*(1-t2)*x1 + 2*(1-t2)*t2*mx + t2*t2*x2;
                const by = (1-t2)*(1-t2)*y1 + 2*(1-t2)*t2*my + t2*t2*y2;
            
                // linha curva sem markerEnd, só a seta no meio
                return (
                  <g key={i}>
                    <path
                      d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                      fill="none" stroke="rgba(159,142,194,0.35)" strokeWidth="1.5"
                      strokeDasharray="5 4"
                    />
                    <line
                      x1={ax} y1={ay} x2={bx} y2={by}
                      stroke="var(--purple)" strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Serviços em órbita */}
            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 9l4 4-4 4M21 9l-4 4 4 4" /><path d="M3 13h5M16 13h5" /></svg>, label: 'Direito Empresarial', href: '/servicos#direito', angle: -90 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>, label: 'Gestão Estratégica', href: '/servicos#gestao', angle: -18 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" /></svg>, label: 'Marketing Digital', href: '/servicos#marketing', angle: 54 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg>, label: 'Finanças & Contabilidade', href: '/servicos#financas', angle: 126 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, label: 'Tecnologias de Informação', href: '/servicos#tecnologias', angle: 198 },
            ].map(({ icon, label, href, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const radius = 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <Link
                  key={label}
                  to={href}
                  className="orbit-item"
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    textDecoration: 'none', width: '110px', textAlign: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.1)`}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`}
                >
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'var(--white)', border: '2px solid rgba(159,142,194,0.25)',
                    boxShadow: '0 4px 16px rgba(35,56,119,0.10)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(159,142,194,0.30)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(159,142,194,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(35,56,119,0.10)'; }}
                  >
                    {icon}
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '11px', color: 'var(--blue)', lineHeight: 1.3, letterSpacing: '0.02em' }}>{label}</span>
                </Link>
              );
            })}
          </div>
      
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link to="/servicos" className="btn-gradient">Ver todos os serviços →</Link>
          </div>
        </div>
      
        <style>{`
          @media (max-width: 768px) {
            .services-orbit { width: 340px !important; height: 340px !important; }
            .services-orbit .orbit-item { width: 80px !important; }
            .services-orbit .orbit-item > div { width: 48px !important; height: 48px !important; }
            .services-orbit .orbit-item > div svg { width: 20px !important; height: 20px !important; }
            .services-orbit .orbit-item > span { font-size: 9px !important; }
          }
        `}</style>
      </section>

      {/* ── METHODOLOGY ── */}
      <section style={{ background: 'var(--grad-subtle)', padding: '100px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-label section-label-white">Como trabalhamos</span>
            <div className="accent-line accent-line-white accent-line-center" />
            <h2 style={{ color: 'var(--white)', marginBottom: '16px' }}>Do diagnóstico ao resultado.</h2>
            <p style={{ color: 'rgba(255,255,255,0.70)', maxWidth: '540px', margin: '0 auto' }}>
              Um processo claro, sem surpresas, com resultados mensuráveis desde o primeiro mês.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', position: 'relative' }} className="steps-grid animate-on-scroll">
            {[
              { num: '01', title: 'Diagnóstico', desc: 'Analisamos a situação legal, financeira e digital do seu negócio.' },
              { num: '02', title: 'Planeamento', desc: 'Criamos um plano claro com prioridades e responsabilidades.' },
              { num: '03', title: 'Implementação', desc: 'Executamos com a sua equipa, integrando processos e ferramentas.' },
              { num: '04', title: 'Acompanhamento', desc: 'Reporting mensal, ajustes e resultados medidos com dados.' },
            ].map((step, i) => (
              <div key={step.num} className="stagger-child animate-on-scroll" style={{ textAlign: 'center', position: 'relative' }}>
                {i < 3 && (
                  <div style={{ position: 'absolute', right: '-12%', top: '30px', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.18)', fontSize: '20px', fontWeight: 700 }} className="step-arrow">→</div>
                )}
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.30)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--white)', lineHeight: '60px', display: 'block' }}>{step.num}</span>
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '16px', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .steps-grid { grid-template-columns: 1fr !important; }
            .step-arrow { display: none !important; }
          }
          @media (max-width: 1024px) {
            .steps-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </section>
    
      {/* ── PERSONA ── */}
      <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container">
          <h2 className="animate-on-scroll" style={{ color: 'var(--blue)', textAlign: 'center', marginBottom: '40px' }}>
            A <span style={{ color: 'var(--purple)' }}>NIEUSYNC</span> foi criada para si se...
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '40px' }} className="persona-grid animate-on-scroll">
            {[
              'Precisa de crescer mas tem receio de avançar sem estrutura sólida',
              'A empresa cresceu e agora a gestão parece um caos constante',
              'Factura bem mas não sabe ao certo quanto sobra no final do mês',
            ].map((text) => (
              <div key={text} className="stagger-child animate-on-scroll" style={{
                background: 'var(--white)', borderLeft: '4px solid var(--blue)',
                borderRadius: '0 14px 14px 0', padding: '22px 26px',
                display: 'flex', alignItems: 'flex-start', gap: '12px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
                <p style={{ fontSize: '15px', color: 'var(--blue)', margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontStyle: 'italic', color: 'rgba(35,56,119,0.65)', marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
              "Caso se identifique com algum destes cenários, temos exactamente o que precisa."
            </p>
            <Link to="/contacto" className="btn-gradient">Falar com um especialista →</Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .persona-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section style={{ background: 'var(--grad-main)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }} className="lead-grid animate-on-scroll">
            <div>
              <span style={{
                display: 'inline-block', background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.40)', color: 'var(--white)',
                fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '11px',
                letterSpacing: '0.10em', textTransform: 'uppercase', padding: '5px 14px',
                borderRadius: '100px', marginBottom: '20px',
              }}>
                Download gratuito
              </span>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--white)', marginBottom: '24px', lineHeight: 1.3 }}>
                Guia: As 5 Protecções Legais que Toda a PME Precisa
              </h3>
              <ul style={{ listStyle: 'none' }}>
                {[
                  'Contratos que não pode dispensar',
                  'Como evitar multas RGPD',
                  'Direito do trabalho: o essencial',
                  'Due diligence antes de assinar',
                  'Check-list de compliance anual',
                ].map((item) => (
                  <li key={item} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '15px', color: 'rgba(255,255,255,0.82)', padding: '6px 0', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--white)', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '36px', boxShadow: '0 8px 40px rgba(35,56,119,0.20)' }}>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--blue)', marginBottom: '24px' }}>
                Descarregar guia gratuito
              </h3>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Nome completo', type: 'text', placeholder: 'O seu nome' },
                  { label: 'Email profissional', type: 'email', placeholder: 'email@empresa.pt' },
                  { label: 'Nome da empresa', type: 'text', placeholder: 'A sua empresa' },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label>{label}</label>
                    <input type={type} placeholder={placeholder} />
                  </div>
                ))}
                <button type="submit" className="btn-gradient" style={{ width: '100%', marginTop: '8px' }}>
                  Descarregar agora →
                </button>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.45)', textAlign: 'center', margin: 0 }}>
                  Sem spam. Cancela a qualquer momento.
                </p>
              </form>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .lead-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── BLOG PREVIEW ── */}
<section style={{ background: 'var(--bg)', padding: '80px 0' }}>
  <div className="container">
    <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '48px' }}>
      <span className="section-label">Blog & Recursos</span>
      <div className="accent-line accent-line-center" style={{ background: 'var(--purple)', backgroundImage: 'none' }}/>
      <h2 style={{ color: 'var(--blue)', marginBottom: '12px' }}>Conhecimento que transforma</h2>
      <p style={{ color: 'rgba(35,56,119,0.60)', maxWidth: '460px', margin: '0 auto' }}>Artigos práticos de Direito Empresarial, Gestão Financeira, Marketing Digital, Tecnologia e Inteligência Artificial, para empresas.</p>
    </div>
    <BlogPreview />
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <Link to="/blog" className="btn-gradient">Ver todos os artigos →</Link>
    </div>
  </div>
  <style>{`
    @media (max-width: 768px) {
      .blog-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
</section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: 'var(--grad-main)', padding: '100px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="animate-on-scroll">
            <h2 style={{ fontFamily: "'Magistral', 'Montserrat', sans-serif", fontWeight: 700, fontSize: 'clamp(32px,5vw,48px)', color: 'var(--white)', marginBottom: '20px' }}>
              Pronto para sincronizar o seu negócio?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '560px', margin: '0 auto 40px', fontSize: '17px' }}>
              Uma consulta de 30 minutos sem compromisso. Analisamos a sua situação e indicamos exactamente o que pode melhorar.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contacto" className="btn-outline-white" style={{ padding: '16px 36px' }}>
                Agendar Consulta →
              </Link>
              <a
                href="https://wa.me/351933644596?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20NIEUSYNC"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--white)', color: 'var(--blue)', fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '16px 36px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  transition: 'background 0.3s ease, color 0.3s ease, transform 0.2s ease',
                  textDecoration: 'none', minHeight: '44px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--grad-reverse)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--white)'; (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Enviar mensagem no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
