'use client'

import { useSanity } from '@/hooks/useSanity'
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'

export default function ProjectsPage() {
  const { data: projects } = useSanity(PROJECTS_QUERY)
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="Our Projects"
        subtitle="Explore our portfolio of residential, commercial, and design-build projects."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white pb-24">
        <Container>
          {projects?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <Link
                  key={project.slug.current}
                  href={`/projects/${project.slug.current}`}
                  className="group block relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-light shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {project.coverImage && (
                    <img
                      src={urlFor(project.coverImage).width(800).height(600).url()}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <span
                      className="text-xs uppercase tracking-wider mb-2 block font-semibold"
                      style={{ color: primaryColor }}
                    >
                      {project.category} {project.location && `• ${project.location}`}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <svg className="w-10 h-10" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                </svg>
              </div>
              <p className="text-charcoal text-lg font-medium">No projects yet</p>
              <p className="text-muted text-sm mt-1">Add them in Sanity Studio to display here.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}