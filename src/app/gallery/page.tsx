'use client'

import { useSanity } from '@/hooks/useSanity'
import { GALLERY_PHOTOS_QUERY, GALLERY_VIDEOS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import PageHero from '@/components/shared/PageHero'
import GalleryContent from './GalleryContent'

export default function GalleryPage() {
  const { data: photos } = useSanity(GALLERY_PHOTOS_QUERY)
  const { data: videos } = useSanity(GALLERY_VIDEOS_QUERY)
  const { data: siteSettings } = useSanity(SITE_SETTINGS_QUERY)
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <main>
      <PageHero
        title="Our Gallery"
        subtitle="Explore our work through photos and videos showcasing our construction and design projects."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Gallery' },
        ]}
        primaryColor={primaryColor}
      />

      <GalleryContent photos={photos || []} videos={videos || []} primaryColor={primaryColor} />
    </main>
  )
}