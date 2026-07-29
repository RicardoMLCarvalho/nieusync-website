import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { Article } from '../hooks/useArticles'
import { useT, useLang } from '../i18n'

const client = createClient({
  projectId: 'j7qyuhtx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)
const urlFor = (source: any) => builder.image(source)

const formatDate = (dateStr: string, locale: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!slug) return
    client.fetch(
      `*[_type == "article" && slug.current == $slug][0] {
        _id, title, slug, category, author, readTime, publishedAt, excerpt, mainImage, body
      }`,
      { slug }
    ).then((data) => {
      setArticle(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])
  return { article, loading }
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { article, loading } = useArticle(slug || '')
  const t = useT('blog')
  const { lang } = useLang()
  const dateLocale = lang === 'pt' ? 'pt-PT' : 'en-GB'

  useEffect(() => {
    if (article) document.title = t.article.documentTitle(article.title)
    window.scrollTo(0, 0)
  }, [article, t])

  if (loading) return (
    <main style={{ paddingTop: '72px' }}>
      <div style={{ textAlign: 'center', padding: '120px 40px', color: 'var(--purple)', fontFamily: 'Montserrat,sans-serif' }}>
        {t.article.loading}
      </div>
    </main>
  )

  if (!article) return (
    <main style={{ paddingTop: '72px' }}>
      <div style={{ textAlign: 'center', padding: '120px 40px' }}>
        <h2 style={{ color: 'var(--blue)', marginBottom: '16px' }}>{t.article.notFoundTitle}</h2>
        <Link to="/demo/blog" className="btn-primary">{t.article.notFoundCta}</Link>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <Link to="/demo/blog" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {t.article.backToBlog}
            </Link>
            <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
              {article.category}
            </span>
          </div>
          <h1 style={{ color: 'var(--white)', marginBottom: '20px', fontSize: '40px' }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif' }}>
              {article.author}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif' }}>
              {formatDate(article.publishedAt, dateLocale)}
            </span>
            {article.readTime && (
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif' }}>
                {t.readTime(article.readTime)}
              </span>
            )}
          </div>
        </div>
      </section>

      {article.mainImage && (
        <div style={{ background: 'var(--bg)', padding: '40px 0 0' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <img
              src={urlFor(article.mainImage).width(720).url()}
              alt={article.title}
              style={{ width: '100%', borderRadius: '14px', display: 'block' }}
            />
          </div>
        </div>
      )}

      <section style={{ background: 'var(--bg)', padding: '48px 0 100px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          {article.excerpt && (
            <p style={{ fontSize: '18px', color: 'var(--blue)', lineHeight: 1.8, marginBottom: '36px', fontStyle: 'italic', borderLeft: '4px solid var(--purple)', paddingLeft: '20px' }}>
              {article.excerpt}
            </p>
          )}
          {article.body && (
            <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '16px', lineHeight: 1.9, color: 'rgba(35,56,119,0.85)' }}>
              <PortableText value={article.body} />
            </div>
          )}
          <div style={{ borderTop: '1px solid rgba(159,142,194,0.2)', paddingTop: '32px', marginTop: '48px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(35,56,119,0.60)', marginBottom: '16px', fontFamily: 'Montserrat,sans-serif' }}>
              {t.article.ctaText}
            </p>
            <Link to="/demo/contact" className="btn-gradient">
              {t.article.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
