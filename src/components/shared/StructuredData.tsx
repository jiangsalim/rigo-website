export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}