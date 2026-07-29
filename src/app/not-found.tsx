import Link from 'next/link'
import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY, NAVIGATION_QUERY } from '@/lib/sanity.queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'

export default async function NotFound() {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const navigation = await sanityClient.fetch(NAVIGATION_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <html lang="en">
      <body className="font-body bg-navy text-white antialiased">
        <Header
          navItems={navigation?.items || []}
          siteTitle={siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}
          primaryColor={primaryColor}
          logo={siteSettings?.logo}
        />
        <main>
          <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-navy">
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <Container className="relative z-10 text-center py-20">
              <h1 className="font-heading text-[150px] md:text-[200px] font-bold leading-none text-white/[0.03] select-none">
                404
              </h1>

              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto -mt-20 mb-8"
                style={{ backgroundColor: `${primaryColor}15` }}>
                <svg className="w-10 h-10" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Page Not Found
              </h2>
              <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="btn-primary text-base px-10 py-4">
                  Back to Home
                </Link>
                <Link href="/contact" className="btn-outline-light text-base px-10 py-4">
                  Contact Us
                </Link>
              </div>
            </Container>
          </section>
        </main>
        <Footer
          footerText={siteSettings?.footerText || ''}
          logo={siteSettings?.logo}
          siteTitle={siteSettings?.siteTitle || 'RIGO DESIGN & CONSTRUCTION'}
          socialLinks={siteSettings?.socialLinks}
          contactEmail={siteSettings?.contactEmail}
          contactPhone={siteSettings?.contactPhone}
          contactAddress={siteSettings?.contactAddress}
          primaryColor={primaryColor}
        />
      </body>
    </html>
  )
}