import { useEffect, useState } from 'react'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'j7qyuhtx',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export interface Article {
  _id: string
  title: string
  slug: { current: string }
  category: string
  author: string
  readTime: number
  publishedAt: string
  excerpt: string
  mainImage?: any
  body?: any[]
}

export function useArticles(category?: string) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    client.fetch(`*[_type == "article"] | order(publishedAt desc) {
      _id, title, slug, category, author, readTime, publishedAt, excerpt, mainImage
    }`).then((data) => {
      const filtered = category && category !== 'Todos'
        ? data.filter((a: Article) => a.category === category)
        : data
      setArticles(filtered)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [category])
  return { articles, loading }
}
