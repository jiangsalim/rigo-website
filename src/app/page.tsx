import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY, FEATURED_PROJECTS_QUERY, SERVICES_QUERY } from '@/lib/sanity.queries'
import HeroSection from '@/components/home/HeroSection'
import StatsCounter from '@/components/home/StatsCounter'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import CTABanner from '@/components/home/CTABanner'

export default async function HomePage() {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const services = await sanityClient.fetch(SERVICES_QUERY)
  const featuredProjects = await sanityClient.fetch(FEATURED_PROJECTS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  return (
    <main>
      <HeroSection
        headline="Building The Future"
        subheadline="Premium Construction & Architectural Design"
        primaryColor={primaryColor}
        ctaButtons={[
          { label: 'View Our Work', href: '/projects', variant: 'primary' },
          { label: 'Get In Touch', href: '/contact', variant: 'outline' },
        ]}
      />

      <StatsCounter
        stats={[
          { number: '50+', label: 'Projects Delivered' },
          { number: '6+', label: 'Years Experience' },
          { number: '30+', label: 'Clients Served' },
          { number: '5', label: 'Countries Reached' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white">
        <WhatWeOffer
          heading="What We Offer"
          subheading="Our Services"
          services={services || []}
          primaryColor={primaryColor}
        />
      </section>

      <section className="section-gray">
        <FeaturedProjects
          heading="Featured Projects"
          subheading="Our Portfolio"
          projects={featuredProjects || []}
          primaryColor={primaryColor}
        />
      </section>

      <section className="section-white">
        <CTABanner
          heading="Ready to Start Your Project?"
          text="Let's discuss your vision and bring it to life."
          buttonLabel="Get a Quote"
          buttonHref="/quote"
          primaryColor={primaryColor}
        />
      </section>
    </main>
  )
}