'use client'

import { useSanity } from '@/hooks/useSanity'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'

export default function TermsPage() {
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white pb-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().getFullYear()}</p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>1. Acceptance of Terms</h2>
            <p style={{ color: 'var(--text-body)' }}>
              By accessing and using the RIGO DESIGN & CONSTRUCTION CO. LTD website and services, 
              you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>2. Services</h2>
            <p style={{ color: 'var(--text-body)' }}>
              RIGO DESIGN & CONSTRUCTION CO. LTD provides construction, architectural design, 
              and related services. All services are subject to separate agreements and contracts 
              negotiated between the company and the client.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>3. Quotes & Estimates</h2>
            <p style={{ color: 'var(--text-body)' }}>
              Any quotes or estimates provided are valid for 30 days from the date of issue unless 
              otherwise stated. Final pricing may vary based on project scope, materials, and 
              unforeseen circumstances.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>4. Intellectual Property</h2>
            <p style={{ color: 'var(--text-body)' }}>
              All architectural plans, designs, drawings, and content on this website are the 
              intellectual property of RIGO DESIGN & CONSTRUCTION CO. LTD unless otherwise stated. 
              Unauthorized use, reproduction, or distribution is prohibited.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>5. Limitation of Liability</h2>
            <p style={{ color: 'var(--text-body)' }}>
              RIGO DESIGN & CONSTRUCTION CO. LTD shall not be liable for any indirect, incidental, 
              or consequential damages arising from the use of our website or services. Our liability 
              is limited to the maximum extent permitted by law.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>6. Website Use</h2>
            <p style={{ color: 'var(--text-body)' }}>When using our website, you agree not to:</p>
            <ul style={{ color: 'var(--text-body)' }} className="space-y-1">
              <li>Use the site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the website's functionality</li>
              <li>Submit false or misleading information</li>
            </ul>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>7. Third-Party Links</h2>
            <p style={{ color: 'var(--text-body)' }}>
              Our website may contain links to third-party websites. We are not responsible for 
              the content or practices of these external sites.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>8. Modifications</h2>
            <p style={{ color: 'var(--text-body)' }}>
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting to the website. Continued use of our services constitutes 
              acceptance of the modified terms.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>9. Governing Law</h2>
            <p style={{ color: 'var(--text-body)' }}>
              These terms shall be governed by and construed in accordance with the laws of 
              Uganda. Any disputes shall be subject to the exclusive jurisdiction of the courts of Uganda.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>10. Contact</h2>
            <p style={{ color: 'var(--text-body)' }}>
              For questions about these Terms & Conditions, contact us at:
            </p>
            <p style={{ color: 'var(--text-body)' }}>
              Email: {siteSettings?.contactEmail || 'info@rigodesign.co.tz'}<br />
              Phone: {siteSettings?.contactPhone || 'N/A'}
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}