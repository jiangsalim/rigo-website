'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

interface CookieBannerProps {
  primaryColor?: string
}

export default function CookieBanner({ primaryColor = '#F59E0B' }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    if (!cookiesAccepted) {
      // Show banner after a small delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
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
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[55] p-4"
        >
          <div className="max-w-4xl mx-auto bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Cookie Icon */}
              <div className="hidden sm:flex w-12 h-12 rounded-xl items-center justify-center flex-shrink-0" 
                style={{ backgroundColor: `${primaryColor}15` }}>
                <svg className="w-6 h-6" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9l11.21 11.21C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm mb-1">Cookie Consent</h4>
                <p className="text-gray-400 text-sm">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept", you consent to our use of cookies. 
                  <a href="/privacy" className="ml-1 hover:text-white transition-colors" style={{ color: primaryColor }}>
                    Learn more
                  </a>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 text-black"
                  style={{ backgroundColor: primaryColor }}
                >
                  Accept
                </button>
                <button
                  onClick={declineCookies}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}