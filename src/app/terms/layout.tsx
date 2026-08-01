import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using RIGO DESIGN & CONSTRUCTION CO. LTD website and services.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: 'Terms & Conditions | RIGO DESIGN & CONSTRUCTION',
    description: 'Terms and conditions for using our website and services.',
    url: `${siteUrl}/terms`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}