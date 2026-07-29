'use client'

import { useSanity } from '@/hooks/useSanity'
import { TEAM_MEMBERS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import PageHero from '@/components/shared/PageHero'
import AboutPageContent from './AboutPageContent'

export default function AboutPage() {
  const { data: teamMembers } = useSanity(TEAM_MEMBERS_QUERY)
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="About Us"
        subtitle="Learn more about our story, mission, and the team behind RIGO DESIGN & CONSTRUCTION."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        primaryColor={primaryColor}
      />

      <AboutPageContent teamMembers={teamMembers || []} siteSettings={siteSettings || {}} />
    </main>
  )
}