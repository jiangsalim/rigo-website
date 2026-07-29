import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { sanityClient } from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'

export default async function TermsPage() {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

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

      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-invert prose-gray">
            <p className="text-gray-400">Last updated: {new Date().getFullYear()}</p>

            <h2 className="text-white text-xl font-bold mt-8">1. Acceptance of Terms</h2>
            <p className="text-gray-400">
              By accessing and using the RIGO DESIGN & CONSTRUCTION CO. LTD website and services, 
              you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">2. Services</h2>
            <p className="text-gray-400">
              RIGO DESIGN & CONSTRUCTION CO. LTD provides construction, architectural design, 
              and related services. All services are subject to separate agreements and contracts 
              negotiated between the company and the client.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">3. Quotes & Estimates</h2>
            <p className="text-gray-400">
              Any quotes or estimates provided are valid for 30 days from the date of issue unless 
              otherwise stated. Final pricing may vary based on project scope, materials, and 
              unforeseen circumstances.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">4. Intellectual Property</h2>
            <p className="text-gray-400">
              All architectural plans, designs, drawings, and content on this website are the 
              intellectual property of RIGO DESIGN & CONSTRUCTION CO. LTD unless otherwise stated. 
              Unauthorized use, reproduction, or distribution is prohibited.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">5. Limitation of Liability</h2>
            <p className="text-gray-400">
              RIGO DESIGN & CONSTRUCTION CO. LTD shall not be liable for any indirect, incidental, 
              or consequential damages arising from the use of our website or services. Our liability 
              is limited to the maximum extent permitted by law.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">6. Website Use</h2>
            <p className="text-gray-400">When using our website, you agree not to:</p>
            <ul className="text-gray-400 space-y-1">
              <li>Use the site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the website's functionality</li>
              <li>Submit false or misleading information</li>
            </ul>

            <h2 className="text-white text-xl font-bold mt-8">7. Third-Party Links</h2>
            <p className="text-gray-400">
              Our website may contain links to third-party websites. We are not responsible for 
              the content or practices of these external sites.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">8. Modifications</h2>
            <p className="text-gray-400">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting to the website. Continued use of our services constitutes 
              acceptance of the modified terms.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">9. Governing Law</h2>
            <p className="text-gray-400">
              These terms shall be governed by and construed in accordance with the laws of 
              Tanzania. Any disputes shall be subject to the exclusive jurisdiction of the courts of Tanzania.
            </p>

            <h2 className="text-white text-xl font-bold mt-8">10. Contact</h2>
            <p className="text-gray-400">
              For questions about these Terms & Conditions, contact us at:
            </p>
            <p className="text-gray-400">
              Email: {siteSettings?.contactEmail || 'info@rigodesign.co.tz'}<br />
              Phone: {siteSettings?.contactPhone || 'N/A'}
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}