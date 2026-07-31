'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiDownload } from 'react-icons/hi'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt({ primaryColor = '#E65100' }: { primaryColor?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if installed after prompt
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  // Don't show if already installed or prompt not available
  if (isInstalled || !deferredPrompt) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="p-4 rounded-2xl border"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderColor: `${primaryColor}30`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${primaryColor}15` }}>
            <HiDownload className="text-lg" style={{ color: primaryColor }} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Install Our App</p>
            <p className="text-gray-400 text-xs">Quick access on your device</p>
          </div>
        </div>
        <button
          onClick={handleInstall}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] text-white"
          style={{ backgroundColor: primaryColor }}
        >
          Install Now
        </button>
      </motion.div>
    </AnimatePresence>
  )
}