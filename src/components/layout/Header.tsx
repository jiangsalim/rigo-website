'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

interface NavItem {
  label: string
  href: string
  isButton?: boolean
  dropdown?: { label: string; href: string }[]
}

interface HeaderProps {
  navItems: NavItem[]
  siteTitle: string
  primaryColor: string
  logo?: { asset?: { url?: string } } | null
  logoDark?: { asset?: { url?: string } } | null
}

export default function Header({ navItems, siteTitle, primaryColor, logo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const logoSrc = logo?.asset?.url || null

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo + Site Title */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            {logoSrc ? (
              <div className="relative w-12 h-12 flex-shrink-0 rounded-full bg-navy flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-lg">
                <Image
                  src={logoSrc}
                  alt={siteTitle}
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, #BF360C)`,
                }}
              >
                R
              </div>
            )}
            <div className="hidden sm:block">
              <h1 className={`font-heading font-bold leading-tight transition-all duration-300 text-white ${
                isScrolled ? 'text-base' : 'text-lg'
              }`}>
                {siteTitle}
              </h1>
              <p
                className="text-xs tracking-wider uppercase font-medium"
                style={{ color: primaryColor }}
              >
                Build The Future
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems?.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown && item.dropdown.length > 0 ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className="px-4 py-2 text-sm font-medium flex items-center gap-1 text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                    <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : item.isButton ? (
                  <Link
                    href={item.href || '/'}
                    className="btn-primary text-sm ml-3"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    href={item.href || '/'}
                    className="px-4 py-2 text-sm font-medium relative group text-white/80 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[200px] border border-gray-100"
                    >
                      {item.dropdown.map((dropItem, i) => (
                        <Link
                          key={i}
                          href={dropItem.href || '/'}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 z-50 relative"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 block bg-white"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 block bg-white"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 block bg-white"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy/98 backdrop-blur-lg lg:hidden flex items-center justify-center"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-6"
            >
              {navItems?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href || '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl text-white hover:text-[var(--accent)] transition-colors duration-300 font-heading"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}