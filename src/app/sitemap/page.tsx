import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import Link from 'next/link'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

const pages = [
  { title: 'Home', href: '/' },
  { title: 'About Us', href: '/about' },
  { title: 'Our Services', href: '/services' },
  { title: 'Our Projects', href: '/projects' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Architectural Plans', href: '/architectural-plans' },
  { title: 'Contact Us', href: '/contact' },
  { title: 'Request a Quote', href: '/quote' },
]

const legal = [
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'Terms & Conditions', href: '/terms' },
  { title: 'XML Sitemap', href: '/sitemap.xml' },
]

export default function SitemapPage() {
  return (
    <main>
      <PageHero
        title="Sitemap"
        subtitle="Find everything on our website."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sitemap' },
        ]}
      />

      <section className="section-white py-20">
        <Container>
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Pages */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Pages</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-md border"
                      style={{
                        color: 'var(--text-heading)',
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#E65100' }} />
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Legal & Resources</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {legal.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-md border"
                      style={{
                        color: 'var(--text-heading)',
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#E65100' }} />
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}