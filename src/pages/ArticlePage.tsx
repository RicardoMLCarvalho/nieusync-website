import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { Article } from '../hooks/useArticles'

const client = createClient({
  projectId: 'j7qyuhtx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)
const urlFor = (source: any) => builder.image(source)

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-PT', {
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

  useEffect(() => {
    if (article) document.title = `${article.title} | NIEUSYNC`
    window.scrollTo(0, 0)
  }, [article])

  if (loading) return (
    <main style={{ paddingTop: '72px' }}>
      <div style={{ textAlign: 'center', padding: '120px 40px', color: 'var(--purple)', fontFamily: 'Montserrat,sans-serif' }}>
        A carregar artigo...
      </div>
    </main>
  )

  if (!article) return (
    <main style={{ paddingTop: '72px' }}>
      <div style={{ textAlign: 'center', padding: '120px 40px' }}>
        <h2 style={{ color: 'var(--blue)', marginBottom: '16px' }}>Artigo não encontrado</h2>
        <Link to="/blog" className="btn-primary">Voltar ao Blog</Link>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ background: 'var(--grad-subtle)', padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← Voltar ao Blog
          </Link>
          <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-block' }}>
            {article.category}
          </span>
          <h1 style={{ color: 'var(--white)', marginBottom: '20px', fontSize: '40px' }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif' }}>
              {article.author}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif' }}>
              {formatDate(article.publishedAt)}
            </span>
            {article.readTime && (
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: 'Montserrat,sans-serif' }}>
                {article.readTime} min de leitura
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
              Gostou do artigo? Fale com a nossa equipa.
            </p>
            <Link to="/contacto" className="btn-gradient">
              Agendar consulta gratuita →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
