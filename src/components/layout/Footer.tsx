import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { HiOutlineMapPin } from 'react-icons/hi2'

interface FooterProps {
  footerText: string
  logo?: { asset?: { url?: string } } | null
  siteTitle?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
    youtube?: string
  }
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  primaryColor?: string
  quickLinks?: { label: string; href: string }[]
  services?: { label: string; href: string }[]
}

export default function Footer({
  footerText,
  logo,
  siteTitle = 'RIGO DESIGN & CONSTRUCTION',
  socialLinks,
  contactEmail,
  contactPhone,
  contactAddress,
  primaryColor = '#E65100',
  quickLinks,
  services,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const logoSrc = logo?.asset?.url || null

  const defaultQuickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Architectural Plans', href: '/architectural-plans' },
    { label: 'Contact', href: '/contact' },
  ]

  const defaultServices = [
    { label: 'Residential Construction', href: '/services' },
    { label: 'Commercial Construction', href: '/services' },
    { label: 'Design & Build', href: '/services' },
    { label: 'Architectural Plans', href: '/architectural-plans' },
    { label: 'Renovation', href: '/services' },
    { label: 'Interior Design', href: '/services' },
  ]

  const links = quickLinks || defaultQuickLinks
  const serviceLinks = services || defaultServices

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              {logoSrc ? (
                <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-white">
                  <Image
                    src={logoSrc}
                    alt={siteTitle}
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-heading font-bold flex-shrink-0"
                  style={{ backgroundColor: primaryColor }}
                >
                  R
                </div>
              )}
              <span className="text-white font-heading font-bold text-sm leading-tight">
                {siteTitle}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium construction and architectural design services. Building the future, one project at a time.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                  <FaFacebook size={14} />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                  <FaInstagram size={14} />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                  <FaLinkedin size={14} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                  <FaTwitter size={14} />
                </a>
              )}
              {socialLinks?.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                  <FaYoutube size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: primaryColor }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: primaryColor }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactAddress && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <HiOutlineMapPin
                    className="text-lg flex-shrink-0 mt-0.5"
                    style={{ color: primaryColor }}
                  />
                  <span>{contactAddress}</span>
                </li>
              )}
              {contactEmail && (
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <HiOutlineMail
                      className="text-lg flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <span>{contactEmail}</span>
                  </a>
                </li>
              )}
              {contactPhone && (
                <li>
                  <a
                    href={`tel:${contactPhone.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <HiOutlinePhone
                      className="text-lg flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <span>{contactPhone}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              {footerText?.replace('{year}', currentYear.toString()) || `© ${currentYear} ${siteTitle}. All rights reserved.`}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <span className="text-white/10">|</span>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">
                Terms & Conditions
              </Link>
              <span className="text-white/10">|</span>
              <Link href="/sitemap" className="text-gray-500 hover:text-white transition-colors text-sm">
                Sitemap
              </Link>
            </div>
            <p className="text-gray-500 text-sm text-center sm:text-right">
              Powered by{' '}
              <a
                href="https://herman-software-website.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-white transition-colors duration-300"
                style={{ color: primaryColor }}
              >
                Herman Software Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}