import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Article } from '../hooks/useArticles';
import { useT } from '../i18n';

const sanityClient = createClient({
  projectId: 'j7qyuhtx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source: any) => builder.image(source);

const formatDate = (dateStr: string, locale: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(locale, { month: 'short', year: 'numeric' });
};

function BlogPreview() {
  const t = useT('home');
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
    <div className="p-10 text-center text-purple">
      {t.blog.loading}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {articles.map((a) => (
        <div key={a._id} className="card flex flex-col">
          {a.mainImage && (
            <div className="mb-4 h-40 overflow-hidden rounded-lg">
              <img
                src={urlFor(a.mainImage).width(400).height(160).fit('crop').url()}
                alt={a.title}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>
          )}
          <div className="mb-3">
            <span className="badge badge-purple">{a.category}</span>
          </div>
          <Link to={`/demo/blog/${a.slug.current}`}>
            <h3 className="mb-3 text-[17px] leading-[1.4] text-blue">{a.title}</h3>
          </Link>
          <p className="mb-5 flex-1 text-sm text-blue/60">{a.excerpt}</p>
          <div className="mt-auto flex items-center justify-between border-t border-purple/15 pt-3.5">
            <span className="text-xs font-normal text-purple">
              {a.readTime} {t.blog.minutesSuffix} · {formatDate(a.publishedAt, t.meta.dateLocale)}
            </span>
            <Link to={`/demo/blog/${a.slug.current}`} className="text-[13px] font-bold text-purple">
              {t.blog.readArticle}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── NOTÍCIAS ──────────────────────────────────────────────────
const RSS_SOURCES = [
  { url: 'https://eco.pt/feed/',                       name: 'ECO',           area: 'Negócios' },
  { url: 'https://www.dinheirovivo.pt/feed/',          name: 'Dinheiro Vivo', area: 'Gestão' },
  { url: 'https://www.jornaldenegocios.pt/rss',        name: 'Jornal de Negócios', area: 'Negócios' },
  { url: 'https://marketeer.pt/feed/',                 name: 'Marketeer',     area: 'Marketing' },
  { url: 'https://news.google.com/rss/search?q=%22direito+empresarial%22+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',               area: 'Direito' },
  { url: 'https://news.google.com/rss/search?q=%22direito+laboral%22+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',                  area: 'Direito' },
  { url: 'https://news.google.com/rss/search?q=%22marketing+digital%22+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',                area: 'Marketing' },
  { url: 'https://news.google.com/rss/search?q=%22transforma%C3%A7%C3%A3o+digital%22+empresa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt', area: 'Tecnologia' },
  { url: 'https://news.google.com/rss/search?q=compliance+RGPD+empresa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',                area: 'Compliance' },
];

const AREA_COLORS: Record<string, string> = {
  'Direito':     '#1E5C45',
  'Gestão':      '#233877',
  'Marketing':   '#5B8FD4',
  'Tecnologia':  '#9F8EC2',
  'Negócios':    '#3D5A99',
  'Compliance':  '#7B5EA7',
};

const NEWS_CACHE_KEY = 'nieusync_news';
const NEWS_CACHE_TTL = 2 * 60 * 60 * 1000;

interface NewsItem {
  title:     string;
  link:      string;
  source:    string;
  area:      string;
  thumbnail: string;
}

function isValidImg(url: string): boolean {
  if (typeof url !== 'string' || url.length < 10 || !url.startsWith('http')) return false;
  return !['1x1', 'pixel', 'spacer', 'tracking', 'beacon', 'blank'].some(b => url.includes(b));
}

function extractFromHtml(html: string): string {
  if (!html) return '';
  const patterns = [
    /src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
    /data-src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
  ];
  for (const p of patterns) {
    const m   = html.match(p);
    const url = m?.[1]?.split(' ')[0]?.trim();
    if (url && isValidImg(url)) return url;
  }
  return '';
}

const EXCLUDE_KEYWORDS = [
  'futebol','sporting','benfica','porto','braga','golo','jogador','treinador',
  'mundial','campeonato','liga','atleta','desporto','ténis','ciclismo','natação',
  'guerra','bombardeamento','míssil','ucraniana','rússia','israel','palestina','gazá',
  'cinema','filme','série','televisão','novela','concerto','festival',
  'ator','atriz','celebridade','reality show',
  'horóscopo','meteo','tempo hoje','receita','gastronomia',
];

function isRelevantArticle(title: string): boolean {
  const lower = title.toLowerCase();
  return !EXCLUDE_KEYWORDS.some(kw => lower.includes(kw));
}

function NewsTickerSection() {
  const t = useT('home');
  const [news,    setNews]    = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tryGet = (): NewsItem[] | null => {
      for (const s of [localStorage, sessionStorage]) {
        try {
          const c = s.getItem(NEWS_CACHE_KEY);
          if (c) {
            const { data, ts } = JSON.parse(c);
            if (Date.now() - ts < NEWS_CACHE_TTL && data?.length > 0) return data;
          }
        } catch (_) {}
      }
      return null;
    };

    const trySave = (data: NewsItem[]) => {
      const payload = JSON.stringify({ data, ts: Date.now() });
      for (const s of [localStorage, sessionStorage]) {
        try { s.setItem(NEWS_CACHE_KEY, payload); } catch (_) {}
      }
    };

    const cached = tryGet();
    if (cached) { setNews(cached); setLoading(false); return; }

    Promise.allSettled(
      RSS_SOURCES.map(async (src) => {
        try {
          const ctrl  = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 6000);
          const res   = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(src.url)}&count=15&api_key=njhlm5mla50wsecomipjdwxwdgoeifhi3u26y9fu`,
            { signal: ctrl.signal }
          );
          clearTimeout(timer);
          const json = await res.json();
          if (json.status !== 'ok') return [];

          return json.items.map((item: {
            title: string; link: string; thumbnail: string;
            content: string; description: string;
            enclosure: { link: string; type: string };
          }) => {
            const rawTitle   = item.title || '';
            const lastDash   = rawTitle.lastIndexOf(' - ');
            const hasName    = 'name' in src;
            const cleanTitle = !hasName && lastDash > 10 ? rawTitle.slice(0, lastDash).trim() : rawTitle;
            const sourceName = hasName ? (src as any).name : (lastDash > 10 ? rawTitle.slice(lastDash + 3).trim() : t.news.defaultSource);

            let thumbnail = '';
            if (item.thumbnail && isValidImg(item.thumbnail)) thumbnail = item.thumbnail;
            if (!thumbnail && item.enclosure?.link && item.enclosure?.type?.startsWith('image'))
              thumbnail = item.enclosure.link;
            if (!thumbnail) thumbnail = extractFromHtml(item.content     ?? '');
            if (!thumbnail) thumbnail = extractFromHtml(item.description ?? '');

            return { title: cleanTitle, link: item.link, source: sourceName, area: src.area, thumbnail };
          });
        } catch (_) { return []; }
      })
    ).then((results) => {
      const all = results
        .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .filter(item => item.title && item.link && item.thumbnail && isRelevantArticle(item.title))
        .sort(() => Math.random() - 0.5);

      setNews(all);
      setLoading(false);
      if (all.length > 0) trySave(all);
    });
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    let raf: number;
    const step = () => {
      const el = trackRef.current;
      if (el && !pausedRef.current) {
        el.scrollLeft += 0.6;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [news.length]);

  const scrollByAmount = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    const half = el.scrollWidth / 2;

    // Perto do início e a ir para trás: o browser nunca deixa o scrollLeft
    // ficar negativo, por isso saltamos primeiro (sem animação) para a posição
    // equivalente na 2ª metade da lista duplicada — é visualmente idêntica,
    // e a partir daí já há espaço real para recuar.
    if (direction === -1 && el.scrollLeft - 280 < 0) {
      el.scrollLeft += half;
    }

    el.scrollBy({ left: 280 * direction, behavior: 'smooth' });

    setTimeout(() => {
      if (half > 0) {
        if (el.scrollLeft < 0) el.scrollLeft += half;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
    }, 400);

    resumeTimeoutRef.current = setTimeout(() => { pausedRef.current = false; }, 3500);
  };

  if (loading || news.length === 0) return null;

  const looped = [...news, ...news];

  return (
    <section className="overflow-hidden border-y border-purple/[0.18] bg-white py-9">
      <div className="container mb-5">
        <p className="text-center text-[13px] font-normal uppercase tracking-[0.1em] text-blue/45">
          {t.news.heading}
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-gradient-to-l from-white to-transparent" />

        <button
          type="button"
          aria-label={t.news.prevLabel}
          onClick={() => scrollByAmount(-1)}
          className="absolute left-3 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-purple/35 bg-white shadow-[0_4px_14px_rgba(35,56,119,0.15)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label={t.news.nextLabel}
          onClick={() => scrollByAmount(1)}
          className="absolute right-3 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-purple/35 bg-white shadow-[0_4px_14px_rgba(35,56,119,0.15)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Este div é o que faz scroll de facto — largura fixa (100%) + overflow hidden */}
        <div ref={trackRef} className="w-full overflow-x-hidden">
          {/* Este div é só a fila de cartões, mede-se ao tamanho do conteúdo */}
          <div className="flex w-max">
            {looped.map((item, i) => {
              const color = AREA_COLORS[item.area] ?? 'var(--blue)';
              return (
                <a key={`${item.link}-${i}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2.5 flex w-[260px] shrink-0 flex-col gap-2.5 rounded-xl border border-purple/15 bg-bg px-[18px] py-4 transition-[border-color,box-shadow] duration-200 hover:border-purple/45 hover:shadow-[0_4px_20px_rgba(35,56,119,0.08)]"
                >
                  {item.thumbnail ? (
                    <div className="h-[100px] shrink-0 overflow-hidden rounded-lg">
                      <img src={item.thumbnail} alt={item.title} loading="lazy"
                        className="block h-full w-full object-cover"
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement;
                          const p  = el.parentElement as HTMLElement;
                          el.style.display = 'none';
                          p.style.background = `linear-gradient(135deg, ${color}22, ${color}44)`;
                          p.style.display = 'flex';
                          p.style.alignItems = 'center';
                          p.style.justifyContent = 'center';
                          p.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round" style="opacity:0.4"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
                        }}
                      />
                    </div>
                  ) : (
                    // ponytail: gradiente depende da cor da área — fica inline
                    <div
                      className="flex h-[100px] shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" className="opacity-40">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                      </svg>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="shrink-0 rounded-full px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.08em]"
                      style={{ color, background: `${color}18` }}
                    >
                      {t.news.areas[item.area] ?? item.area}
                    </span>
                    <span className="max-w-[110px] truncate text-[11px] text-blue/35">
                      {item.source}
                    </span>
                  </div>

                  <p className="m-0 line-clamp-3 text-[13px] font-semibold leading-[1.45] text-blue">
                    {item.title}
                  </p>

                  <span className="text-[11px] font-bold text-purple">
                    {t.news.readArticle}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
// ── FIM NOTÍCIAS ───────────────────────────────────────────────

// ── MAILCHIMP ─────────────────────────────────────────────────
const MAILCHIMP_URL =
  'https://nieusync.us15.list-manage.com/subscribe/post-json?u=edf3f3ab247fd09540b382778&id=e87a242f5a';

type LeadStatus = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

function LeadMagnetSection() {
  const t = useT('home');
  const [nome,        setNome]        = useState('');
  const [email,       setEmail]       = useState('');
  const [empresa,     setEmpresa]     = useState('');
  const [aceitaNewsletter, setAceitaNewsletter] = useState(false);
  const [status,      setStatus]      = useState<LeadStatus>('idle');
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const nomeVal    = (formData.get('nome') as string)?.trim()    || nome;
  const emailVal   = (formData.get('email') as string)?.trim()   || email;
  const empresaVal = (formData.get('empresa') as string)?.trim() || empresa;

  if (!nomeVal || !emailVal || !empresaVal || !aceitaNewsletter) return;
  setStatus('loading');

  const cbName = `_mc_cb_${Date.now()}`;

    (window as unknown as Record<string, unknown>)[cbName] = (data: { result: string; msg: string }) => {
      delete (window as unknown as Record<string, unknown>)[cbName];
      if (scriptRef.current) document.body.removeChild(scriptRef.current);
      if (data.result === 'success') {
        setStatus('success');
        setNome(''); setEmail(''); setEmpresa('');
      } else if (data.msg?.toLowerCase().includes('already')) {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    };

    const params = new URLSearchParams({
      EMAIL: emailVal,
      FNAME: nomeVal,
      COMPANY: empresaVal,
      'group[9][1]': '1',
      'group[9][2]': '1',
      b_edf3f3ab247fd09540b382778_e87a242f5a: '',
      c: cbName,
    });
    const script = document.createElement('script');
    script.src = `${MAILCHIMP_URL}&${params.toString()}`;
    scriptRef.current = script;
    document.body.appendChild(script);

    setTimeout(() => {
      if ((window as unknown as Record<string, unknown>)[cbName]) {
        delete (window as unknown as Record<string, unknown>)[cbName];
        setStatus('error');
      }
    }, 10000);
  }, [nome, email, empresa, aceitaNewsletter]);

  const checklistItems = t.leadMagnet.checklist;

  return (
    <section className="bg-grad-main py-20">
      <div className="container">
        <div className="animate-on-scroll grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div>
            <span className="mb-5 inline-block rounded-full border-[1.5px] border-white/40 bg-white/[0.12] px-3.5 py-[5px] text-[11px] font-bold uppercase tracking-[0.1em] text-white">
              {t.leadMagnet.badge}
            </span>
            <h3 className="mb-6 text-[28px] font-bold leading-[1.3] text-white">
              {t.leadMagnet.title}
            </h3>
            <ul className="list-none">
              {checklistItems.map((item) => (
                <li key={item} className="relative py-1.5 pl-5 text-[15px] font-normal text-white/[0.82]">
                  <span className="absolute left-0 font-bold text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-9 shadow-[0_8px_40px_rgba(35,56,119,0.20)]">
            {status === 'success' ? (
              <div className="py-5 text-center">
                <div className="mb-4 text-5xl">✅</div>
                <h3 className="mb-3 text-xl font-bold text-blue">{t.leadMagnet.successTitle}</h3>
                <p className="mb-5 text-sm text-blue/65">
                  {t.leadMagnet.successText}
                </p>

                <a href="/guia-5-proteccoes-legais.pdf" download className="btn-gradient">
                  {t.leadMagnet.downloadCta}
                </a>
              </div>
            ) : (
              <>
                <h3 className="mb-6 text-xl font-bold text-blue">
                  {t.leadMagnet.formTitle}
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="lead-nome">{t.leadMagnet.nameLabel}</label>
                    <input id="lead-nome" name="nome" type="text" placeholder={t.leadMagnet.namePlaceholder} value={nome} onChange={(e) => setNome(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="lead-email">{t.leadMagnet.emailLabel}</label>
                    <input id="lead-email" name="email" type="email" placeholder={t.leadMagnet.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="lead-empresa">{t.leadMagnet.companyLabel}</label>
                    <input id="lead-empresa" name="empresa" type="text" placeholder={t.leadMagnet.companyPlaceholder} value={empresa} onChange={(e) => setEmpresa(e.target.value)} required />
                  </div>
                  <label className="flex cursor-pointer items-start gap-2 text-[12.5px] font-normal normal-case leading-[1.4] tracking-normal text-blue/75">
                    <input
                      type="checkbox"
                      required
                      checked={aceitaNewsletter}
                      onChange={(e) => setAceitaNewsletter(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span>
                      {t.leadMagnet.consent}
                    </span>
                  </label>
                  {status === 'duplicate' && (
                    <p className="m-0 text-[13px] text-red-600">{t.leadMagnet.duplicateError}</p>
                  )}
                  {status === 'error' && (
                    <p className="m-0 text-[13px] text-red-600">{t.leadMagnet.genericError}</p>
                  )}
                  <button
                    type="submit"
                    className={`btn-gradient mt-2 w-full ${status === 'loading' ? 'opacity-70' : ''}`}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? t.leadMagnet.submitting : t.leadMagnet.submit}
                  </button>
                  <p className="m-0 text-center text-xs font-normal text-blue/45">
                    {t.leadMagnet.disclaimer}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const t = useT('home');

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

  return (
    <main className="pt-[72px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-20 pt-[100px]">
        {/* Foto de fundo da sede */}
        <div className="absolute inset-0 z-0 bg-[url(/sede-nieusync.jpg)] bg-cover bg-center" />

        {/* Camada de cor por cima da foto — dá destaque ao texto */}
        <div className="absolute inset-0 z-[1] bg-blue/85" />

        <div className="pointer-events-none absolute -right-[100px] -top-[100px] z-[1] h-[400px] w-[400px] rounded-full border border-purple/10" />
        <div className="pointer-events-none absolute right-[5%] top-[40%] z-[1] h-[280px] w-[280px] rounded-full border border-purple/[0.12]" />
        <div className="pointer-events-none absolute -bottom-[60px] -left-[60px] z-[1] h-[180px] w-[180px] rounded-full border border-purple/[0.14]" />

        <div className="container relative z-[2]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[55%_42%]">
            <div>
              <div className="mb-7 inline-flex items-center rounded-full border border-white/25 bg-white/[0.12] px-[18px] py-[7px]">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-white/85">
                  {t.hero.badge}
                </span>
              </div>

              <h1 className="mb-6 text-[64px] text-white">
                {t.hero.titleStart} <br />
                <span className="text-purple">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
              </h1>

              <p className="mb-9 max-w-[520px] text-[17px] text-white/[0.78]">
                {t.hero.subtitle}
              </p>

              <div className="mb-9 flex flex-wrap gap-3.5">
                <Link
                  to="/demo/contact"
                  className="inline-block rounded-lg bg-purple px-7 py-[15px] text-[13px] font-bold uppercase tracking-[0.08em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-purple"
                >
                  {t.hero.ctaPrimary}
                </Link>
                <Link to="/demo/services" className="btn-outline-white">{t.hero.ctaSecondary}</Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {t.hero.trustPoints.map((point) => (
                  <span key={point} className="text-[13px] font-normal text-white/65">
                    ✓ {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden justify-center md:flex">
              <div className="w-full max-w-[400px] animate-float rounded-[20px] border border-white/[0.18] bg-white/[0.09] p-10 backdrop-blur-[10px]">
                <div className="grid grid-cols-2">
                  {t.hero.stats.map(({ value, label }, i) => (
                    <div
                      key={label}
                      className={`px-4 py-5 ${i % 2 === 0 ? 'border-r border-white/10' : ''} ${i < 2 ? 'border-b border-white/10' : ''}`}
                    >
                      <div className="mb-1.5 bg-gradient-to-br from-white to-white/70 bg-clip-text text-[38px] font-bold leading-none text-transparent">
                        {value}
                      </div>
                      <div className="text-[13px] font-normal text-white/65">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTÍCIAS ── */}
      <NewsTickerSection />

      {/* ── SERVICES ── */}
      <section className="bg-bg py-[100px]">
        <div className="container">
          <div className="animate-on-scroll mb-[100px] text-center">
            <span className="section-label">{t.services.label}</span>
            <div className="accent-line accent-line-center bg-purple bg-none" />
            <h2 className="mb-4 text-blue">{t.services.title}</h2>
            <p className="mx-auto max-w-[560px] text-blue/60">
              {t.services.subtitle}
            </p>
          </div>

          <div className="animate-on-scroll relative mx-auto mt-[60px] h-[220px] w-[220px] overflow-visible md:h-[350px] md:w-[350px]">
            <div className="absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <img src="/Logo_sem_letras.png" alt={t.services.logoAlt} loading="lazy" className="h-[200px] w-[200px] object-contain md:h-[350px] md:w-[350px]" />
            </div>

            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V2m0 0H8m4 0h4M6 12H2l4-8 4 8H6zm12 0h-4l4-8 4 8h-4zm-6 10H8m4 0h4"/></svg>, href: '/demo/services#legal', angle: -90 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>, href: '/demo/services#management', angle: -18 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>, href: '/demo/services#marketing', angle: 54 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, href: '/demo/services#compliance', angle: 126 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, href: '/demo/services#technology', angle: 198 },
            ].map(({ icon, href, angle }, idx) => {
              const label = t.services.orbit[idx];
              const rad = (angle * Math.PI) / 180;
              const radius = window.innerWidth <= 768 ? 130 : 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                // ponytail: posição orbital calculada — o transform fica inline
                <Link key={href} to={href}
                  className="absolute left-1/2 top-1/2 z-[2] flex w-[90px] flex-col items-center gap-2 text-center transition-transform duration-300 hover:scale-110 md:w-[120px]"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-purple/25 bg-white shadow-[0_4px_16px_rgba(35,56,119,0.10)] transition-[border-color,box-shadow] duration-200 hover:border-purple hover:shadow-[0_6px_24px_rgba(159,142,194,0.30)] md:h-16 md:w-16 [&_svg]:h-[22px] [&_svg]:w-[22px] md:[&_svg]:h-7 md:[&_svg]:w-7">
                    {icon}
                  </div>
                  <span className="text-xs font-bold leading-[1.3] tracking-[0.02em] text-blue md:text-[13px]">{label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-[120px] text-center">
            <Link to="/demo/services" className="btn-gradient">{t.services.cta}</Link>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="bg-grad-main py-[100px]">
        <div className="container">
          <div className="animate-on-scroll mb-16 text-center">
            <span className="section-label section-label-white">{t.methodology.label}</span>
            <div className="accent-line accent-line-white accent-line-center" />
            <h2 className="mb-4 text-white">{t.methodology.title}</h2>
            <p className="mx-auto max-w-[540px] text-white/70">
              {t.methodology.subtitle}
            </p>
          </div>

          <div className="animate-on-scroll relative mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.methodology.stepsTop.map((step, i) => (
              <div key={step.num} className="stagger-child relative text-center">
                {i < 2 && <div className="absolute -right-[12%] top-[30px] hidden -translate-y-1/2 text-xl font-bold text-white/[0.18] md:block">→</div>}
                <div className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white/30 bg-white/[0.12]">
                  <span className="text-lg font-bold text-white">{step.num}</span>
                </div>
                <h3 className="mb-2.5 text-base text-white">{step.title}</h3>
                <p className="text-sm text-white/[0.68]">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll relative mx-auto grid max-w-full grid-cols-1 gap-6 md:max-w-[680px] md:grid-cols-2">
            {t.methodology.stepsBottom.map((step, i) => (
              <div key={step.num} className="stagger-child relative text-center">
                {i < 1 && <div className="absolute -right-[12%] top-[30px] hidden -translate-y-1/2 text-xl font-bold text-white/[0.18] md:block">→</div>}
                <div className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-white/30 bg-white/[0.12]">
                  <span className="text-lg font-bold text-white">{step.num}</span>
                </div>
                <h3 className="mb-2.5 text-base text-white">{step.title}</h3>
                <p className="text-sm text-white/[0.68]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONA ── */}
      <section className="bg-bg py-20">
        <div className="container">
          <h2 className="animate-on-scroll mb-10 text-center text-blue">
            {t.persona.headingBefore}<span className="text-purple">{t.persona.headingBrand}</span>{t.persona.headingAfter}
          </h2>
          <div className="animate-on-scroll mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.persona.cards.map((text) => (
              <div key={text} className="stagger-child animate-on-scroll flex items-start gap-3 rounded-r-[14px] border-l-4 border-blue bg-white px-[26px] py-[22px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
                <p className="m-0 text-[15px] text-blue">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="mx-auto mb-6 max-w-[560px] italic text-blue/65">
              {t.persona.quote}
            </p>
            <Link to="/demo/contact" className="btn-gradient">{t.persona.cta}</Link>
          </div>
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
      <LeadMagnetSection />

      {/* ── BLOG PREVIEW ── */}
      <section className="bg-bg py-20">
        <div className="container">
          <div className="animate-on-scroll mb-12 text-center">
            <span className="section-label">{t.blog.label}</span>
            <div className="accent-line accent-line-center bg-purple bg-none" />
            <h2 className="mb-3 text-blue">{t.blog.title}</h2>
            <p className="mx-auto max-w-[460px] text-blue/60">{t.blog.subtitle}</p>
          </div>
          <BlogPreview />
          <div className="mt-10 text-center">
            <Link to="/demo/blog" className="btn-gradient">{t.blog.cta}</Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative overflow-hidden bg-grad-main py-[100px] text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" />
        <div className="container relative">
          <div className="animate-on-scroll">
            <h2 className="mb-5 font-display text-[clamp(32px,5vw,48px)] font-bold text-white">
              {t.cta.title}
            </h2>
            <p className="mx-auto mb-10 max-w-[560px] text-[17px] text-white/75">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/demo/contact" className="btn-outline-white px-9 py-4">{t.cta.primary}</Link>
              <a href={`https://wa.me/351933644596?text=${encodeURIComponent(t.cta.whatsappMessage)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-9 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-blue transition duration-300 hover:-translate-y-[3px] hover:bg-grad-reverse hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
