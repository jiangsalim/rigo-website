import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive construction services — residential, commercial, design-build, renovation, and interior design in Uganda.',
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: 'Our Services | RIGO DESIGN & CONSTRUCTION',
    description: 'Comprehensive construction services — residential, commercial, design-build, renovation, and interior design in Uganda.',
    url: `${siteUrl}/services`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}