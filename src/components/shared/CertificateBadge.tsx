'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity.image'
import { HiBadgeCheck, HiX, HiSearch } from 'react-icons/hi'

interface CertificateBadgeProps {
  certificate?: { asset?: { url?: string } } | null
  tinNumber?: string
  registrationNumber?: string
  primaryColor?: string
}

export default function CertificateBadge({ certificate, tinNumber, registrationNumber, primaryColor = '#E65100' }: CertificateBadgeProps) {
  const [showLightbox, setShowLightbox] = useState(false)

  if (!certificate?.asset?.url) return null

  return (
    <>
      {/* Badge */}
      <button
        onClick={() => setShowLightbox(true)}
        className="flex items-center gap-3 p-4 rounded-2xl border hover:shadow-md transition-all duration-300 group w-full text-left"
        style={{
          backgroundColor: 'var(--bg-badge)',
          borderColor: 'var(--card-border)',
        }}
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}12` }}>
          <HiBadgeCheck className="text-2xl" style={{ color: primaryColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>Registered & Compliant</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {tinNumber && `TIN: ${tinNumber}`}
            {registrationNumber && ` • Reg: ${registrationNumber}`}
          </p>
        </div>
        <HiSearch className="text-lg flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: primaryColor }} />
      </button>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-navy/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <HiX className="text-2xl" />
            </button>
            <div className="max-w-lg w-full bg-white rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-4">
                <HiBadgeCheck className="text-4xl mx-auto mb-2" style={{ color: primaryColor }} />
                <h3 className="font-heading text-xl font-bold text-navy">Tax Registration Certificate</h3>
                {tinNumber && <p className="text-charcoal text-sm mt-1">TIN: {tinNumber}</p>}
                {registrationNumber && <p className="text-charcoal text-sm">Reg: {registrationNumber}</p>}
              </div>
              <img
                src={urlFor(certificate).width(600).url()}
                alt="Tax Registration Certificate"
                className="w-full rounded-xl border border-gray-200"
              />
              <p className="text-center text-muted text-xs mt-4">
                RIGO DESIGN & CONSTRUCTION CO. LTD is a registered taxpayer in Uganda.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}