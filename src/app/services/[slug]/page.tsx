import { sanityClient } from '@/lib/sanity.client'
import { SERVICE_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { PortableText } from '@portabletext/react'

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await sanityClient.fetch(SERVICE_BY_SLUG_QUERY, { slug: params.slug })
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  if (!service) notFound()

  return (
    <main>
      {/* Hero with Breadcrumbs */}
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
        <section className="bg-[#0A0A0A]">
          <Container>
            <img src={urlFor(service.image).width(1200).height(500).url()} alt={service.title} className="w-full rounded-2xl" />
          </Container>
        </section>
      )}

      <section className="py-20 bg-[#0A0A0A]">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">About This Service</h2>
            <div className="prose prose-invert prose-gray">
              <PortableText value={service.fullDescription} />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/5 p-12 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ backgroundColor: primaryColor }} />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Interested in This Service?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">Let's discuss how we can help with your project.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/quote" className="px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 text-black" style={{ backgroundColor: primaryColor }}>Request a Quote</Link>
                <Link href="/contact" className="px-8 py-4 rounded-full font-medium text-sm border border-white/20 text-white hover:bg-white/10 transition-all duration-300">Contact Us</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}