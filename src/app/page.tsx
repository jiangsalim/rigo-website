'use client'

import { useSanity } from '@/hooks/useSanity'
import { SITE_SETTINGS_QUERY, FEATURED_PROJECTS_QUERY, SERVICES_QUERY, FEATURED_GALLERY_QUERY } from '@/lib/sanity.queries'
import HeroSection from '@/components/home/HeroSection'
import StatsCounter from '@/components/home/StatsCounter'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import GalleryPreview from '@/components/home/GalleryPreview'
import CTABanner from '@/components/home/CTABanner'

export default function HomePage() {
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const { data: services } = useSanity(SERVICES_QUERY)
  const { data: featuredProjects } = useSanity(FEATURED_PROJECTS_QUERY)
  const { data: galleryItems } = useSanity(FEATURED_GALLERY_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      {/* 1. Hero — Navy */}
      <HeroSection
        headline="Build The Future"
        subheadline="Premium Construction & Architectural Design"
        primaryColor={primaryColor}
        ctaButtons={[
          { label: 'View Our Work', href: '/projects', variant: 'primary' },
          { label: 'Get In Touch', href: '/contact', variant: 'outline' },
        ]}
      />

      {/* 2. Stats — Navy */}
      <section className="section-navy border-y border-white/10">
        <StatsCounter
          stats={[
            { number: '50+', label: 'Projects Delivered' },
            { number: '6+', label: 'Years Experience' },
            { number: '30+', label: 'Clients Served' },
            { number: '5', label: 'Countries Reached' },
          ]}
          primaryColor={primaryColor}
        />
      </section>

      {/* 3. Services — White */}
      <section className="section-white">
        <WhatWeOffer
          heading="What We Offer"
          subheading="Our Services"
          services={services || []}
          primaryColor={primaryColor}
        />
      </section>

      {/* 4. Projects — Gray */}
      <section className="section-gray">
        <FeaturedProjects
          heading="Featured Projects"
          subheading="Our Portfolio"
          projects={featuredProjects || []}
          primaryColor={primaryColor}
        />
      </section>

      {/* 5. Gallery — White */}
      <section className="section-white">
        <GalleryPreview
          items={galleryItems || []}
          primaryColor={primaryColor}
        />
      </section>

      {/* 6. CTA — Navy */}
      <section className="bg-navy">
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