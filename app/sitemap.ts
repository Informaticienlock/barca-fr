import { client } from '@/sanity/lib/client'
import { articlesQuery } from '@/sanity/lib/queries'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await client.fetch(articlesQuery)

  const articleUrls = articles?.map((a: any) => ({
    url: `https://barca-fr.vercel.app/articles/${a.slug?.current}`,
    lastModified: a.datePublication ? new Date(a.datePublication) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  return [
    {
      url: 'https://barca-fr.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleUrls,
  ]
}
