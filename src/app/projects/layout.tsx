import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Explore our portfolio of residential, commercial, and design-build construction projects across Uganda.',
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: 'Our Projects | RIGO DESIGN & CONSTRUCTION',
    description: 'Explore our portfolio of residential, commercial, and design-build construction projects across Uganda.',
    url: `${siteUrl}/projects`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}