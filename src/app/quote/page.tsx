'use client'

import { useSanity } from '@/hooks/useSanity'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import QuoteForm from '@/components/shared/QuoteForm'

export default function QuotePage() {
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="Request a Quote"
        subtitle="Tell us about your project and we'll get back to you with a detailed quote within 48 hours."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Request a Quote' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white pb-24">
        <Container>
          <div className="max-w-2xl mx-auto">
            <QuoteForm primaryColor={primaryColor} />
          </div>
        </Container>
      </section>
    </main>
  )
}