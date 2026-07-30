'use client'

import { use } from 'react'
import { useSanity } from '@/hooks/useSanity'
import { TEAM_MEMBER_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { FaLinkedin, FaTwitter, FaGlobe, FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'

export default function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data: member } = useSanity(TEAM_MEMBER_BY_SLUG_QUERY, { slug })
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  if (!member) return null

  return (
    <main>
      <PageHero
        title={member.name}
        subtitle={member.role}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: member.name },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white py-12">
        <Container>
          <Link href="/about" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: 'var(--text-body)' }}>
            <BsArrowLeft /> Back to About
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Photo */}
                <div className="aspect-square rounded-2xl overflow-hidden border shadow-sm"
                  style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)' }}>
                  {member.photo && (
                    <img src={urlFor(member.photo).width(400).height(400).url()} alt={member.name}
                      className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-3">
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl border text-sm hover:shadow-md transition-all"
                      style={{
                        backgroundColor: 'var(--bg-badge)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text-heading)',
                      }}>
                      <FaEnvelope style={{ color: primaryColor }} /> {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-3 p-3 rounded-xl border text-sm hover:shadow-md transition-all"
                      style={{
                        backgroundColor: 'var(--bg-badge)',
                        borderColor: 'var(--card-border)',
                        color: 'var(--text-heading)',
                      }}>
                      <FaPhone style={{ color: primaryColor }} /> {member.phone}
                    </a>
                  )}

                  {/* CV Download */}
                  {member.cv?.asset?.url && (
                    <a href={member.cv.asset.url} target="_blank" rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-3">
                      <FaDownload /> Download CV (PDF)
                    </a>
                  )}

                  {/* Social Links */}
                  {(member.socialLinks?.linkedin || member.socialLinks?.twitter || member.socialLinks?.website) && (
                    <div className="flex gap-2">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all">
                          <FaLinkedin />
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all">
                          <FaTwitter />
                        </a>
                      )}
                      {member.socialLinks.website && (
                        <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all"
                          style={{
                            backgroundColor: 'var(--bg-badge)',
                            borderColor: 'var(--card-border)',
                            color: 'var(--text-heading)',
                          }}>
                          <FaGlobe />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Expertise */}
              {member.expertise?.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill: string) => (
                      <span key={skill}
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{ backgroundColor: `${primaryColor}12`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Bio */}
              {member.fullBio && (
                <div>
                  <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>About {member.name.split(' ')[0]}</h3>
                  <div className="prose prose-lg max-w-none" style={{ color: 'var(--text-body)' }}>
                    <PortableText value={member.fullBio} />
                  </div>
                </div>
              )}

              {/* Structured CV */}
              {member.cvContent && (
                <div>
                  <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Curriculum Vitae</h3>
                  <div className="prose prose-lg max-w-none" style={{ color: 'var(--text-body)' }}>
                    <PortableText value={member.cvContent} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}