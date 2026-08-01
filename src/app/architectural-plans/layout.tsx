import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Architectural Plans',
  description: 'Browse pre-designed architectural plans for residential and commercial buildings. Download plans and get a quote in Uganda.',
  alternates: {
    canonical: `${siteUrl}/architectural-plans`,
  },
  openGraph: {
    title: 'Architectural Plans | RIGO DESIGN & CONSTRUCTION',
    description: 'Browse pre-designed architectural plans for residential and commercial buildings in Uganda.',
    url: `${siteUrl}/architectural-plans`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}