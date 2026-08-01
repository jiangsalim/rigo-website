import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive construction services — residential, commercial, design-build, renovation, and interior design in Uganda.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }