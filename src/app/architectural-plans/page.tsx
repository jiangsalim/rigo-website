import { sanityClient } from '@/lib/sanity.client'
import { PLANS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { HiArrowRight } from 'react-icons/hi'

export default async function ArchitecturalPlansPage() {
  const plans = await sanityClient.fetch(PLANS_QUERY)
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="Architectural Plans"
        subtitle="Browse our collection of pre-designed architectural plans ready for your project."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Architectural Plans' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white pb-24">
        <Container>
          {plans?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan: any) => (
                <Link
                  key={plan.slug.current}
                  href={`/architectural-plans/${plan.slug.current}`}
                  className="hover-lift group block rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-light">
                    {plan.previewImage ? (
                      <img
                        src={urlFor(plan.previewImage).width(600).height(450).url()}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wider mb-2 block font-semibold" style={{ color: primaryColor }}>
                      {plan.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-navy mb-3 transition-colors duration-300">
                      {plan.title}
                    </h3>
                    {plan.specs && (
                      <div className="flex flex-wrap gap-3 text-xs text-muted">
                        {plan.specs.bedrooms && <span className="flex items-center gap-1">🛏 {plan.specs.bedrooms} Beds</span>}
                        {plan.specs.bathrooms && <span>• {plan.specs.bathrooms} Baths</span>}
                        {plan.specs.floors && <span>• {plan.specs.floors} Floors</span>}
                        {plan.specs.squareFootage && <span>• {plan.specs.squareFootage} sq ft</span>}
                      </div>
                    )}
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold mt-5 transition-all group-hover:gap-2"
                      style={{ color: primaryColor }}
                    >
                      View Details <HiArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <svg className="w-10 h-10" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-charcoal text-lg font-medium">No architectural plans yet</p>
              <p className="text-muted text-sm mt-1">Add them in Sanity Studio to display here.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}