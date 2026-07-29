'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  heading: string
  subheading?: string
  accentColor?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ 
  heading, 
  subheading, 
  accentColor = '#F59E0B',
  align = 'center'
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <span
        className="text-xs uppercase tracking-[0.2em] font-medium mb-3 block"
        style={{ color: accentColor }}
      >
        {subheading}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        {heading}
      </h2>
    </motion.div>
  )
}