export default function StructuredData() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://rigo-design-construction-co-ltd.vercel.app',
    name: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    description: 'Premium construction and architectural design services in Uganda.',
    url: 'https://rigo-design-construction-co-ltd.vercel.app',
    logo: 'https://rigo-design-construction-co-ltd.vercel.app/icon-512.png',
    image: 'https://rigo-design-construction-co-ltd.vercel.app/icon-512.png',
    telephone: '+256772723188',
    email: 'info@rigodesign.co.tz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mukono, Namawojjolo, next to Gaz Petrol Station',
      addressCountry: 'UG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.3849,
      longitude: 32.8393,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    sameAs: [],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Uganda',
    },
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://rigo-design-construction-co-ltd.vercel.app/#organization',
    name: 'RIGO DESIGN & CONSTRUCTION CO. LTD',
    url: 'https://rigo-design-construction-co-ltd.vercel.app',
    logo: 'https://rigo-design-construction-co-ltd.vercel.app/icon-512.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+256772723188',
      contactType: 'customer service',
      areaServed: 'UG',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    </>
  )
}