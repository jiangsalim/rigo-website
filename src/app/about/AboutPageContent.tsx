'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'
import { FaBuilding, FaClock, FaSmile, FaUsers, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { BsDownload } from 'react-icons/bs'

/* ========== CountUp Subcomponent ========== */
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

/* ========== Stat Icons Map ========== */
const statIcons: Record<string, any> = {
  'Projects Completed': FaBuilding,
  'Projects Delivered': FaBuilding,
  'Years Experience': FaClock,
  'Happy Clients': FaSmile,
  'Team Members': FaUsers,
  'Clients Served': FaSmile,
  'Countries Reached': FaBuilding,
}

/* ========== Animated Stat Item ========== */
function StatItem({ number, label, primaryColor, index }: {
  number: string; label: string; primaryColor: string; index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-100px" })
  const match = number.match(/(\d+)(\+?)/)
  const value = match ? parseInt(match[1]) : 0
  const suffix = match ? match[2] : ''

  const IconComponent = statIcons[label] || FaBuilding

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center p-6 rounded-2xl hover:shadow-md transition-all duration-300 group border"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${primaryColor}12` }}
      >
        <IconComponent className="text-2xl" style={{ color: primaryColor }} />
      </div>
      <p className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: primaryColor }}>
        <CountUp target={value} suffix={suffix} isInView={isInView} />
      </p>
      <p className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{label}</p>
    </motion.div>
  )
}

/* ========== Page Content ========== */
interface AboutPageContentProps {
  teamMembers: any[]
  siteSettings: any
}

export default function AboutPageContent({ teamMembers, siteSettings }: AboutPageContentProps) {
  const primaryColor = siteSettings?.primaryColor || '#E65100'

  return (
    <>
      {/* Mission & Vision */}
      <section className="section-white pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-2xl hover:shadow-md transition-shadow duration-300 group border"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--card-border)',
              }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${primaryColor}12` }}>
                <svg className="w-6 h-6" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Our Mission</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                To deliver exceptional construction and architectural solutions that exceed client expectations, 
                built on a foundation of quality, integrity, and innovation.
              </p>
            </div>
            <div className="p-10 rounded-2xl hover:shadow-md transition-shadow duration-300 group border"
              style={{
                backgroundColor: 'var(--bg-badge)',
                borderColor: 'var(--card-border)',
              }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${primaryColor}12` }}>
                <svg className="w-6 h-6" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>Our Vision</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-body)' }}>
                To be Uganda's leading construction and design company, recognized for transforming 
                ideas into landmark structures that inspire communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — Counting + resets on scroll-away */}
      <section className="section-gray py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '100+', label: 'Happy Clients' },
              { number: '30+', label: 'Team Members' },
            ].map((stat, index) => (
              <StatItem
                key={stat.label}
                number={stat.number}
                label={stat.label}
                primaryColor={primaryColor}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-white pb-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold mb-4 px-4 py-2 rounded-full"
              style={{ color: primaryColor, backgroundColor: `${primaryColor}12`, border: `1px solid ${primaryColor}30` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              Meet the Experts
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>
              Our Team
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: primaryColor }} />
          </div>

          {teamMembers?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member: any) => (
                <div key={member.name} className="text-center group">
                  <Link href={`/about/team/${member.slug?.current}`}>
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 group-hover:border-[var(--accent)]/50 transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: 'var(--bg-badge)',
                        borderColor: 'var(--card-border)',
                      }}>
                      {member.photo ? (
                        <img src={urlFor(member.photo).width(200).height(200).url()} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-heading font-bold" style={{ color: 'var(--text-muted)' }}>
                          {member.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      )}
                    </div>
                  </Link>

                  <Link href={`/about/team/${member.slug?.current}`}>
                    <h3 className="font-heading font-bold transition-colors" style={{ color: 'var(--text-heading)' }}>{member.name}</h3>
                  </Link>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{member.role}</p>

                  {(member.socialLinks?.linkedin || member.socialLinks?.twitter) && (
                    <div className="flex justify-center gap-1.5 mt-2">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] text-xs hover:bg-[#0077B5] hover:text-white transition-all">
                          <FaLinkedin />
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] text-xs hover:bg-[#1DA1F2] hover:text-white transition-all">
                          <FaTwitter />
                        </a>
                      )}
                    </div>
                  )}

                  {member.cv?.asset?.url && (
                    <a href={member.cv.asset.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs font-medium hover:underline"
                      style={{ color: primaryColor }}>
                      <BsDownload size={12} /> Download CV
                    </a>
                  )}

                  <Link href={`/about/team/${member.slug?.current}`}
                    className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium hover:underline"
                    style={{ color: primaryColor }}>
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-8">
              <p className="text-lg font-medium" style={{ color: 'var(--text-heading)' }}>Team members coming soon.</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>We're building our dream team.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}