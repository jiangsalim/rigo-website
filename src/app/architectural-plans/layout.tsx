import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Architectural Plans',
  description: 'Browse pre-designed architectural plans for residential and commercial buildings in Uganda.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }