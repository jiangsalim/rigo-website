import { sanityClient } from '@/lib/sanity.client'
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'

export default async function ProjectsPage() {
  const projects = await sanityClient.fetch(PROJECTS_QUERY)
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  return (
    <main>
      {/* Hero with Breadcrumbs */}
      <PageHero
        title="Our Projects"
        subtitle="Explore our portfolio of residential, commercial, and design-build projects."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects' },
        ]}
        primaryColor={primaryColor}
      />

      {/* Projects Grid */}
      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          {projects?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <Link
                  key={project.slug.current}
                  href={`/projects/${project.slug.current}`}
                  className="group block relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#1A1A1A]"
                >
                  {project.coverImage && (
                    <img
                      src={urlFor(project.coverImage).width(800).height(600).url()}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <span
                      className="text-xs uppercase tracking-wider mb-2 block"
                      style={{ color: primaryColor }}
                    >
                      {project.category} • {project.location}
                    </span>
                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-500 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects yet. Add your first project in Sanity Studio.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}