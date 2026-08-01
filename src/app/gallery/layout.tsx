import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Gallery',
  description: 'View photos and videos of our construction projects, architectural designs, and completed works.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }