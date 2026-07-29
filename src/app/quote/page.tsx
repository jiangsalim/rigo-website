import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import QuoteForm from '@/components/shared/QuoteForm'

export default async function QuotePage() {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  return (
    <main>
      {/* Hero with Breadcrumbs */}
      <PageHero
        title="Request a Quote"
        subtitle="Tell us about your project and we'll get back to you with a detailed quote within 48 hours."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Request a Quote' },
        ]}
        primaryColor={primaryColor}
      />

      {/* Quote Form */}
      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          <div className="max-w-2xl mx-auto">
            <QuoteForm primaryColor={primaryColor} />
          </div>
        </Container>
      </section>
    </main>
  )
}