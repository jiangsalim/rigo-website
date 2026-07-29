import { sanityClient } from '@/lib/sanity.client'
import { TEAM_MEMBERS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Container from '@/components/ui/Container'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'

export default async function AboutPage() {
  const teamMembers = await sanityClient.fetch(TEAM_MEMBERS_QUERY)
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#F59E0B'

  return (
    <main>
      {/* Hero with Breadcrumbs */}
      <PageHero
        title="About Us"
        subtitle="Learn more about our story, mission, and the team behind RIGO DESIGN & CONSTRUCTION."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        primaryColor={primaryColor}
      />

      {/* Mission & Vision */}
      <section className="pb-20 bg-[#0A0A0A]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To deliver exceptional construction and architectural solutions that exceed client expectations, 
                built on a foundation of quality, integrity, and innovation.
              </p>
            </div>
            <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be Tanzania's leading construction and design company, recognized for transforming 
                ideas into landmark structures that inspire communities.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="pb-20 bg-[#0A0A0A]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '100+', label: 'Happy Clients' },
              { number: '30+', label: 'Team Members' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="pb-24 bg-[#0A0A0A]">
        <Container>
          <SectionHeading
            heading="Our Team"
            subheading="Meet the Experts"
            accentColor={primaryColor}
          />
          {teamMembers?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {teamMembers.map((member: any) => (
                <div key={member.name} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-[#1A1A1A] border-2 border-white/5 group-hover:border-amber-500/50 transition-colors">
                    {member.photo ? (
                      <img
                        src={urlFor(member.photo).width(200).height(200).url()}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-600">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-semibold">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-8">Team members coming soon.</p>
          )}
        </Container>
      </section>
    </main>
  )
}