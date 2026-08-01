import { MetadataRoute } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}