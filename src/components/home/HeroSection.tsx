'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'

interface HeroProps {
  headline?: string
  subheadline?: string
  backgroundImage?: string
  ctaButtons?: {
    label: string
    href: string
    variant: 'primary' | 'secondary' | 'outline'
  }[]
  primaryColor?: string
}

export default function HeroSection({
  headline = 'Building The Future',
  subheadline = 'Premium construction and architectural design services',
  backgroundImage,
  ctaButtons,
  primaryColor = '#E65100'
}: HeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>
      )}

      {/* Grid Pattern Overlay */}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* Hero Content */}
      <motion.div
        style={{ y: textY, opacity: heroOpacity }}
        className="container-custom relative z-10 text-center text-white pt-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
          style={{
            backgroundColor: `${primaryColor}15`,
            border: `1px solid ${primaryColor}30`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: primaryColor }}
          />
          <span
            className="text-sm font-medium tracking-wide"
            style={{ color: primaryColor }}
          >
            RIGO DESIGN & CONSTRUCTION Co. LTD
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
        >
          {headline.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-gradient">
            {headline.split(' ').slice(-1)}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-medium text-lg sm:text-xl max-w-2xl mx-auto mb-10"
        >
          {subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {ctaButtons?.map((btn, index) => (
            <Link
              key={index}
              href={btn.href}
              className={
                btn.variant === 'primary'
                  ? 'btn-primary text-lg'
                  : btn.variant === 'secondary'
                  ? 'btn-secondary text-lg dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-gray-900'
                  : 'btn-outline-light text-lg'
              }
            >
              {btn.label}
            </Link>
          ))}
          {!ctaButtons && (
            <>
              <Link href="/projects" className="btn-primary text-lg">
                View Our Work
              </Link>
              <Link href="/contact" className="btn-outline-light text-lg">
                Get In Touch
              </Link>
            </>
          )}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16 pt-12 border-t border-white/10"
        >
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '6+', label: 'Years Experience' },
            { value: '30+', label: 'Clients Served' },
            { value: '5', label: 'Countries Reached' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-heading font-bold"
                style={{ color: primaryColor }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}