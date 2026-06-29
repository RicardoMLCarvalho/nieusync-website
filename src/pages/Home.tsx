import { useEffect, useState, useRef, useCallback } from 'react';
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
                loading="lazy"
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

// ── NOTÍCIAS ──────────────────────────────────────────────────
const RSS_SOURCES = [
    // ── Direito ──
  {
    url:  'https://news.google.com/rss/search?q=%22direito+empresarial%22+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Direito',
  },
  {
    url:  'https://news.google.com/rss/search?q=%22direito+laboral%22+empresa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Direito',
  },
  // ── Gestão ──
  {
    url:  'https://news.google.com/rss/search?q=%22gest%C3%A3o+estrat%C3%A9gica%22+PME+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Gestão',
  },
  {
    url:  'https://news.google.com/rss/search?q=%22consultoria+empresarial%22+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Gestão',
  },
  // ── Marketing ──
  {
    url:  'https://news.google.com/rss/search?q=%22marketing+digital%22+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Marketing',
  },
  {
    url:  'https://news.google.com/rss/search?q=%22estrat%C3%A9gia+digital%22+empresa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Marketing',
  },
  // ── Tecnologia ──
  {
    url:  'https://news.google.com/rss/search?q=%22transforma%C3%A7%C3%A3o+digital%22+empresa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Tecnologia',
  },
  {
    url:  'https://news.google.com/rss/search?q=%22intelig%C3%AAncia+artificial%22+empresas+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Tecnologia',
  },
  // ── RH & Compliance ──
  {
    url:  'https://news.google.com/rss/search?q=%22recursos+humanos%22+empresa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'RH & Compliance',
  },
  {
    url:  'https://news.google.com/rss/search?q=compliance+RGPD+empresa+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'RH & Compliance',
  },
  // ── Negócios ──
  {
    url:  'https://news.google.com/rss/search?q=PME+Portugal+crescimento&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Negócios',
  },
  {
    url:  'https://news.google.com/rss/search?q=%22empreendedorismo%22+Portugal&hl=pt-PT&gl=PT&ceid=PT:pt',
    name: 'Google News', area: 'Negócios',
  },
];

const AREA_COLORS: Record<string, string> = {
  'Gestão':     '#233877',
  'Tecnologia': '#9F8EC2',
  'Marketing':  '#5B8FD4',
  'Negócios':   '#3D5A99',
  'Direito':    '#1E5C45',
  'RH & Compliance': '#7B5EA7',
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
  if (typeof url !== 'string' || url.length < 10) return false;
  if (!url.startsWith('http')) return false;
  const blocked = ['1x1', 'pixel', 'spacer', 'tracking', 'beacon', 'blank'];
  if (blocked.some(b => url.includes(b))) return false;
  // Aceita URLs com extensão conhecida OU de hosts de imagens conhecidos
  const hasImgExt = /\.(jpg|jpeg|png|webp|gif|avif)/i.test(url);
  const isImgHost = /sapo\.pt|cloudfront|cloudinary|imgix|twimg|fbcdn|wp\.com|squarespace|media\./i.test(url);
  return hasImgExt || isImgHost;
}

function extractFromHtml(html: string): string {
  if (!html) return '';
  const patterns = [
    /src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
    /data-src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
    /data-lazy=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
    /data-original=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
    /data-lazy-src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
    /data-echo=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)/i,
    /srcset=["']([^"' ,]+)/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    const url = m?.[1]?.split(' ')[0]?.trim();
    if (url && isValidImg(url)) return url;
  }
  return '';
}

// ── Tenta múltiplos proxies para ir buscar o og:image do artigo ──
async function fetchOgImage(link: string): Promise<string> {
  const proxies = [
    (url: string) => ({ endpoint: `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,          isJson: false }),
    (url: string) => ({ endpoint: `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,          isJson: true  }),
    (url: string) => ({ endpoint: `https://corsproxy.io/?${encodeURIComponent(url)}`,                       isJson: false }),
    (url: string) => ({ endpoint: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,     isJson: false }),
    (url: string) => ({ endpoint: `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`,       isJson: false }),
  ];

  const ogPatterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
  ];

  for (const makeProxy of proxies) {
    try {
      const { endpoint, isJson } = makeProxy(link);
      const ctrl  = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 7000);
      const res   = await fetch(endpoint, { signal: ctrl.signal });
      clearTimeout(timer);

      if (!res.ok) continue;

      let html = '';
      if (isJson) {
        const data = await res.json();
        html = data.contents ?? data.body ?? '';
      } else {
        html = await res.text();
      }

      if (!html || html.length < 100) continue;

      for (const p of ogPatterns) {
        const m = html.match(p);
        if (m?.[1]?.startsWith('http')) return m[1];
      }
    } catch (_) {}
  }
  return '';
}

async function fetchRssDirect(src: { url: string; name: string; area: string }): Promise<NewsItem[]> {
  const proxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(src.url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(src.url)}`,
    `https://corsproxy.io/?${encodeURIComponent(src.url)}`,
  ];

  for (const proxyUrl of proxies) {
    try {
      const ctrl  = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res   = await fetch(proxyUrl, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;

      let xml = '';
      if (proxyUrl.includes('/get?')) {
        const data = await res.json();
        xml = data.contents ?? '';
      } else {
        xml = await res.text();
      }

      if (!xml || xml.length < 200) continue;

      // Parse dos <item> do XML
      const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
      const items: NewsItem[] = [];
      let match;

      while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
        const block = match[1];

        const title = (
          block.match(/<title[^>]*>(?:<!\[CDATA\[)?\s*([\s\S]*?)\s*(?:\]\]>)?<\/title>/i)?.[1] ?? ''
        ).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

        const link = (
          block.match(/<link[^>]*>(?:<!\[CDATA\[)?\s*(https?[^\s<\]]+)/i)?.[1] ??
          block.match(/<guid[^>]*>(?:<!\[CDATA\[)?\s*(https?[^\s<\]]+)/i)?.[1] ?? ''
        ).trim();

        const thumbnail = (
          block.match(/<media:content[^>]+url=["']([^"']+)["']/i)?.[1] ??
          block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i)?.[1] ??
          block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/i)?.[1] ??
          extractFromHtml(block.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] ?? '') ??
          ''
        );

        if (title && link) {
          items.push({ title, link, source: src.name, area: src.area, thumbnail });
        }
      }

      if (items.length > 0) return items;
    } catch (_) {}
  }
  return [];
}

function NewsTickerSection() {
  const [news,    setNews]    = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(NEWS_CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < NEWS_CACHE_TTL && data.length > 0) {
          setNews(data);
          setLoading(false);
          return;
        }
      }
    } catch (_) {}

    // ── FASE 1: fetch RSS ──
    Promise.allSettled(
      RSS_SOURCES.map(async (src) => {
        const res  = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(src.url)}&count=5&api_key=njhlm5mla50wsecomipjdwxwdgoeifhi3u26y9fu`
        );
        const json = await res.json();
        if (json.status !== 'ok') {
          // rss2json falhou — tenta parser direto
          return fetchRssDirect(src);
        }
        
        return json.items.map((item: {
          title: string; link: string; thumbnail: string;
          content: string; description: string;
          enclosure: { link: string; type: string };
        }) => {
          let thumbnail = '';

          if (item.thumbnail && isValidImg(item.thumbnail))
            thumbnail = item.thumbnail;

          if (!thumbnail && item.enclosure?.link && item.enclosure?.type?.startsWith('image'))
            thumbnail = item.enclosure.link;

          if (!thumbnail) thumbnail = extractFromHtml(item.content     ?? '');
          if (!thumbnail) thumbnail = extractFromHtml(item.description ?? '');

          return { title: item.title, link: item.link, source: src.name, area: src.area, thumbnail };
        });
      })
    ).then(async (results) => {
      const all = results
        .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .sort(() => Math.random() - 0.5);

      setNews(all);
      setLoading(false);

      // ── FASE 2: og:image em background para artigos sem imagem ──
      const sourceMap = Object.fromEntries(RSS_SOURCES.map(s => [s.name, s]));
      const missing = all
        .map((a, i) => ({ ...a, _idx: i }))
        .filter(a => !a.thumbnail || sourceMap[a.source]?.forceOg);

      if (missing.length > 0) {
        const enriched = [...all];

        await Promise.allSettled(
          missing.map(async (item) => {
            const img = await fetchOgImage(item.link);
            if (img) enriched[item._idx] = { ...enriched[item._idx], thumbnail: img };
          })
        );

        setNews([...enriched]);
        try {
          localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ data: enriched, ts: Date.now() }));
        } catch (_) {}
      } else {
        try {
          localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ data: all, ts: Date.now() }));
        } catch (_) {}
      }
    });
  }, []);

  if (loading || news.length === 0) return null;

  const looped = [...news, ...news, ...news];

  return (
    <section style={{
      background: 'var(--white)',
      borderTop:    '1px solid rgba(159,142,194,0.18)',
      borderBottom: '1px solid rgba(159,142,194,0.18)',
      padding: '36px 0',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ marginBottom: '20px' }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 400,
          fontSize: '13px', color: 'rgba(35,56,119,0.45)',
          textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.10em',
        }}>
          Notícias relevantes para o seu negócio
        </p>
      </div>

      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div className="news-track">
          {looped.map((item, i) => {
            const color = AREA_COLORS[item.area] ?? 'var(--blue)';
            return (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
                style={{
                  flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px',
                  width: '260px', padding: '16px 18px', margin: '0 10px',
                  background: 'var(--bg)', borderRadius: '12px',
                  border: '1px solid rgba(159,142,194,0.15)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* ── IMAGEM ── */}
                {item.thumbnail ? (
                  <div style={{ borderRadius: '8px', overflow: 'hidden', height: '100px', flexShrink: 0 }}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        const img    = e.currentTarget as HTMLImageElement;
                        const parent = img.parentElement as HTMLElement;
                        img.style.display = 'none';
                        parent.style.background = `linear-gradient(135deg, ${color}22, ${color}44)`;
                        parent.style.display = 'flex';
                        parent.style.alignItems = 'center';
                        parent.style.justifyContent = 'center';
                        parent.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round" style="opacity:0.4"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
                      }}
                    />
                  </div>
                ) : (
                  <div style={{
                    borderRadius: '8px', height: '100px', flexShrink: 0,
                    background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" style={{ opacity: 0.4 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                  </div>
                )}

                {/* ── ÁREA + FONTE ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '10px',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    color: color, background: `${color}18`,
                    padding: '3px 8px', borderRadius: '100px', flexShrink: 0,
                  }}>
                    {item.area}
                  </span>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(35,56,119,0.35)', whiteSpace: 'nowrap' }}>
                    {item.source}
                  </span>
                </div>

                {/* ── TÍTULO ── */}
                <p style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '13px',
                  color: 'var(--blue)', lineHeight: 1.45, margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {item.title}
                </p>

                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '11px', color: 'var(--purple)' }}>
                  Ler artigo →
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .news-track {
          display: flex;
          width: max-content;
          animation: scrollNews 90s linear infinite;
        }
        .news-track:hover { animation-play-state: paused; }
        .news-card:hover {
          border-color: rgba(159,142,194,0.45) !important;
          box-shadow: 0 4px 20px rgba(35,56,119,0.08);
        }
        @keyframes scrollNews {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
// ── FIM NOTÍCIAS ───────────────────────────────────────────────

// ── MAILCHIMP ─────────────────────────────────────────────────
const MAILCHIMP_URL =
  'https://SUBSTITUIR.us1.list-manage.com/subscribe/post-json?u=SUBSTITUIR&id=SUBSTITUIR';

type LeadStatus = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

function LeadMagnetSection() {
  const [nome,    setNome]    = useState('');
  const [email,   setEmail]   = useState('');
  const [empresa, setEmpresa] = useState('');
  const [status,  setStatus]  = useState<LeadStatus>('idle');
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !empresa) return;
    setStatus('loading');

    const cbName = `_mc_cb_${Date.now()}`;

    (window as Record<string, unknown>)[cbName] = (data: { result: string; msg: string }) => {
      delete (window as Record<string, unknown>)[cbName];
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

    const params = new URLSearchParams({ EMAIL: email, FNAME: nome, MMERGE6: empresa, c: cbName });
    const script = document.createElement('script');
    script.src = `${MAILCHIMP_URL}&${params.toString()}`;
    scriptRef.current = script;
    document.body.appendChild(script);

    setTimeout(() => {
      if ((window as Record<string, unknown>)[cbName]) {
        delete (window as Record<string, unknown>)[cbName];
        setStatus('error');
      }
    }, 10000);
  }, [nome, email, empresa]);

  const checklistItems = [
    'Contratos que não pode dispensar',
    'Como evitar multas RGPD',
    'Direito do trabalho: o essencial',
    'Due diligence antes de assinar',
    'Check-list de compliance anual',
  ];

  return (
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
              {checklistItems.map((item) => (
                <li key={item} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '15px', color: 'rgba(255,255,255,0.82)', padding: '6px 0', paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--white)', fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '36px', boxShadow: '0 8px 40px rgba(35,56,119,0.20)' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--blue)', marginBottom: '12px' }}>Guia enviado!</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(35,56,119,0.65)' }}>
                  Verifique a tua caixa de email. Se não encontrar, verifique a pasta de spam.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--blue)', marginBottom: '24px' }}>
                  Descarregar guia gratuito
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label htmlFor="lead-nome">Nome completo</label>
                    <input id="lead-nome" type="text" placeholder="O seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="lead-email">Email profissional</label>
                    <input id="lead-email" type="email" placeholder="email@empresa.pt" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="lead-empresa">Nome da empresa</label>
                    <input id="lead-empresa" type="text" placeholder="A sua empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required />
                  </div>
                  {status === 'duplicate' && (
                    <p style={{ fontSize: '13px', color: '#e53e3e', margin: 0 }}>Este email já está registado. Verifica a tua caixa de entrada.</p>
                  )}
                  {status === 'error' && (
                    <p style={{ fontSize: '13px', color: '#e53e3e', margin: 0 }}>Ocorreu um erro. Tenta novamente ou contacta-nos directamente.</p>
                  )}
                  <button type="submit" className="btn-gradient" disabled={status === 'loading'} style={{ width: '100%', marginTop: '8px', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'A enviar...' : 'Descarregar agora →'}
                  </button>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(35,56,119,0.45)', textAlign: 'center', margin: 0 }}>
                    Sem spam. Pode cancelar a qualquer momento.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .lead-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'NIEUSYNC - Consultora B2B · Direito Empresarial, Gestão Estratégica, Marketing Digital e Tecnologias de Informação';
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
          { size: 280, top: '40%',    right: '5%',     opacity: 0.12 },
          { size: 180, bottom: '-60px', left: '-60px', opacity: 0.14 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
            border: `1px solid rgba(159,142,194,${c.opacity})`,
            top: (c as any).top, right: (c as any).right,
            bottom: (c as any).bottom, left: (c as any).left, pointerEvents: 'none',
          }} />
        ))}

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '55% 42%', gap: '48px', alignItems: 'center' }} className="hero-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '7px 18px', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Consultora B2B · Portugal
                </span>
              </div>

              <h1 style={{ color: 'var(--white)', marginBottom: '24px', fontSize: '64px' }}>
                WE ARE THE BASIS FOR <br />
                <span style={{ color: 'var(--purple)' }}>YOUR BUSINESS</span> TO FLY
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '17px', maxWidth: '520px', marginBottom: '36px' }}>
                Direito Empresarial, Gestão Estratégica, Marketing Digital e Tecnologia de Informação integrados num único parceiro de confiança.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <Link to="/contacto"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--white)'; (e.currentTarget as HTMLElement).style.color = 'var(--purple)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--purple)'; (e.currentTarget as HTMLElement).style.color = 'var(--white)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  style={{ fontSize: '13px', padding: '15px 28px', background: 'var(--purple)', color: 'var(--white)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, borderRadius: '8px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.25s ease, color 0.25s ease, transform 0.2s ease' }}
                >
                  Agendar Consulta →
                </Link>
                <Link to="/servicos" className="btn-outline-white">Conhecer os Serviços</Link>
              </div>

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {['Parceiro Estratégico', 'Online ou presencial', 'Sem compromisso'].map((t) => (
                  <span key={t} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-card-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="animate-float" style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '20px', padding: '40px', backdropFilter: 'blur(10px)', width: '100%', maxWidth: '400px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {[
                    { value: '360°', label: 'Abordagem integrada' },
                    { value: '5',    label: 'Áreas especializadas' },
                    { value: 'B2B',  label: 'Foco exclusivo em empresas' },
                    { value: '100%', label: 'Compromisso com resultados' },
                  ].map(({ value, label }, i) => (
                    <div key={label} style={{ padding: '20px 16px', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.10)' : 'none', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}>
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

      {/* ── NOTÍCIAS ── */}
      <NewsTickerSection />

      {/* ── SERVICES ── */}
      <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '100px' }}>
            <span className="section-label">Os nossos serviços</span>
            <div className="accent-line accent-line-center" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
            <h2 style={{ color: 'var(--blue)', marginBottom: '16px' }}>Cinco áreas. Uma visão integrada.</h2>
            <p style={{ color: 'rgba(35,56,119,0.60)', maxWidth: '560px', margin: '0 auto' }}>
              Não isole os seus problemas. Sincronize o seu negócio.
            </p>
          </div>

          <div className="services-orbit animate-on-scroll" style={{ position: 'relative', width: '350px', height: '350px', margin: '60px auto 0', overflow: 'visible' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/Logo_sem_letras.png" alt="NIEUSYNC" loading="lazy" style={{ width: '350px', height: '350px', objectFit: 'contain' }} />
            </div>

            {[
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V2m0 0H8m4 0h4M6 12H2l4-8 4 8H6zm12 0h-4l4-8 4 8h-4zm-6 10H8m4 0h4"/></svg>, label: 'Direito Empresarial', href: '/servicos#direito', angle: -90 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>, label: 'Gestão Estratégica', href: '/servicos#gestao', angle: -18 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>, label: 'Marketing Digital', href: '/servicos#marketing', angle: 54 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: 'RH & Compliance', href: '/servicos#rh', angle: 126 },
              { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, label: 'Tecnologias de Informação', href: '/servicos#tecnologias', angle: 198 },
            ].map(({ icon, label, href, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const radius = window.innerWidth <= 768 ? 130 : 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <Link key={label} to={href} className="orbit-item"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none', width: '120px', textAlign: 'center', transition: 'transform 0.3s ease', zIndex: 2 }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.1)`}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--white)', border: '2px solid rgba(159,142,194,0.25)', boxShadow: '0 4px 16px rgba(35,56,119,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(159,142,194,0.30)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(159,142,194,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(35,56,119,0.10)'; }}
                  >
                    {icon}
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--blue)', lineHeight: 1.3, letterSpacing: '0.02em' }}>{label}</span>
                </Link>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '120px' }}>
            <Link to="/servicos" className="btn-gradient">Ver todos os serviços →</Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .services-orbit { width: 220px !important; height: 220px !important; }
            .services-orbit .orbit-item { width: 90px !important; }
            .services-orbit .orbit-item > div { width: 52px !important; height: 52px !important; }
            .services-orbit .orbit-item > div svg { width: 22px !important; height: 22px !important; }
            .services-orbit .orbit-item > span { font-size: 12px !important; }
            .services-orbit img { width: 200px !important; height: 200px !important; }
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
              Um processo claro, sem surpresas, com entrega de valor em cada fase.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', position: 'relative', marginBottom: '32px' }} className="steps-grid-top animate-on-scroll">
            {[
              { num: '01', title: 'Diagnóstico',   desc: 'Mapeamos a situação actual da empresa: legal, estratégica, digital e operacional.' },
              { num: '02', title: 'Estratégia',    desc: 'Definimos prioridades, objetivos e um plano de ação à medida do negócio.' },
              { num: '03', title: 'Implementação', desc: 'Executamos em coordenação com a sua equipa, integrando processos e ferramentas.' },
            ].map((step, i) => (
              <div key={step.num} className="stagger-child" style={{ textAlign: 'center', position: 'relative' }}>
                {i < 2 && <div style={{ position: 'absolute', right: '-12%', top: '30px', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.18)', fontSize: '20px', fontWeight: 700 }} className="step-arrow">→</div>}
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--white)' }}>{step.num}</span>
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '16px', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '24px', maxWidth: '680px', margin: '0 auto', position: 'relative' }} className="steps-grid-bottom animate-on-scroll">
            {[
              { num: '04', title: 'Acompanhamento', desc: 'Monitorizamos o progresso com indicadores claros e reuniões periódicas.' },
              { num: '05', title: 'Optimização',    desc: 'Revemos, ajustamos e evoluímos a estratégia com base nos resultados obtidos.' },
            ].map((step, i) => (
              <div key={step.num} className="stagger-child" style={{ textAlign: 'center', position: 'relative' }}>
                {i < 1 && <div style={{ position: 'absolute', right: '-12%', top: '30px', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.18)', fontSize: '20px', fontWeight: 700 }} className="step-arrow">→</div>}
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--white)' }}>{step.num}</span>
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '16px', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .steps-grid-top    { grid-template-columns: 1fr !important; }
            .steps-grid-bottom { grid-template-columns: 1fr !important; max-width: 100% !important; }
            .step-arrow { display: none !important; }
          }
          @media (max-width: 1024px) {
            .steps-grid-top { grid-template-columns: repeat(2,1fr) !important; }
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
              'Tem uma ideia de negócio mas não sabe como avançar',
              'Precisa de crescer mas tem receio de avançar sem estrutura sólida',
              'A empresa cresceu e agora a gestão parece um caos constante',
            ].map((text) => (
              <div key={text} className="stagger-child animate-on-scroll" style={{ background: 'var(--white)', borderLeft: '4px solid var(--blue)', borderRadius: '0 14px 14px 0', padding: '22px 26px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
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
          @media (max-width: 768px) { .persona-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── LEAD MAGNET ── */}
      <LeadMagnetSection />

      {/* ── BLOG PREVIEW ── */}
      <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Blog & Recursos</span>
            <div className="accent-line accent-line-center" style={{ background: 'var(--purple)', backgroundImage: 'none' }} />
            <h2 style={{ color: 'var(--blue)', marginBottom: '12px' }}>Conhecimento que transforma</h2>
            <p style={{ color: 'rgba(35,56,119,0.60)', maxWidth: '460px', margin: '0 auto' }}>Artigos práticos de Direito Empresarial, Gestão Estratégica, Marketing Digital, Tecnologia e Inteligência Artificial, focados especialmente em empresas.</p>
          </div>
          <BlogPreview />
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/blog" className="btn-gradient">Ver todos os artigos →</Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr !important; } }
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
              <Link to="/contacto" className="btn-outline-white" style={{ padding: '16px 36px' }}>Agendar Consulta →</Link>
              <a href="https://wa.me/351933644596?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20NIEUSYNC"
                target="_blank" rel="noopener noreferrer"
                style={{ background: 'var(--white)', color: 'var(--blue)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px 36px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background 0.3s ease, color 0.3s ease, transform 0.2s ease', textDecoration: 'none', minHeight: '44px' }}
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