'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser, HiOutlineLocationMarker } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'

interface QuoteFormProps {
  primaryColor?: string
}

export default function QuoteForm({ primaryColor = '#F59E0B' }: QuoteFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    projectType: '',
    location: '',
    budget: '',
    timeline: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({
        name: '', email: '', phone: '', service: '', projectType: '',
        location: '', budget: '', timeline: '', message: '',
      })
      setStep(1)
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || 'Failed to send request')
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <form onSubmit={handleSubmit}>
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                s <= step ? 'text-black' : 'bg-white/[0.03] border border-white/10 text-gray-500'
              }`}
              style={s <= step ? { backgroundColor: primaryColor } : {}}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 3 && <div className={`flex-1 h-px ${s < step ? 'bg-amber-500' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
          <div className="relative">
            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors" />
          </div>
          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors" />
          </div>
          <div className="relative">
            <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors" />
          </div>
          <button type="button" onClick={nextStep} className="w-full py-4 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] text-black" style={{ backgroundColor: primaryColor }}>
            Next Step →
          </button>
        </motion.div>
      )}

      {/* Step 2: Project Details */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
          <select name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors">
            <option value="" className="bg-[#1A1A1A]">Select Service</option>
            <option value="Residential Construction" className="bg-[#1A1A1A]">Residential Construction</option>
            <option value="Commercial Construction" className="bg-[#1A1A1A]">Commercial Construction</option>
            <option value="Design & Build" className="bg-[#1A1A1A]">Design & Build</option>
            <option value="Architectural Plans" className="bg-[#1A1A1A]">Architectural Plans</option>
            <option value="Renovation" className="bg-[#1A1A1A]">Renovation</option>
            <option value="Interior Design" className="bg-[#1A1A1A]">Interior Design</option>
            <option value="Other" className="bg-[#1A1A1A]">Other</option>
          </select>
          <div className="relative">
            <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" name="location" placeholder="Project Location" value={formData.location} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors" />
          </div>
          <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors">
            <option value="" className="bg-[#1A1A1A]">Budget Range (Optional)</option>
            <option value="Under $10,000" className="bg-[#1A1A1A]">Under $10,000</option>
            <option value="$10,000 - $50,000" className="bg-[#1A1A1A]">$10,000 - $50,000</option>
            <option value="$50,000 - $100,000" className="bg-[#1A1A1A]">$50,000 - $100,000</option>
            <option value="$100,000+" className="bg-[#1A1A1A]">$100,000+</option>
          </select>
          <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full px-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors">
            <option value="" className="bg-[#1A1A1A]">Timeline (Optional)</option>
            <option value="1-3 months" className="bg-[#1A1A1A]">1-3 months</option>
            <option value="3-6 months" className="bg-[#1A1A1A]">3-6 months</option>
            <option value="6-12 months" className="bg-[#1A1A1A]">6-12 months</option>
            <option value="12+ months" className="bg-[#1A1A1A]">12+ months</option>
          </select>
          <div className="flex gap-3">
            <button type="button" onClick={prevStep} className="flex-1 py-4 rounded-xl font-medium text-sm border border-white/10 text-white hover:bg-white/10 transition-all">← Back</button>
            <button type="button" onClick={nextStep} className="flex-1 py-4 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] text-black" style={{ backgroundColor: primaryColor }}>Next Step →</button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Message & Submit */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <h3 className="text-lg font-semibold text-white mb-4">Additional Details</h3>
          <textarea name="message" placeholder="Describe your project, requirements, or any questions..." value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors resize-none" />
          <div className="flex gap-3">
            <button type="button" onClick={prevStep} className="flex-1 py-4 rounded-xl font-medium text-sm border border-white/10 text-white hover:bg-white/10 transition-all">← Back</button>
            <button type="submit" disabled={status === 'loading'} className="flex-1 py-4 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-black" style={{ backgroundColor: primaryColor }}>
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
                  <FiSend /> Submit Request
                </>
              )}
            </button>
          </div>
          {status === 'success' && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 text-sm text-center">Quote request sent! We'll get back to you soon.</motion.p>
          )}
          {status === 'error' && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm text-center">{errorMessage}</motion.p>
          )}
        </motion.div>
      )}
    </form>
  )
}