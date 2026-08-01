import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Get a detailed quote for your construction project. We respond within 48 hours.',
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }