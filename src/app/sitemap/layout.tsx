import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Find all pages on the RIGO DESIGN & CONSTRUCTION website.',
  alternates: {
    canonical: `${siteUrl}/sitemap`,
  },
  openGraph: {
    title: 'Sitemap | RIGO DESIGN & CONSTRUCTION',
    description: 'Find all pages on our website.',
    url: `${siteUrl}/sitemap`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}