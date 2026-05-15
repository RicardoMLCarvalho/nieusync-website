import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const articles = [
  { cat: 'Direito', catClass: 'badge-gradient', title: '5 Contratos que toda PME deve ter antes de crescer', excerpt: 'A ausência de contratos adequados é um dos maiores riscos jurídicos para empresas em crescimento. Descubra quais são essenciais e como proteger o seu negócio.', time: '5 min · Jan 2025', author: 'Ricardo Serrão de Carvalho' },
  { cat: 'Gestão', catClass: 'badge-blue', title: 'Como criar um dashboard simples para gerir o seu negócio', excerpt: 'Monitorize os KPIs mais importantes sem ferramentas complexas. Um guia prático para donos de PME que querem tomar melhores decisões.', time: '7 min · Fev 2025', author: 'Ricardo M. Carvalho' },
  { cat: 'Marketing', catClass: 'badge-purple', title: 'LinkedIn para B2B: o guia prático para PMEs portuguesas', excerpt: 'Aproveite o LinkedIn para gerar leads qualificados e posicionar a sua empresa como referência no sector sem gastar uma fortuna.', time: '8 min · Mar 2025', author: 'Ricardo M. Carvalho' },
  { cat: 'Direito', catClass: 'badge-gradient', title: 'RGPD em 2025: o que ainda pode estar a fazer errado', excerpt: 'As multas por incumprimento do RGPD continuam a aumentar. Verifique se a sua empresa está em conformidade com este guia de check-list.', time: '6 min · Abr 2025', author: 'Ricardo Serrão de Carvalho' },
  { cat: 'IA & Automação', catClass: 'badge-light', title: 'IA para PMEs: ferramentas práticas que pode usar hoje', excerpt: 'A inteligência artificial não é só para grandes empresas. Descubra as ferramentas que estão a transformar a forma como as PMEs trabalham.', time: '9 min · Mai 2025', author: 'Ricardo M. Carvalho' },
  { cat: 'Gestão', catClass: 'badge-blue', title: 'Como estruturar a sua empresa para crescer sem caos', excerpt: 'Processos, organogramas e responsabilidades claras: os pilares que separam empresas que escalam das que ficam presas no dia-a-dia.', time: '6 min · Jun 2025', author: 'Marlene S. Pereira' },
];

const categories = ['Todos', 'Direito', 'Gestão', 'Marketing', 'IA & Automação'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = 'Blog & Recursos | NIEUSYNC · Artigos sobre Direito, Gestão e Marketing';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.stagger-child').forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
              child.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === 'Todos' ? articles : articles.filter((a) => a.cat === activeCategory);

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label section-label-white">Conhecimento</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '16px' }}>Blog & Recursos</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto', fontSize: '18px' }}>
            Artigos práticos de Direito, Gestão e Marketing para empresas que querem crescer com solidez.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: '60px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px', justifyContent: 'center' }} className="animate-on-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px',
                  letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 20px',
                  borderRadius: '100px', cursor: 'pointer', minHeight: '44px',
                  transition: 'all 0.2s ease',
                  ...(activeCategory === cat
                    ? { background: 'var(--grad-main)', color: 'var(--white)', border: 'none' }
                    : { background: 'transparent', border: '1.5px solid var(--purple)', color: 'var(--purple)' }),
                }}
                onMouseEnter={(e) => { if (activeCategory !== cat) { (e.currentTarget as HTMLElement).style.background = 'var(--purple)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)'; } }}
                onMouseLeave={(e) => { if (activeCategory !== cat) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--purple)'; } }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }} className="blog-layout">
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }} className="articles-grid animate-on-scroll">
                {filtered.map(({ cat, catClass, title, excerpt, time, author }) => (
                  <div key={title} className="card stagger-child animate-on-scroll">
                    <div style={{ marginBottom: '14px' }}><span className={`badge ${catClass}`}>{cat}</span></div>
                    <h3 style={{ fontSize: '17px', color: 'var(--blue)', marginBottom: '10px', lineHeight: 1.40 }}>{title}</h3>
                    <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.60)', marginBottom: '16px' }}>{excerpt}</p>
                    <div style={{ borderTop: '1px solid rgba(159,142,194,0.15)', paddingTop: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'var(--purple)' }}>{time}</span>
                        <Link to="/blog" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--purple)' }}>
                          Ler artigo →
                        </Link>
                      </div>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.45)' }}>{author}</span>
                    </div>
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <p style={{ color: 'rgba(35,56,119,0.50)' }}>Nenhum artigo encontrado para esta categoria.</p>
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', top: '90px' }} className="animate-on-scroll">
              <div className="card">
                <h3 style={{ fontSize: '18px', color: 'var(--blue)', marginBottom: '10px' }}>Newsletter semanal</h3>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px' }}>
                  Receba os melhores artigos sobre Direito, Gestão e Marketing directamente no seu email.
                </p>
                <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label>Email profissional</label>
                    <input type="email" placeholder="email@empresa.pt" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <button type="submit" className="btn-gradient" style={{ width: '100%' }}>Subscrever</button>
                </form>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.40)', textAlign: 'center', marginTop: '10px' }}>
                  Sem spam. Cancela quando quiser.
                </p>
              </div>

              <div className="card" style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--blue)', marginBottom: '10px' }}>Precisa de ajuda?</h3>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '16px' }}>
                  Fale directamente com a nossa equipa. Primeira chamada sem compromisso.
                </p>
                <Link to="/contacto" className="btn-gradient" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  Marcar chamada →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .blog-layout { grid-template-columns: 1fr !important; }
            .articles-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
