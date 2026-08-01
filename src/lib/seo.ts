import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export function generatePageSEO({
  title,
  description,
  image = '/icon-512.png',
  url = siteUrl,
  type = 'website',
}: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
      images: [{ url: image, width: 512, height: 512 }],
      locale: 'en_UG',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}