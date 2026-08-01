import type { Metadata } from 'next'
import './globals.css'
import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY, NAVIGATION_QUERY } from '@/lib/sanity.queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/ui/FloatingActions'
import CookieBanner from '@/components/ui/CookieBanner'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import StructuredData from '@/components/shared/StructuredData'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const title = siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION CO. LTD'
  const description = siteSettings?.siteDescription || 'Premium construction and architectural design services in Uganda'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: ['construction Uganda', 'architectural design', 'building contractor', 'renovation', 'commercial construction', 'residential construction', 'RIGO'],
    authors: [{ name: title }],
    creator: title,
    publisher: title,
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_UG',
      url: siteUrl,
      siteName: title,
      title,
      description,
      images: [{ url: '/icon-512.png', width: 512, height: 512, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/icon-512.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.png',
      apple: '/icon-192.png',
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
        <meta name="google-site-verification" content="e083547305f9a958" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A1F3F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RIGO Construction" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <StructuredData />
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
          certificate={siteSettings?.certificate}
          tinNumber={siteSettings?.tinNumber}
          registrationNumber={siteSettings?.registrationNumber}
        />
        <FloatingActions
          whatsappNumber={siteSettings?.whatsappNumber || ''}
          phoneNumber={siteSettings?.contactPhone || ''}
          primaryColor={siteSettings?.primaryColor || '#E65100'}
          siteTitle={siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}
        />
        <CookieBanner primaryColor={siteSettings?.primaryColor || '#E65100'} />
        <DarkModeToggle />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(
                    (registration) => console.log('SW registered:', registration.scope),
                    (err) => console.log('SW registration failed:', err)
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}