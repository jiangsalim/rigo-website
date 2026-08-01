import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with RIGO DESIGN & CONSTRUCTION CO. LTD for your construction project. Request a quote, call, or visit our office in Uganda.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Us | RIGO DESIGN & CONSTRUCTION',
    description: 'Get in touch for your construction project. Request a quote, call, or visit our office in Uganda.',
    url: `${siteUrl}/contact`,
    siteName: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    locale: 'en_UG',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}