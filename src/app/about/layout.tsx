import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about RIGO DESIGN & CONSTRUCTION CO. LTD — our mission, vision, team, and commitment to quality construction in Uganda.',
  openGraph: {
    title: 'About Us | RIGO DESIGN & CONSTRUCTION',
    description: 'Learn about our mission, vision, team, and commitment to quality construction in Uganda.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}