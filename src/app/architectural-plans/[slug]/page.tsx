'use client'

import { use } from 'react'
import { useSanity } from '@/hooks/useSanity'
import { PLAN_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { PortableText } from '@portabletext/react'
import { BsDownload } from 'react-icons/bs'

export default function PlanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data: plan } = useSanity(PLAN_BY_SLUG_QUERY, { slug })
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  if (!plan) return null

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
                <span className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)', color: 'var(--text-heading)' }}>
                  {plan.specs.bedrooms} Bedrooms
                </span>
              )}
              {plan.specs.bathrooms && (
                <span className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)', color: 'var(--text-heading)' }}>
                  {plan.specs.bathrooms} Bathrooms
                </span>
              )}
              {plan.specs.floors && (
                <span className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)', color: 'var(--text-heading)' }}>
                  {plan.specs.floors} Floors
                </span>
              )}
              {plan.specs.squareFootage && (
                <span className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)', color: 'var(--text-heading)' }}>
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
              <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>About This Plan</h2>
              <div className="prose prose-lg max-w-none" style={{ color: 'var(--text-body)' }}>
                <PortableText value={plan.description} />
              </div>
            </div>

            <div className="space-y-6">
              {plan.downloadablePdf && (
                <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)' }}>
                  <h3 className="font-heading text-lg font-bold mb-3" style={{ color: 'var(--text-heading)' }}>Download Plan</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-body)' }}>Get the full architectural plan in PDF format.</p>
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

              <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)' }}>
                <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--text-heading)' }}>Interested?</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-body)' }}>Contact us to discuss this plan or custom modifications.</p>
                <Link
                  href="/contact"
                  className="btn-secondary w-full flex items-center justify-center text-sm"
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
            <h2 className="font-heading text-2xl font-bold mb-8" style={{ color: 'var(--text-heading)' }}>Plan Gallery</h2>
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