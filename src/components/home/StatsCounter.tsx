'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Container from '@/components/ui/Container'

interface Stat {
  number: string
  label: string
}

interface StatsCounterProps {
  stats?: Stat[]
  primaryColor?: string
}

function CountUp({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const duration = 2000
      const steps = 60
      const increment = target / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }

    if (!isInView) {
      hasAnimated.current = false
      setCount(0)
    }
  }, [isInView, target])

  return <span>{count}{suffix}</span>
}

function StatItem({
  number,
  label,
  primaryColor,
  index,
}: {
  number: string
  label: string
  primaryColor: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-100px" })
  const match = number.match(/(\d+)(\+?)/)
  const value = match ? parseInt(match[1]) : 0
  const suffix = match ? match[2] : ''

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="text-center group"
    >
      {/* Icon circle */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <svg className="w-7 h-7" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
          {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
          {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
          {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
        </svg>
      </div>

      <div
        className="text-4xl md:text-5xl font-heading font-bold mb-2"
        style={{ color: primaryColor }}
      >
        <CountUp target={value} suffix={suffix} isInView={isInView} />
      </div>
      <p className="text-white/70 text-sm uppercase tracking-wider font-medium">
        {label}
      </p>
    </motion.div>
  )
}

export default function StatsCounter({
  stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '6+', label: 'Years Experience' },
    { number: '30+', label: 'Clients Served' },
    { number: '5', label: 'Countries Reached' },
  ],
  primaryColor = '#E65100'
}: StatsCounterProps) {
  return (
    <div className="py-16 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: false }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold mb-4 px-4 py-2 rounded-full"
            style={{
              color: primaryColor,
              backgroundColor: `${primaryColor}15`,
              border: `1px solid ${primaryColor}30`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            By The Numbers
          </motion.span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm">
            Delivering excellence across Tanzania and beyond
          </p>
          <div
            className="w-16 h-1 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              number={stat.number}
              label={stat.label}
              primaryColor={primaryColor}
              index={index}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}