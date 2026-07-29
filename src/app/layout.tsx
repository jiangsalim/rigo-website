import type { Metadata } from 'next'
import './globals.css'
import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY, NAVIGATION_QUERY } from '@/lib/sanity.queries'
import { ThemeProvider } from '@/lib/theme.tsx'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/ui/FloatingActions'
import CookieBanner from '@/components/ui/CookieBanner'
import BackToTop from '@/components/ui/BackToTop'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)

  return {
    title: {
      default: siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION',
      template: `%s | ${siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}`,
    },
    description: siteSettings?.siteDescription || 'Premium construction and architectural design services in Uganda',
    keywords: [
      'construction',
      'architecture',
      'interior design',
      'landscaping',
      'water engineering',
      'electrical engineering',
      'consultancy',
      'Rigo Design',
      'Uganda construction',
      'Mukono',
    ],
    authors: [{ name: 'RIGO DESIGN & CONSTRUCTION Co. LTD' }],
    creator: 'Herman Software Solutions',
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      type: 'website',
      locale: 'en_UG',
      siteName: 'RIGO DESIGN & CONSTRUCTION',
      title: 'RIGO DESIGN & CONSTRUCTION | Build The Future',
      description: 'Premium construction and architectural design services in Uganda',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'RIGO DESIGN & CONSTRUCTION',
      description: 'Premium construction and architectural design services',
    },
    robots: {
      index: true,
      follow: true,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider>
          <Header
            navItems={navigation?.items || []}
            siteTitle={siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}
            primaryColor={siteSettings?.primaryColor || '#E65100'}
            logo={siteSettings?.logo}
            logoDark={siteSettings?.logoDark}
          />
          <main>{children}</main>
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
          <BackToTop />
          <CookieBanner primaryColor={siteSettings?.primaryColor || '#E65100'} />
        </ThemeProvider>
      </body>
    </html>
  )
}