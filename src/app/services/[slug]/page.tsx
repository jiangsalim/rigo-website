import { sanityClient } from '@/lib/sanity.client'
import { SERVICE_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { PortableText } from '@portabletext/react'

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const service = await sanityClient.fetch(SERVICE_BY_SLUG_QUERY, { slug })
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  if (!service) notFound()

  return (
    <main>
      <PageHero
        title={service.title}
        subtitle={service.shortDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
        primaryColor={primaryColor}
      />

      {service.image && (
        <section className="section-white">
          <Container>
            <img src={urlFor(service.image).width(1200).height(500).url()} alt={service.title} className="w-full rounded-2xl" />
          </Container>
        </section>
      )}

      <section className="section-white py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-navy mb-6">About This Service</h2>
            <div className="prose prose-lg max-w-none text-charcoal">
              <PortableText value={service.fullDescription} />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-white pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-navy p-12 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ backgroundColor: primaryColor }} />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">Interested in This Service?</h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">Let's discuss how we can help with your project.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/quote" className="btn-primary">Request a Quote</Link>
                <Link href="/contact" className="btn-outline-light">Contact Us</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}