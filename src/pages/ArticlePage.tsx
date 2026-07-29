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
    <main className="pt-[72px]">
      <div className="px-10 py-[120px] text-center text-purple">
        {t.article.loading}
      </div>
    </main>
  )

  if (!article) return (
    <main className="pt-[72px]">
      <div className="px-10 py-[120px] text-center">
        <h2 className="mb-4 text-blue">{t.article.notFoundTitle}</h2>
        <Link to="/demo/blog" className="btn-primary">{t.article.notFoundCta}</Link>
      </div>
    </main>
  )

  return (
    <main className="pt-[72px]">
      <section className="bg-grad-main py-16">
        <div className="container max-w-[760px]">
          <div className="mb-6 flex items-center gap-3.5">
            <Link to="/demo/blog" className="inline-flex items-center gap-1.5 text-sm text-white/65">
              {t.article.backToBlog}
            </Link>
            <span className="badge badge-purple">
              {article.category}
            </span>
          </div>
          <h1 className="mb-5 text-[40px] text-white">
            {article.title}
          </h1>
          <div className="flex flex-wrap gap-5">
            <span className="text-sm text-white/65">
              {article.author}
            </span>
            <span className="text-sm text-white/65">
              {formatDate(article.publishedAt, dateLocale)}
            </span>
            {article.readTime && (
              <span className="text-sm text-white/65">
                {t.readTime(article.readTime)}
              </span>
            )}
          </div>
        </div>
      </section>

      {article.mainImage && (
        <div className="bg-bg pt-10">
          <div className="container max-w-[760px]">
            <img
              src={urlFor(article.mainImage).width(720).url()}
              alt={article.title}
              className="block w-full rounded-[14px]"
            />
          </div>
        </div>
      )}

      <section className="bg-bg pb-[100px] pt-12">
        <div className="container max-w-[760px]">
          {article.excerpt && (
            <p className="mb-9 border-l-4 border-purple pl-5 text-lg italic leading-[1.8] text-blue">
              {article.excerpt}
            </p>
          )}
          {article.body && (
            <div className="text-base leading-[1.9] text-blue/85">
              <PortableText value={article.body} />
            </div>
          )}
          <div className="mt-12 border-t border-purple/20 pt-8 text-center">
            <p className="mb-4 text-blue/60">
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
