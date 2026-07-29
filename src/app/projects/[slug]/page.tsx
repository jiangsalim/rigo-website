'use client'

import { use } from 'react'
import { useSanity } from '@/hooks/useSanity'
import { PROJECT_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { PortableText } from '@portabletext/react'
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'
import { MdOutlineAttachMoney } from 'react-icons/md'

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data: project } = useSanity(PROJECT_BY_SLUG_QUERY, { slug })
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  if (!project) return null

  return (
    <main>
      <PageHero
        title={project.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
        primaryColor={primaryColor}
      />

      {/* Meta Info */}
      <section className="section-white pb-4">
        <Container>
          <div className="flex flex-wrap gap-6 text-charcoal">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: primaryColor }}>
              {project.category}
            </span>
            {project.location && (
              <span className="flex items-center gap-2 text-sm">
                <HiOutlineLocationMarker className="text-base" style={{ color: primaryColor }} />
                {project.location}
              </span>
            )}
            {project.completionDate && (
              <span className="flex items-center gap-2 text-sm">
                <HiOutlineCalendar className="text-base" style={{ color: primaryColor }} />
                {new Date(project.completionDate).getFullYear()}
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* Cover Image */}
      {project.coverImage && (
        <section className="section-white">
          <Container>
            <img
              src={urlFor(project.coverImage).width(1200).height(600).url()}
              alt={project.title}
              className="w-full rounded-2xl shadow-lg"
            />
          </Container>
        </section>
      )}

      {/* Description & Stats */}
      <section className="section-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-navy mb-6">About This Project</h2>
              <div className="prose prose-lg max-w-none text-charcoal">
                <PortableText value={project.description} />
              </div>
            </div>

            {project.stats && (
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-navy mb-4">Project Stats</h3>
                <div className="space-y-3">
                  {project.stats.squareFootage && (
                    <div className="p-4 rounded-xl bg-gray-light border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <BsArrowsFullscreen className="text-sm" style={{ color: primaryColor }} />
                        <p className="text-xs text-muted uppercase">Square Footage</p>
                      </div>
                      <p className="text-navy font-semibold">{project.stats.squareFootage}</p>
                    </div>
                  )}
                  {project.stats.duration && (
                    <div className="p-4 rounded-xl bg-gray-light border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <FiClock className="text-sm" style={{ color: primaryColor }} />
                        <p className="text-xs text-muted uppercase">Duration</p>
                      </div>
                      <p className="text-navy font-semibold">{project.stats.duration}</p>
                    </div>
                  )}
                  {project.stats.budget && (
                    <div className="p-4 rounded-xl bg-gray-light border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <MdOutlineAttachMoney className="text-sm" style={{ color: primaryColor }} />
                        <p className="text-xs text-muted uppercase">Budget</p>
                      </div>
                      <p className="text-navy font-semibold">{project.stats.budget}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Photo Gallery */}
      {project.photoGallery?.length > 0 && (
        <section className="section-gray py-20">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-navy mb-8">Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.photoGallery.map((photo: any, index: number) => (
                <img
                  key={index}
                  src={urlFor(photo).width(600).height(400).url()}
                  alt={photo.alt || `${project.title} photo ${index + 1}`}
                  className="rounded-xl w-full aspect-[4/3] object-cover hover:scale-[1.02] transition-transform duration-300 shadow-sm"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="section-white py-20">
          <Container>
            <div className="max-w-2xl mx-auto text-center p-10 rounded-2xl bg-gray-light border border-gray-200">
              <svg className="w-8 h-8 mx-auto mb-4 opacity-20" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-charcoal text-lg italic mb-6 leading-relaxed">"{project.testimonial.review}"</p>
              <p className="text-navy font-heading font-bold">{project.testimonial.clientName}</p>
              <p className="text-muted text-sm">{project.testimonial.clientRole}</p>
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}