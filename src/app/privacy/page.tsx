'use client'

import { useSanity } from '@/hooks/useSanity'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'

export default function PrivacyPage() {
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
        primaryColor={primaryColor}
      />

      <section className="section-white pb-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().getFullYear()}</p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>1. Introduction</h2>
            <p style={{ color: 'var(--text-body)' }}>
              RIGO DESIGN & CONSTRUCTION CO. LTD ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website or use our services.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>2. Information We Collect</h2>
            <h3 className="font-heading text-lg font-semibold mt-4" style={{ color: 'var(--text-heading)' }}>Personal Information</h3>
            <p style={{ color: 'var(--text-body)' }}>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul style={{ color: 'var(--text-body)' }} className="space-y-1">
              <li>Fill out a contact form</li>
              <li>Request a quote</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via email or phone</li>
            </ul>
            <p style={{ color: 'var(--text-body)' }} className="mt-4">This information may include:</p>
            <ul style={{ color: 'var(--text-body)' }} className="space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Project details and requirements</li>
              <li>Location information</li>
            </ul>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>3. How We Use Your Information</h2>
            <p style={{ color: 'var(--text-body)' }}>We use the information we collect to:</p>
            <ul style={{ color: 'var(--text-body)' }} className="space-y-1">
              <li>Respond to your inquiries and provide quotes</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Send periodic emails regarding your project or our services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>4. Data Protection</h2>
            <p style={{ color: 'var(--text-body)' }}>
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>5. Cookies</h2>
            <p style={{ color: 'var(--text-body)' }}>
              Our website uses cookies to enhance your browsing experience. You can choose to disable 
              cookies through your browser settings. Please refer to our Cookie Policy for more information.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>6. Third-Party Services</h2>
            <p style={{ color: 'var(--text-body)' }}>
              We may use third-party services (such as analytics and email services) that collect, 
              monitor, and analyze data to improve our service. These third parties have their own 
              privacy policies.
            </p>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>7. Your Rights</h2>
            <p style={{ color: 'var(--text-body)' }}>You have the right to:</p>
            <ul style={{ color: 'var(--text-body)' }} className="space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with relevant authorities</li>
            </ul>

            <h2 className="font-heading text-xl font-bold mt-8" style={{ color: 'var(--text-heading)' }}>8. Contact Us</h2>
            <p style={{ color: 'var(--text-body)' }}>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p style={{ color: 'var(--text-body)' }}>
              Email: {siteSettings?.contactEmail || 'info@rigodesign.co.tz'}<br />
              Phone: {siteSettings?.contactPhone || 'N/A'}<br />
              Address: {siteSettings?.contactAddress || 'N/A'}
            </p>
          </div>
        </Container>
      </section>
    </main>
  )
}