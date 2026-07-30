'use client'

import { useSanity } from '@/hooks/useSanity'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import ContactForm from '@/components/shared/ContactForm'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { HiOutlineMapPin } from 'react-icons/hi2'

export default function ContactPage() {
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Have a project in mind? We'd love to hear from you. Reach out and let's start a conversation."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-8" style={{ color: 'var(--text-heading)' }}>Contact Information</h2>
              <div className="space-y-6">
                {siteSettings?.contactEmail && (
                  <div className="flex items-start gap-4 p-6 rounded-2xl border transition-colors duration-300"
                    style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}12`, color: primaryColor }}>
                      <HiOutlineMail className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Email</p>
                      <a href={`mailto:${siteSettings.contactEmail}`} className="font-medium transition-colors" style={{ color: 'var(--text-heading)' }}>
                        {siteSettings.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                {siteSettings?.contactPhone && (
                  <div className="flex items-start gap-4 p-6 rounded-2xl border transition-colors duration-300"
                    style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}12`, color: primaryColor }}>
                      <HiOutlinePhone className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Phone</p>
                      <a href={`tel:${siteSettings.contactPhone?.replace(/\D/g, '')}`} className="font-medium transition-colors" style={{ color: 'var(--text-heading)' }}>
                        {siteSettings.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
                {siteSettings?.contactAddress && (
                  <div className="flex items-start gap-4 p-6 rounded-2xl border transition-colors duration-300"
                    style={{ backgroundColor: 'var(--bg-badge)', borderColor: 'var(--card-border)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}12`, color: primaryColor }}>
                      <HiOutlineMapPin className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Address</p>
                      <p className="font-medium" style={{ color: 'var(--text-heading)' }}>{siteSettings.contactAddress}</p>
                    </div>
                  </div>
                )}
              </div>

              {siteSettings?.googleMapsUrl && (
                <div className="mt-8 rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: 'var(--card-border)' }}>
                  <iframe
                    src={siteSettings.googleMapsUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold mb-8" style={{ color: 'var(--text-heading)' }}>Send a Message</h2>
              <ContactForm primaryColor={primaryColor} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}