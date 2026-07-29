import { sanityClient } from '@/lib/sanity.client'
import { GALLERY_PHOTOS_QUERY, GALLERY_VIDEOS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import PageHero from '@/components/shared/PageHero'
import GalleryContent from './GalleryContent'

export default async function GalleryPage() {
  const photos = await sanityClient.fetch(GALLERY_PHOTOS_QUERY)
  const videos = await sanityClient.fetch(GALLERY_VIDEOS_QUERY)
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY)
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

      <GalleryContent photos={photos} videos={videos} primaryColor={primaryColor} />
    </main>
  )
}