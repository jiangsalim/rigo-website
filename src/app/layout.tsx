import type { Metadata } from 'next'
import './globals.css'
import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY, NAVIGATION_QUERY } from '@/lib/sanity.queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/ui/FloatingActions'
import CookieBanner from '@/components/ui/CookieBanner'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)

  return {
    title: {
      default: siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION',
      template: `%s | ${siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}`,
    },
    description: siteSettings?.siteDescription || 'Premium construction and architectural design services',
    icons: {
      icon: '/favicon.png',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const navigation = await sanityClient.fetch(NAVIGATION_QUERY)

  return (
    <html lang="en" data-scroll-behavior="smooth">
     <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <Header
          navItems={navigation?.items || []}
          siteTitle={siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}
          primaryColor={siteSettings?.primaryColor || '#E65100'}
          logo={siteSettings?.logo}
          logoDark={siteSettings?.logoDark}
        />
        {children}
        <Footer
          footerText={siteSettings?.footerText || ''}
          logo={siteSettings?.logo}
          siteTitle={siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}
          socialLinks={siteSettings?.socialLinks}
          contactEmail={siteSettings?.contactEmail}
          contactPhone={siteSettings?.contactPhone}
          contactAddress={siteSettings?.contactAddress}
          primaryColor={siteSettings?.primaryColor || '#E65100'}
        />
        <FloatingActions
          whatsappNumber={siteSettings?.whatsappNumber || ''}
          phoneNumber={siteSettings?.contactPhone || ''}
          primaryColor={siteSettings?.primaryColor || '#E65100'}
          siteTitle={siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}
        />
        <CookieBanner primaryColor={siteSettings?.primaryColor || '#E65100'} />
      </body>
    </html>
  )
}