import Container from '@/components/ui/Container'

export default function OfflinePage() {
  return (
    <main>
      <section className="section-navy min-h-screen flex items-center justify-center">
        <Container className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: 'rgba(230, 81, 0, 0.1)' }}>
            <svg className="w-10 h-10 text-[#E65100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M12 8v4m0 4h.01" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            You're Offline
          </h1>
          <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
            It looks like you've lost your internet connection. Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary text-base px-10 py-4"
          >
            Try Again
          </button>
        </Container>
      </section>
    </main>
  )
}