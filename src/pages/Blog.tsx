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
    <main className="pt-[72px]">
      <section className="bg-grad-main py-20">
        <div className="container text-center">
          <span className="section-label section-label-white">{t.hero.label}</span>
          <div className="accent-line accent-line-white accent-line-center" />
          <h1 className="mb-4 text-white">{t.hero.title}</h1>
          <p className="mx-auto max-w-[520px] text-lg text-white/75">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-bg pb-[100px] pt-[60px]">
        <div className="container">
          <div className="mb-12 flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`min-h-[44px] cursor-pointer rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'border-none bg-purple text-white'
                    : 'border-[1.5px] border-purple bg-transparent text-purple'
                }`}
              >
                {t.categories[cat.key]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_300px]">
            <div>
              {loading ? (
                <div className="py-[60px] text-center text-purple">
                  {t.list.loading}
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-[60px] text-center">
                  <p className="text-blue/50">
                    {t.list.empty}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {filtered.map((a) => (
                    <div key={a._id} className="card flex flex-col">
                      <div className="mb-3.5">
                        <span className="badge badge-purple">{a.category}</span>
                      </div>
                      <Link to={`/demo/blog/${a.slug.current}`}>
                        <h3 className="mb-2.5 text-[17px] leading-[1.4] text-blue">{a.title}</h3>
                      </Link>
                      <p className="mb-4 flex-1 text-sm text-blue/60">{a.excerpt}</p>
                      <div className="mt-auto border-t border-purple/15 pt-3.5">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-xs font-normal text-purple">
                            {t.readTime(a.readTime)} · {formatDate(a.publishedAt, dateLocale)}
                          </span>
                          <Link to={`/demo/blog/${a.slug.current}`} className="text-[13px] font-bold text-purple">
                            {t.list.readArticle}
                          </Link>
                        </div>
                        <span className="text-xs font-normal text-blue/45">{a.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sticky top-[90px]">
              <div className="card">
                <h3 className="mb-2.5 text-lg text-blue">{t.newsletter.title}</h3>
                {status === 'success' ? (
                  <p className="text-sm text-blue/65">
                    {t.newsletter.success}
                  </p>
                ) : (
                  <>
                    <p className="mb-5 text-sm text-blue/65">
                      {t.newsletter.description}
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                      <div>
                        <label>{t.newsletter.emailLabel}</label>
                        <input type="email" placeholder={t.newsletter.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      {status === 'duplicate' && (
                        <p className="m-0 text-xs text-red-600">{t.newsletter.duplicate}</p>
                      )}
                      {status === 'error' && (
                        <p className="m-0 text-xs text-red-600">{t.newsletter.error}</p>
                      )}
                      <button
                        type="submit"
                        className={`btn-gradient w-full ${status === 'loading' ? 'opacity-70' : ''}`}
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? t.newsletter.submitting : t.newsletter.submit}
                      </button>
                    </form>
                  </>
                )}
                <p className="mt-2.5 text-center text-xs font-normal text-blue/40">
                  {t.newsletter.disclaimer}
                </p>
              </div>
              <div className="card mt-5">
                <h3 className="mb-2.5 text-base text-blue">{t.help.title}</h3>
                <p className="mb-4 text-sm text-blue/65">
                  {t.help.description}
                </p>
                <Link to="/demo/contact" className="btn-gradient flex w-full justify-center">
                  {t.help.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
