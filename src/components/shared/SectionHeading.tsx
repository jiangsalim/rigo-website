'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  heading: string
  subheading?: string
  accentColor?: string
  align?: 'left' | 'center'
  theme?: 'navy' | 'white' | 'gray'
}

export default function SectionHeading({ 
  heading, 
  subheading, 
  accentColor = '#E65100',
  align = 'center',
  theme = 'white'
}: SectionHeadingProps) {
  const isNavy = theme === 'navy'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {/* Subheading badge */}
      {subheading && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold mb-4 px-4 py-2 rounded-full"
          style={{
            color: accentColor,
            backgroundColor: `${accentColor}12`,
            border: `1px solid ${accentColor}30`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          {subheading}
        </motion.span>
      )}

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight`}
        style={{ color: isNavy ? '#FFFFFF' : 'var(--text-heading)' }}
      >
        {heading}
      </motion.h2>

      {/* Decorative underline */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: align === 'center' ? '60px' : '40px' }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className={`h-1 mt-4 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}
        style={{ backgroundColor: accentColor }}
      />
    </motion.div>
  )
}