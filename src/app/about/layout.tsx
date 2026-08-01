import { Metadata } from 'next'

const siteUrl = 'https://rigo-design-construction-co-ltd.vercel.app'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about RIGO DESIGN & CONSTRUCTION — our mission, vision, team, and commitment to quality construction in Uganda.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}