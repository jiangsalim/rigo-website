'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <main>
      <section className="section-navy min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container className="relative z-10 text-center py-20">
          {/* 500 Number */}
          <h1 className="font-heading text-[120px] md:text-[180px] font-bold leading-none text-white/5 select-none">
            500
          </h1>

          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto -mt-16 mb-8"
            style={{ backgroundColor: 'rgba(230, 81, 0, 0.1)' }}>
            <svg className="w-10 h-10 text-[#E65100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Something Went Wrong
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
            We encountered an unexpected error. Please try again or contact us if the problem persists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={reset} className="btn-primary text-base px-10 py-4">
              Try Again
            </button>
            <Link href="/" className="btn-outline-light text-base px-10 py-4">
              Back to Home
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}