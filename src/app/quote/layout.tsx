import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Get a detailed quote for your construction project. Tell us about your requirements and we\'ll respond within 48 hours.',
  alternates: {
    canonical: `${siteUrl}/quote`,
  },
  openGraph: {
    title: 'Request a Quote | RIGO DESIGN & CONSTRUCTION',
    description: 'Get a detailed quote for your construction project. We respond within 48 hours.',
    url: `${siteUrl}/quote`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}