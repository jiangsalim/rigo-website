import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How RIGO DESIGN & CONSTRUCTION CO. LTD collects, uses, and protects your personal information.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy | RIGO DESIGN & CONSTRUCTION',
    description: 'How we collect, use, and protect your personal information.',
    url: `${siteUrl}/privacy`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}