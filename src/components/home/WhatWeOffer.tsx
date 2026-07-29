'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/shared/SectionHeading'

interface Service {
  _id: string
  title: string
  description: string
  icon?: string
  slug?: { current: string }
  image?: { asset?: { url?: string } }
}

interface WhatWeOfferProps {
  heading?: string
  subheading?: string
  services?: Service[]
  primaryColor?: string
}

const defaultIcons: Record<string, string> = {
  'Architecture': '🏛️',
  'Construction': '🏗️',
  'Interior Design': '🛋️',
  'Landscaping': '🌿',
  'Water Engineering': '💧',
  'Electrical Engineering': '⚡',
  'Consultancy': '📋',
  'Renovation': '🔨',
}

export default function WhatWeOffer({
  heading = 'What We Offer',
  subheading = 'Our Services',
  services = [],
  primaryColor = '#E65100'
}: WhatWeOfferProps) {
  const getIcon = (title: string) => {
    for (const [key, icon] of Object.entries(defaultIcons)) {
      if (title.toLowerCase().includes(key.toLowerCase())) return icon
    }
    return '🔧'
  }

  return (
    <section className="section-white py-16 md:py-20">
      <Container>
        <SectionHeading
          title={heading}
          subtitle={subheading}
          accentColor={primaryColor}
        />

        {services.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link
                  href={service.slug?.current ? `/services/${service.slug.current}` : '/services'}
                  className="block bg-white dark:bg-[#111] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/5 h-full"
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    {service.icon || getIcon(service.title)}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-medium dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2"
                    style={{ color: primaryColor }}
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-medium dark:text-gray-400 text-lg">
              No services added yet. Add them in Sanity Studio.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}