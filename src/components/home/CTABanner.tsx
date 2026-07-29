'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { HiShieldCheck, HiStar, HiClock } from 'react-icons/hi'

interface CTABannerProps {
  heading?: string
  text?: string
  buttonLabel?: string
  buttonHref?: string
  primaryColor?: string
}

export default function CTABanner({
  heading = 'Ready to Start Your Project?',
  text = "Let's discuss your vision and bring it to life.",
  buttonLabel = 'Get a Quote',
  buttonHref = '/quote',
  primaryColor = '#E65100'
}: CTABannerProps) {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-navy">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow Effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full blur-[100px] opacity-5"
        style={{ backgroundColor: primaryColor }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <svg className="w-10 h-10" style={{ color: primaryColor }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </motion.div>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {heading}
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {text}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={buttonHref} className="btn-primary text-base px-10 py-4">
              {buttonLabel}
            </Link>
            <Link
              href="/contact"
              className="btn-outline-light text-base px-10 py-4"
            >
              Contact Us
            </Link>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-10 border-t border-white/10"
          >
            {[
              { icon: HiShieldCheck, text: 'Free Consultation' },
              { icon: HiStar, text: 'Quality Guaranteed' },
              { icon: HiClock, text: '6+ Years Experience' },
            ].map((badge, index) => {
              const IconComponent = badge.icon
              return (
                <div key={index} className="flex items-center gap-2 text-white/50 text-sm">
                  <IconComponent className="text-base" style={{ color: primaryColor }} />
                  <span className="font-medium">{badge.text}</span>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}