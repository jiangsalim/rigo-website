'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/shared/SectionHeading'
import { FaHardHat, FaBuilding, FaPencilRuler, FaHome, FaPaintRoller, FaHammer, FaBolt, FaWater, FaLeaf, FaCogs } from 'react-icons/fa'

interface Service {
  _id: string
  title: string
  description: string
  shortDescription?: string
  icon?: any
  slug?: { current: string }
  image?: { asset?: { url?: string } }
  category?: string
}

interface WhatWeOfferProps {
  heading?: string
  subheading?: string
  services?: Service[]
  primaryColor?: string
}

const serviceIcons: Record<string, any> = {
  'Residential Construction': FaHome,
  'Commercial Construction': FaBuilding,
  'Design & Build': FaPencilRuler,
  'Architectural Plans': FaHardHat,
  'Renovation': FaHammer,
  'Interior Design': FaPaintRoller,
  'Electrical': FaBolt,
  'Water Engineering': FaWater,
  'Landscaping': FaLeaf,
  'Consultancy': FaCogs,
}

export default function WhatWeOffer({
  heading = 'What We Offer',
  subheading = 'Our Services',
  services = [],
  primaryColor = '#E65100'
}: WhatWeOfferProps) {
  const getIcon = (service: Service) => {
    if (service.icon?.asset?.url) return null // Will render image
    if (service.category && serviceIcons[service.category]) {
      const IconComponent = serviceIcons[service.category]
      return <IconComponent className="text-2xl" style={{ color: primaryColor }} />
    }
    return <FaHardHat className="text-2xl" style={{ color: primaryColor }} />
  }

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          heading={heading}
          subheading={subheading}
          accentColor={primaryColor}
        />

        {services.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id || service.slug?.current || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Link
                  href={service.slug?.current ? `/services/${service.slug.current}` : '/services'}
                  className="hover-lift block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    {getIcon(service)}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-navy mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-charcoal text-sm leading-relaxed line-clamp-3">
                    {service.shortDescription || service.description || 'Learn more about this service.'}
                  </p>

                  {/* Learn More Link */}
                  <div
                    className="mt-5 flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2"
                    style={{ color: primaryColor }}
                  >
                    Learn More
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <FaHardHat className="text-3xl" style={{ color: primaryColor }} />
            </div>
            <p className="text-charcoal text-lg font-medium">No services added yet</p>
            <p className="text-muted text-sm mt-1">Add them in Sanity Studio to display here.</p>
          </div>
        )}
      </Container>
    </section>
  )
}