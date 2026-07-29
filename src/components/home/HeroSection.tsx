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
  headline = 'Build The Future',
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

  // Split headline to highlight last word
  const headlineWords = headline.split(' ')
  const lastWord = headlineWords.pop()
  const firstPart = headlineWords.join(' ')

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />
        </motion.div>
      )}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative Glow Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: primaryColor }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-5" style={{ backgroundColor: primaryColor }} />

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
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
          style={{
            backgroundColor: `${primaryColor}12`,
            border: `1px solid ${primaryColor}30`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: primaryColor }}
          />
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: primaryColor }}
          >
            {subheadline}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.08] text-white"
        >
          {firstPart}{' '}
          <span className="text-gradient" style={{
            background: `linear-gradient(135deg, ${primaryColor}, #FF8A50)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {lastWord}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium construction and architectural design services. From concept to completion, we bring your vision to life.
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
                  ? 'btn-primary text-base px-10 py-4'
                  : btn.variant === 'secondary'
                  ? 'btn-secondary text-base px-10 py-4 border-white/30 text-white hover:bg-white hover:text-navy'
                  : 'btn-outline-light text-base px-10 py-4'
              }
            >
              {btn.label}
            </Link>
          ))}
          {!ctaButtons && (
            <>
              <Link href="/projects" className="btn-primary text-base px-10 py-4">
                View Our Work
              </Link>
              <Link href="/contact" className="btn-outline-light text-base px-10 py-4">
                Get In Touch
              </Link>
            </>
          )}
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
            className="w-7 h-11 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}