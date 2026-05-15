import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'nieusync',
  title: 'NIEUSYNC Blog',
  projectId: 'j7qyuhtx',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'article',
        title: 'Artigo',
        type: 'document',
        fields: [
          { name: 'title', title: 'Título', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'category', title: 'Categoria', type: 'string' },
          { name: 'author', title: 'Autor', type: 'string' },
          { name: 'readTime', title: 'Tempo de leitura', type: 'number' },
          { name: 'publishedAt', title: 'Data', type: 'date' },
          { name: 'excerpt', title: 'Resumo', type: 'text' },
          { name: 'mainImage', title: 'Imagem', type: 'image' },
          { name: 'body', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] },
        ],
      },
    ],
  },
})
