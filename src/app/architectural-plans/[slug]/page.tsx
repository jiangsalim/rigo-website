import { sanityClient } from '@/lib/sanity.client'
import { PLAN_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { PortableText } from '@portabletext/react'
import { BsDownload } from 'react-icons/bs'

export default async function PlanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plan = await sanityClient.fetch(PLAN_BY_SLUG_QUERY, { slug })
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  if (!plan) notFound()

  return (
    <main>
      <PageHero
        title={plan.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Architectural Plans', href: '/architectural-plans' },
          { label: plan.title },
        ]}
        primaryColor={primaryColor}
      />

      {/* Specs */}
      {plan.specs && (
        <section className="section-white pb-8">
          <Container>
            <div className="flex flex-wrap gap-3">
              {plan.specs.bedrooms && (
                <span className="px-4 py-2 rounded-full bg-gray-light border border-gray-200 text-sm text-navy font-medium">
                  {plan.specs.bedrooms} Bedrooms
                </span>
              )}
              {plan.specs.bathrooms && (
                <span className="px-4 py-2 rounded-full bg-gray-light border border-gray-200 text-sm text-navy font-medium">
                  {plan.specs.bathrooms} Bathrooms
                </span>
              )}
              {plan.specs.floors && (
                <span className="px-4 py-2 rounded-full bg-gray-light border border-gray-200 text-sm text-navy font-medium">
                  {plan.specs.floors} Floors
                </span>
              )}
              {plan.specs.squareFootage && (
                <span className="px-4 py-2 rounded-full bg-gray-light border border-gray-200 text-sm text-navy font-medium">
                  {plan.specs.squareFootage}
                </span>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Preview Image */}
      {plan.previewImage && (
        <section className="section-white">
          <Container>
            <img
              src={urlFor(plan.previewImage).width(1200).height(600).url()}
              alt={plan.title}
              className="w-full rounded-2xl shadow-lg"
            />
          </Container>
        </section>
      )}

      {/* Description & Download */}
      <section className="section-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-navy mb-6">About This Plan</h2>
              <div className="prose prose-lg max-w-none text-charcoal">
                <PortableText value={plan.description} />
              </div>
            </div>

            <div className="space-y-6">
              {plan.downloadablePdf && (
                <div className="p-6 rounded-2xl bg-gray-light border border-gray-200">
                  <h3 className="font-heading text-lg font-bold text-navy mb-3">Download Plan</h3>
                  <p className="text-charcoal text-sm mb-4">Get the full architectural plan in PDF format.</p>
                  <a
                    href={urlFor(plan.downloadablePdf).url() || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
                  >
                    <BsDownload />
                    Download PDF
                  </a>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-gray-light border border-gray-200">
                <h3 className="font-heading text-lg font-bold text-navy mb-2">Interested?</h3>
                <p className="text-charcoal text-sm mb-4">Contact us to discuss this plan or custom modifications.</p>
                <Link
                  href="/contact"
                  className="btn-secondary w-full flex items-center justify-center text-sm border-navy text-navy hover:bg-navy hover:text-white"
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {plan.gallery?.length > 0 && (
        <section className="section-gray py-20">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-navy mb-8">Plan Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.gallery.map((image: any, index: number) => (
                <img
                  key={index}
                  src={urlFor(image).width(800).height(500).url()}
                  alt={`${plan.title} image ${index + 1}`}
                  className="rounded-xl w-full object-cover shadow-sm"
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}