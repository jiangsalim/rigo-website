'use client'

import { useSanity } from '@/hooks/useSanity'
import { SERVICES_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { HiArrowRight } from 'react-icons/hi'
import { FaHardHat, FaBuilding, FaPencilRuler, FaHome, FaPaintRoller, FaHammer, FaCogs } from 'react-icons/fa'

const serviceIcons: Record<string, any> = {
  'Residential Construction': FaHome,
  'Commercial Construction': FaBuilding,
  'Design & Build': FaPencilRuler,
  'Architectural Plans': FaHardHat,
  'Renovation': FaHammer,
  'Interior Design': FaPaintRoller,
}

function ServiceIcon({ category, primaryColor }: { category: string; primaryColor: string }) {
  const Icon = serviceIcons[category] || FaCogs
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${primaryColor}12` }}
    >
      <Icon className="text-lg" style={{ color: primaryColor }} />
    </div>
  )
}

function ServiceCardIcon({ service, primaryColor }: { service: any; primaryColor: string }) {
  if (service.icon) {
    return (
      <img
        src={urlFor(service.icon).width(48).height(48).url()}
        alt={service.title}
        className="w-12 h-12 rounded-lg"
      />
    )
  }
  const Icon = serviceIcons[service.category] || FaCogs
  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
      style={{ backgroundColor: `${primaryColor}12` }}
    >
      <Icon className="text-2xl" style={{ color: primaryColor }} />
    </div>
  )
}

export default function ServicesPage() {
  const { data: services } = useSanity(SERVICES_QUERY)
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  const categories = services?.reduce((acc: any, service: any) => {
    const cat = service.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(service)
    return acc
  }, {})

  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive construction and design solutions tailored to your needs — from concept to completion."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white pb-24">
        <Container>
          {services?.length > 0 ? (
            <div className="space-y-20">
              {Object.entries(categories || {}).map(([category, categoryServices]: [string, any]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-8">
                    <ServiceIcon category={category} primaryColor={primaryColor} />
                    <h2 className="font-heading text-2xl font-bold text-navy">{category}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryServices.map((service: any) => (
                      <Link
                        key={service.slug.current}
                        href={`/services/${service.slug.current}`}
                        className="hover-lift group block p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
                      >
                        <ServiceCardIcon service={service} primaryColor={primaryColor} />
                        <h3 className="font-heading text-xl font-bold text-navy mb-3">{service.title}</h3>
                        <p className="text-charcoal text-sm leading-relaxed mb-4">{service.shortDescription}</p>
                        <span
                          className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                          style={{ color: primaryColor }}
                        >
                          Learn More <HiArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${primaryColor}10` }}>
                <FaHardHat className="text-3xl" style={{ color: primaryColor }} />
              </div>
              <p className="text-charcoal text-lg font-medium">No services yet</p>
              <p className="text-muted text-sm mt-1">Add them in Sanity Studio to display here.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}