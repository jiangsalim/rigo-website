'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/shared/SectionHeading'

interface Service {
  title: string
  slug: { current: string }
  icon?: any
  shortDescription: string
  image?: any
  category: string
}

interface ServicesOverviewProps {
  heading?: string
  subheading?: string
  services: Service[]
  primaryColor?: string
}

export default function ServicesOverview({ 
  heading = 'Our Services', 
  subheading = 'Comprehensive construction and design solutions tailored to your needs.',
  services,
  primaryColor = '#F59E0B'
}: ServicesOverviewProps) {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading heading={heading} subheading={subheading} accentColor={primaryColor} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services?.map((service, index) => (
            <motion.div
              key={service.slug.current}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/services/${service.slug.current}`}
                className="group block p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-lg font-bold"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}