'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs: BreadcrumbItem[]
  primaryColor?: string
}

function BreadcrumbSchema({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${siteUrl}${crumb.href}` : undefined,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function PageHero({ title, subtitle, breadcrumbs, primaryColor = '#E65100' }: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 bg-navy overflow-hidden">
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />

      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: primaryColor }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ backgroundColor: primaryColor }} />

      <Container className="relative z-10">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center flex-wrap gap-2 text-sm mb-6"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && (
                <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-white/60 hover:text-white transition-colors duration-300 font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold flex items-center gap-1.5" style={{ color: primaryColor }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </motion.nav>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/60 text-lg mt-4 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  )
}