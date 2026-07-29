'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'

interface ContactFormProps {
  primaryColor?: string
}

export default function ContactForm({ primaryColor = '#E65100' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || 'Failed to send message')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: `${primaryColor}10` }}>
          <HiOutlineUser className="text-sm" style={{ color: primaryColor }} />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-navy placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-300"
        />
      </div>

      {/* Email */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: `${primaryColor}10` }}>
          <HiOutlineMail className="text-sm" style={{ color: primaryColor }} />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-navy placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-300"
        />
      </div>

      {/* Phone */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: `${primaryColor}10` }}>
          <HiOutlinePhone className="text-sm" style={{ color: primaryColor }} />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-navy placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-300"
        />
      </div>

      {/* Subject */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: `${primaryColor}10` }}>
          <svg className="w-3.5 h-3.5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-navy placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-300"
        />
      </div>

      {/* Message */}
      <div className="relative group">
        <div className="absolute left-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: `${primaryColor}10` }}>
          <svg className="w-3.5 h-3.5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <textarea
          name="message"
          placeholder="Tell us about your project or inquiry..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-navy placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all duration-300 resize-none"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-sm"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          <>
            <FiSend className="text-base" />
            Send Message
          </>
        )}
      </motion.button>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm text-center font-medium"
        >
          ✅ Message sent successfully! We'll get back to you within 24 hours.
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center font-medium"
        >
          ❌ {errorMessage}
        </motion.div>
      )}
    </form>
  )
}