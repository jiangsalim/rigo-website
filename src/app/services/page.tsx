import { sanityClient } from '@/lib/sanity.client'
import { SERVICES_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { HiArrowRight } from 'react-icons/hi'

export default async function ServicesPage() {
  const services = await sanityClient.fetch(SERVICES_QUERY)
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  // Group services by category
  const categories = services?.reduce((acc: any, service: any) => {
    const cat = service.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(service)
    return acc
  }, {})

  return (
    <main>
      {/* Hero with Breadcrumbs */}
      <PageHero
        title="Our Services"
        subtitle="Comprehensive construction and design solutions tailored to your needs — from concept to completion."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
        primaryColor={primaryColor}
      />

      {/* Services by Category */}
      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          {services?.length > 0 ? (
            <div className="space-y-20">
              {Object.entries(categories).map(([category, categoryServices]: [string, any]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryServices.map((service: any) => (
                      <Link
                        key={service.slug.current}
                        href={`/services/${service.slug.current}`}
                        className="group block p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                      >
                        {service.icon && (
                          <img
                            src={urlFor(service.icon).width(48).height(48).url()}
                            alt={service.title}
                            className="w-12 h-12 mb-6 rounded-lg"
                          />
                        )}
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-500 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {service.shortDescription}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                          style={{ color: primaryColor }}
                        >
                          Learn More <HiArrowRight className="text-xs" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No services yet. Add services in Sanity Studio.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}