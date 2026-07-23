import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';

const categories = ['Todos', 'Direito', 'Marketing', 'Gestão', 'Financeiro', 'Tecnologia'];

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' })
}

// ── MAILCHIMP — mesmo URL e grupo já configurados no Home.tsx ──
const MAILCHIMP_URL =
  'https://nieusync.us15.list-manage.com/subscribe/post-json?u=edf3f3ab247fd09540b382778&id=e87a242f5a';

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const { articles, loading } = useArticles();

  const filtered = activeCategory === 'Todos'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  useEffect(() => {
    document.title = 'NIEUSYNC - Blog & Recursos · Artigos sobre Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital, Tecnologias de Informação e Inteligência Artificial';
  }, []);

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    const cbName = `_mc_blog_${Date.now()}`;
    (window as Record<string, unknown>)[cbName] = (data: { result: string; msg: string }) => {
      delete (window as Record<string, unknown>)[cbName];
      if (data.result === 'success') {
        setStatus('success');
        setEmail('');
      } else if (data.msg?.toLowerCase().includes('already')) {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    };

    const params = new URLSearchParams({
      EMAIL: email,
      'group[9][2]': '1',
      b_edf3f3ab247fd09540b382778_e87a242f5a: '',
      c: cbName,
    });

    const script = document.createElement('script');
    script.src = `${MAILCHIMP_URL}&${params.toString()}`;
    document.body.appendChild(script);

    setTimeout(() => {
      if ((window as Record<string, unknown>)[cbName]) {
        delete (window as Record<string, unknown>)[cbName];
        setStatus('error');
      }
    }, 10000);
  }, [email]);

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label section-label-white">Conhecimento</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '16px' }}>Blog & Recursos</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto', fontSize: '18px' }}>
            Artigos práticos de Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital, Tecnologias de Informação e Inteligência Artificial, para empresas que querem crescer com solidez.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: '60px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px', justifyContent: 'center' }}>
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
                    ? { background: 'var(--purple)', color: 'var(--white)', border: 'none' }
                    : { background: 'transparent', border: '1.5px solid var(--purple)', color: 'var(--purple)' }),
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }} className="blog-layout">
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--purple)', fontFamily: 'Montserrat,sans-serif' }}>
                  A carregar artigos...
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <p style={{ color: 'rgba(35,56,119,0.50)', fontFamily: 'Montserrat,sans-serif' }}>
                    Nenhum artigo encontrado para esta categoria.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }} className="articles-grid">
                  {filtered.map((a) => (
                    <div key={a._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '14px' }}>
                        <span className="badge badge-purple">{a.category}</span>
                      </div>
                      <Link to={`/blog/${a.slug.current}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '17px', color: 'var(--blue)', marginBottom: '10px', lineHeight: 1.40 }}>{a.title}</h3>
                      </Link>
                      <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.60)', marginBottom: '16px', flex: 1 }}>{a.excerpt}</p>
                      <div style={{ borderTop: '1px solid rgba(159,142,194,0.15)', paddingTop: '14px', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'var(--purple)' }}>
                            {a.readTime} min de leitura · {formatDate(a.publishedAt)}
                          </span>
                          <Link to={`/blog/${a.slug.current}`} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--purple)' }}>
                            Ler artigo →
                          </Link>
                        </div>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.45)' }}>{a.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', top: '90px' }}>
              <div className="card">
                <h3 style={{ fontSize: '18px', color: 'var(--blue)', marginBottom: '10px' }}>Newsletter Mensal</h3>
                {status === 'success' ? (
                  <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)' }}>
                    Obrigado! Verifica o teu email para confirmar a subscrição.
                  </p>
                ) : (
                  <>
                    <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px' }}>
                      Receba os melhores artigos sobre Direito Empresarial, Compliance, Gestão Estratégica, Marketing Digital, Tecnologias de Informação e Inteligência Artificial directamente no seu email.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label>Email profissional</label>
                        <input type="email" placeholder="email@empresa.pt" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      {status === 'duplicate' && (
                        <p style={{ fontSize: '12px', color: '#e53e3e', margin: 0 }}>Este email já está subscrito.</p>
                      )}
                      {status === 'error' && (
                        <p style={{ fontSize: '12px', color: '#e53e3e', margin: 0 }}>Ocorreu um erro. Tenta novamente.</p>
                      )}
                      <button type="submit" className="btn-gradient" disabled={status === 'loading'} style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}>
                        {status === 'loading' ? 'A subscrever...' : 'Subscrever'}
                      </button>
                    </form>
                  </>
                )}
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.40)', textAlign: 'center', marginTop: '10px' }}>
                  Sem spam. Pode cancelar a qualquer momento.
                </p>
              </div>
              <div className="card" style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--blue)', marginBottom: '10px' }}>Precisa de ajuda?</h3>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '16px' }}>
                  Fale directamente com a nossa equipa, sem qualquer compromisso.
                </p>
                <Link to="/contacto" className="btn-gradient" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  Agendar Consulta
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
