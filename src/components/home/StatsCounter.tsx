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
      className="text-center"
    >
      <div
        className="text-4xl md:text-5xl font-heading font-bold mb-2"
        style={{ color: primaryColor }}
      >
        <CountUp target={value} suffix={suffix} isInView={isInView} />
      </div>
      <p className="text-gray-medium dark:text-gray-400 text-sm uppercase tracking-wider">
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
    <section className="section-dark py-16 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-medium max-w-2xl mx-auto">
            Delivering excellence across Uganda and beyond
          </p>
          <div
            className="w-20 h-1 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
    </section>
  )
}