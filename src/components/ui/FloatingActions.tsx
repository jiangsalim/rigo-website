'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

interface FloatingActionsProps {
  whatsappNumber?: string
  phoneNumber?: string
  primaryColor?: string
  siteTitle?: string
}

export default function FloatingActions({
  whatsappNumber = '',
  phoneNumber = '',
  primaryColor = '#E65100',
  siteTitle = 'RIGO DESIGN & CONSTRUCTION'
}: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in your construction services. Please provide more information.`
  )
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`
    : ''

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <AnimatePresence>
        {whatsappNumber && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.5,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
            className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={26} />
            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 group-hover:opacity-0 transition-opacity" />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Phone Button */}
      <AnimatePresence>
        {phoneNumber && (
          <motion.a
            href={`tel:${phoneNumber.replace(/\D/g, '')}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.5,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            style={{ backgroundColor: primaryColor }}
            aria-label="Call us"
          >
            <FaPhoneAlt size={20} className="text-white" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}