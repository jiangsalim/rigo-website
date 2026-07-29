'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/shared/SectionHeading'
import { urlFor } from '@/lib/sanity.image'
import { HiArrowRight, HiPlay } from 'react-icons/hi'

interface GalleryItem {
  title: string
  type: 'photo' | 'video'
  image?: any
  videoUrl?: string
  category?: string
}

interface GalleryPreviewProps {
  items?: GalleryItem[]
  primaryColor?: string
}

export default function GalleryPreview({ items = [], primaryColor = '#E65100' }: GalleryPreviewProps) {
  if (!items.length) return null

  return (
    <section className="section-white py-16 md:py-20">
      <Container>
        <div className="flex flex-col sm:flex-row items-end justify-between mb-12">
          <div className="flex-1">
            <SectionHeading
              heading="Our Gallery"
              subheading="See Our Work"
              accentColor={primaryColor}
            />
          </div>
          <Link
            href="/gallery"
            className="btn-secondary text-sm whitespace-nowrap mb-6 sm:mb-0 border-navy text-navy hover:bg-navy hover:text-white"
          >
            View Full Gallery →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Link href="/gallery" className="block aspect-square md:aspect-auto md:h-full">
                {item.type === 'photo' && item.image ? (
                  <img
                    src={urlFor(item.image).width(600).height(600).url()}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-light flex items-center justify-center">
                    <HiPlay className="text-4xl text-white" style={{ color: primaryColor }} />
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/80 mb-1 block">
                      {item.category}
                    </span>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
                {/* Play button for videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <HiPlay className="text-xl ml-1" style={{ color: primaryColor }} />
                    </div>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}