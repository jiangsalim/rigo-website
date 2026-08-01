import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Explore our portfolio of residential, commercial, and design-build construction projects across Uganda.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }