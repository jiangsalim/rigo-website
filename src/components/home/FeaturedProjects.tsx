'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/shared/SectionHeading'

interface Project {
  _id: string
  title: string
  description?: string
  category?: string
  slug?: { current: string }
  mainImage?: { asset?: { url?: string } }
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
    <section className="section-gray py-16 md:py-20">
      <Container>
        <div className="flex flex-col sm:flex-row items-end justify-between mb-12">
          <div className="flex-1">
            <SectionHeading
              title={heading}
              subtitle={subheading}
              accentColor={primaryColor}
            />
          </div>
          {projects.length > 0 && (
            <Link
              href="/projects"
              className="btn-secondary dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-gray-900 text-sm whitespace-nowrap mb-6 sm:mb-0"
            >
              View All Projects
            </Link>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link
                  href={project.slug?.current ? `/projects/${project.slug.current}` : '/projects'}
                  className="block bg-white dark:bg-[#111] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/5 h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    {project.mainImage?.asset?.url ? (
                      <img
                        src={project.mainImage.asset.url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                    {/* Category Badge */}
                    {project.category && (
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {project.category}
                        </span>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-gray-medium dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-medium dark:text-gray-500">
                      {project.location && <span>📍 {project.location}</span>}
                      {project.completionDate && <span>{project.completionDate}</span>}
                    </div>

                    {/* View Project Link */}
                    <div
                      className="mt-4 flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2"
                      style={{ color: primaryColor }}
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p className="text-gray-medium dark:text-gray-400 text-lg">
              No projects added yet. Add them in Sanity Studio.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}