'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import Link from 'next/link'

interface CookieBannerProps {
  primaryColor?: string
}

export default function CookieBanner({ primaryColor = '#E65100' }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    if (!cookiesAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-4 right-4 z-[55] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md"
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primaryColor}12` }}
                >
                  <svg className="w-5 h-5" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z" />
                  </svg>
                </div>
                <h4 className="text-navy font-heading font-bold text-sm">Cookie Notice</h4>
              </div>
              <button
                onClick={declineCookies}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Close cookie banner"
              >
                <FiX className="text-base" />
              </button>
            </div>

            {/* Text */}
            <p className="text-charcoal text-sm leading-relaxed mb-4">
              We use cookies to enhance your experience. By continuing to browse, you agree to our{' '}
              <Link href="/privacy" className="font-medium underline underline-offset-2 hover:text-navy transition-colors" style={{ color: primaryColor }}>
                Privacy Policy
              </Link>
              .
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={declineCookies}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-navy hover:bg-gray-50 rounded-xl transition-all duration-300"
              >
                Decline
              </button>
              <motion.button
                onClick={acceptCookies}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 btn-primary text-sm py-2.5 rounded-xl"
              >
                Accept All
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}