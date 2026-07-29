'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import { urlFor } from '@/lib/sanity.image'
import { HiPhotograph, HiVideoCamera, HiPlay, HiX } from 'react-icons/hi'

interface GalleryContentProps {
  photos: any[]
  videos: any[]
  primaryColor: string
}

export default function GalleryContent({ photos, videos, primaryColor }: GalleryContentProps) {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      {/* Tab Switcher */}
      <section className="section-white pb-8">
        <Container>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'photos'
                  ? 'text-white shadow-lg'
                  : 'bg-gray-light text-navy border border-gray-200 hover:shadow-md'
              }`}
              style={activeTab === 'photos' ? { backgroundColor: primaryColor } : {}}
            >
              <HiPhotograph className="text-lg" />
              Photos ({photos.length})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'text-white shadow-lg'
                  : 'bg-gray-light text-navy border border-gray-200 hover:shadow-md'
              }`}
              style={activeTab === 'videos' ? { backgroundColor: primaryColor } : {}}
            >
              <HiVideoCamera className="text-lg" />
              Videos ({videos.length})
            </button>
          </div>
        </Container>
      </section>

      {/* Photos Grid */}
      <AnimatePresence mode="wait">
        {activeTab === 'photos' && (
          <motion.section
            key="photos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="section-white pb-24"
          >
            <Container>
              {photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo: any, index: number) => (
                    <motion.div
                      key={photo.title + index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
                      onClick={() => setSelectedImage(urlFor(photo.image).width(1200).url())}
                    >
                      <img
                        src={urlFor(photo.image).width(400).height(400).url()}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <HiPhotograph className="text-5xl mx-auto mb-4 text-muted" />
                  <p className="text-charcoal text-lg font-medium">No photos yet</p>
                  <p className="text-muted text-sm mt-1">Add photos in Sanity Studio.</p>
                </div>
              )}
            </Container>
          </motion.section>
        )}

        {/* Videos Grid */}
        {activeTab === 'videos' && (
          <motion.section
            key="videos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="section-white pb-24"
          >
            <Container>
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video: any, index: number) => {
                    const videoId = video.videoUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([^&\s]+)/)?.[1]
                    const isYouTube = video.videoUrl?.includes('youtube') || video.videoUrl?.includes('youtu.be')
                    const embedUrl = isYouTube
                      ? `https://www.youtube.com/embed/${videoId}`
                      : `https://player.vimeo.com/video/${videoId}`

                    return (
                      <motion.div
                        key={video.title + index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-2xl overflow-hidden shadow-sm border border-gray-200"
                      >
                        <div className="aspect-video">
                          {videoId ? (
                            <iframe
                              src={embedUrl}
                              className="w-full h-full"
                              allowFullScreen
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-light flex items-center justify-center">
                              <HiPlay className="text-4xl text-muted" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="text-navy font-semibold text-sm">{video.title}</p>
                          {video.category && (
                            <span className="text-xs text-muted">{video.category}</span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <HiVideoCamera className="text-5xl mx-auto mb-4 text-muted" />
                  <p className="text-charcoal text-lg font-medium">No videos yet</p>
                  <p className="text-muted text-sm mt-1">Add videos in Sanity Studio.</p>
                </div>
              )}
            </Container>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-navy/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <HiX className="text-2xl" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt=""
              className="max-w-full max-h-[90vh] rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}