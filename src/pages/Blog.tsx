import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { useT, useLang } from '../i18n';

// `value` is the category as stored in Sanity; `key` selects its translated label.
const categories = [
  { value: 'Todos', key: 'all' },
  { value: 'Direito', key: 'law' },
  { value: 'Marketing', key: 'marketing' },
  { value: 'Gestão', key: 'management' },
  { value: 'Financeiro', key: 'finance' },
  { value: 'Tecnologia', key: 'technology' },
] as const;

const ALL_CATEGORY = 'Todos';

const formatDate = (dateStr: string, locale: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

// ── MAILCHIMP — mesmo URL e grupo já configurados no Home.tsx ──
const MAILCHIMP_URL =
  'https://nieusync.us15.list-manage.com/subscribe/post-json?u=edf3f3ab247fd09540b382778&id=e87a242f5a';

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export default function Blog() {
  const t = useT('blog');
  const { lang } = useLang();
  const dateLocale = lang === 'pt' ? 'pt-PT' : 'en-GB';
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const { articles, loading } = useArticles();

  const filtered = activeCategory === ALL_CATEGORY
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  useEffect(() => {
    document.title = t.documentTitle;
  }, [t]);

  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    const cbName = `_mc_blog_${Date.now()}`;
    (window as unknown as Record<string, unknown>)[cbName] = (data: { result: string; msg: string }) => {
      delete (window as unknown as Record<string, unknown>)[cbName];
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
      if ((window as unknown as Record<string, unknown>)[cbName]) {
        delete (window as unknown as Record<string, unknown>)[cbName];
        setStatus('error');
      }
    }, 10000);
  }, [email]);

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label section-label-white">{t.hero.label}</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 style={{ color: 'var(--white)', marginBottom: '16px' }}>{t.hero.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto', fontSize: '18px' }}>
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: '60px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px', justifyContent: 'center' }}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px',
                  letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 20px',
                  borderRadius: '100px', cursor: 'pointer', minHeight: '44px',
                  transition: 'all 0.2s ease',
                  ...(activeCategory === cat.value
                    ? { background: 'var(--purple)', color: 'var(--white)', border: 'none' }
                    : { background: 'transparent', border: '1.5px solid var(--purple)', color: 'var(--purple)' }),
                }}
              >
                {t.categories[cat.key]}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }} className="blog-layout">
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--purple)', fontFamily: 'Montserrat,sans-serif' }}>
                  {t.list.loading}
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <p style={{ color: 'rgba(35,56,119,0.50)', fontFamily: 'Montserrat,sans-serif' }}>
                    {t.list.empty}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }} className="articles-grid">
                  {filtered.map((a) => (
                    <div key={a._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '14px' }}>
                        <span className="badge badge-purple">{a.category}</span>
                      </div>
                      <Link to={`/demo/blog/${a.slug.current}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '17px', color: 'var(--blue)', marginBottom: '10px', lineHeight: 1.40 }}>{a.title}</h3>
                      </Link>
                      <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.60)', marginBottom: '16px', flex: 1 }}>{a.excerpt}</p>
                      <div style={{ borderTop: '1px solid rgba(159,142,194,0.15)', paddingTop: '14px', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'var(--purple)' }}>
                            {t.readTime(a.readTime)} · {formatDate(a.publishedAt, dateLocale)}
                          </span>
                          <Link to={`/demo/blog/${a.slug.current}`} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--purple)' }}>
                            {t.list.readArticle}
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
                <h3 style={{ fontSize: '18px', color: 'var(--blue)', marginBottom: '10px' }}>{t.newsletter.title}</h3>
                {status === 'success' ? (
                  <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)' }}>
                    {t.newsletter.success}
                  </p>
                ) : (
                  <>
                    <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '20px' }}>
                      {t.newsletter.description}
                    </p>
                    <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label>{t.newsletter.emailLabel}</label>
                        <input type="email" placeholder={t.newsletter.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      {status === 'duplicate' && (
                        <p style={{ fontSize: '12px', color: '#e53e3e', margin: 0 }}>{t.newsletter.duplicate}</p>
                      )}
                      {status === 'error' && (
                        <p style={{ fontSize: '12px', color: '#e53e3e', margin: 0 }}>{t.newsletter.error}</p>
                      )}
                      <button type="submit" className="btn-gradient" disabled={status === 'loading'} style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}>
                        {status === 'loading' ? t.newsletter.submitting : t.newsletter.submit}
                      </button>
                    </form>
                  </>
                )}
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.40)', textAlign: 'center', marginTop: '10px' }}>
                  {t.newsletter.disclaimer}
                </p>
              </div>
              <div className="card" style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', color: 'var(--blue)', marginBottom: '10px' }}>{t.help.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(35,56,119,0.65)', marginBottom: '16px' }}>
                  {t.help.description}
                </p>
                <Link to="/demo/contact" className="btn-gradient" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  {t.help.cta}
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
