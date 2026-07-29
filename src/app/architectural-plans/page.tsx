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
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  return (
    <main>
      {/* Hero with Breadcrumbs */}
      <PageHero
        title="Architectural Plans"
        subtitle="Browse our collection of pre-designed architectural plans ready for your project."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Architectural Plans' },
        ]}
        primaryColor={primaryColor}
      />

      {/* Plans Grid */}
      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          {plans?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan: any) => (
                <Link
                  key={plan.slug.current}
                  href={`/architectural-plans/${plan.slug.current}`}
                  className="group block rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
                    {plan.previewImage && (
                      <img
                        src={urlFor(plan.previewImage).width(600).height(450).url()}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wider mb-2 block" style={{ color: primaryColor }}>
                      {plan.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-amber-500 transition-colors">
                      {plan.title}
                    </h3>
                    {plan.specs && (
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                        {plan.specs.bedrooms && <span>{plan.specs.bedrooms} Beds</span>}
                        {plan.specs.bathrooms && <span>• {plan.specs.bathrooms} Baths</span>}
                        {plan.specs.floors && <span>• {plan.specs.floors} Floors</span>}
                        {plan.specs.squareFootage && <span>• {plan.specs.squareFootage}</span>}
                      </div>
                    )}
                    <span
                      className="inline-flex items-center gap-1 text-sm font-medium mt-4 transition-all group-hover:gap-2"
                      style={{ color: primaryColor }}
                    >
                      View Details <HiArrowRight className="text-xs" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No architectural plans yet. Add plans in Sanity Studio.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}