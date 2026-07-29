import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import ContactForm from '@/components/shared/ContactForm'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { HiOutlineMapPin } from 'react-icons/hi2'

export default async function ContactPage() {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  return (
    <main>
      {/* Hero with Breadcrumbs */}
      <PageHero
        title="Contact Us"
        subtitle="Have a project in mind? We'd love to hear from you. Reach out and let's start a conversation."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
        primaryColor={primaryColor}
      />

      {/* Contact Info + Form */}
      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
              <div className="space-y-6">
                {siteSettings?.contactEmail && (
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                      <HiOutlineMail className="text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <a href={`mailto:${siteSettings.contactEmail}`} className="text-white hover:text-amber-500 transition-colors">
                        {siteSettings.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                {siteSettings?.contactPhone && (
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                      <HiOutlinePhone className="text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Phone</p>
                      <a href={`tel:${siteSettings.contactPhone}`} className="text-white hover:text-amber-500 transition-colors">
                        {siteSettings.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
                {siteSettings?.contactAddress && (
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                      <HiOutlineMapPin className="text-xl" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Address</p>
                      <p className="text-white">{siteSettings.contactAddress}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Map */}
              {siteSettings?.googleMapsUrl && (
                <div className="mt-8 rounded-2xl overflow-hidden border border-white/5">
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

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
              <ContactForm primaryColor={primaryColor} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}