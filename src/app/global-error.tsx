'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-navy text-white antialiased font-body">
        <main>
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
              <h1 className="font-heading text-[120px] md:text-[180px] font-bold leading-none text-white/[0.03] select-none">
                500
              </h1>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto -mt-14 mb-6"
                style={{ backgroundColor: 'rgba(230, 81, 0, 0.1)' }}>
                <svg className="w-8 h-8 text-[#E65100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Critical Error</h2>
              <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
                The application encountered a critical error.
              </p>
              <button onClick={reset} className="btn-primary text-base px-10 py-4">
                Reload Page
              </button>
            </div>
          </section>
        </main>
      </body>
    </html>
  )
}