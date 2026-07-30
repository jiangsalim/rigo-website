'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/shared/SectionHeading'
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi'

interface Project {
  _id: string
  title: string
  description?: string
  category?: string
  slug?: { current: string }
  mainImage?: { asset?: { url?: string } }
  coverImage?: { asset?: { url?: string } }
  completionDate?: string
  location?: string
}

interface FeaturedProjectsProps {
  heading?: string
  subheading?: string
  projects?: Project[]
  primaryColor?: string
}

export default function FeaturedProjects({
  heading = 'Featured Projects',
  subheading = 'Our Portfolio',
  projects = [],
  primaryColor = '#E65100'
}: FeaturedProjectsProps) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        {/* Centered heading + button on all screens */}
        <div className="flex flex-col items-center text-center mb-12">
          <SectionHeading
            heading={heading}
            subheading={subheading}
            accentColor={primaryColor}
            align="center"
          />
          {projects.length > 0 && (
            <Link
              href="/projects"
              className="btn-secondary text-sm mt-2 border-navy text-navy hover:bg-navy hover:text-white"
            >
              View All Projects →
            </Link>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || project.slug?.current || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group"
              >
                <Link
                  href={project.slug?.current ? `/projects/${project.slug.current}` : '/projects'}
                  className="hover-lift block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border h-full"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                  }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden" style={{ backgroundColor: 'var(--bg-badge)' }}>
                    {(project.mainImage?.asset?.url || project.coverImage?.asset?.url) ? (
                      <img
                        src={project.mainImage?.asset?.url || project.coverImage?.asset?.url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                    {/* Category Badge */}
                    {project.category && (
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {project.category}
                        </span>
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0 transform">
                        View Project
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl mb-2 transition-colors duration-300 line-clamp-2" style={{ color: 'var(--text-heading)' }}>
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--text-body)' }}>
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs pt-4 border-t" style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}>
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <HiOutlineLocationMarker className="text-sm" style={{ color: primaryColor }} />
                          {project.location}
                        </span>
                      )}
                      {project.completionDate && (
                        <span className="flex items-center gap-1">
                          <HiOutlineCalendar className="text-sm" style={{ color: primaryColor }} />
                          {new Date(project.completionDate).getFullYear()}
                        </span>
                      )}
                    </div>

                    {/* View Project Link */}
                    <div
                      className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2"
                      style={{ color: primaryColor }}
                    >
                      View Details
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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
              <svg className="w-10 h-10" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-lg font-medium" style={{ color: 'var(--text-heading)' }}>No projects yet</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Add them in Sanity Studio to display here.</p>
          </div>
        )}
      </Container>
    </section>
  )
}