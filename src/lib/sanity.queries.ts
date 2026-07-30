import { groq } from 'next-sanity'

// Site Settings
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    logo {
      asset->{
        _id,
        url
      }
    },
    logoDark {
      asset->{
        _id,
        url
      }
    },
    favicon {
      asset->{
        _id,
        url
      }
    },
    primaryColor,
    secondaryColor,
    contactEmail,
    contactPhone,
    whatsappNumber,
    contactAddress,
    googleMapsUrl,
    socialLinks,
    footerText
  }
`

// Navigation
export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"][0] {
    items[] {
      label,
      href,
      isButton
    }
  }
`

// Home Page
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    sections[] {
      _type,
      _type == 'reference' => @-> {
        _type,
        headline,
        subheadline,
        backgroundImage,
        ctaButtons[] {
          label,
          href,
          variant
        }
      },
      // Stats counter
      _type == 'statsCounter' => {
        stats[] {
          number,
          label
        }
      },
      // Services overview
      _type == 'servicesOverview' => {
        heading,
        subheading
      },
      // Featured projects
      _type == 'featuredProjects' => {
        heading,
        subheading
      },
      // Testimonials
      _type == 'testimonialsCarousel' => {
        heading
      },
      // CTA Banner
      _type == 'ctaBanner' => {
        heading,
        text,
        buttonLabel,
        buttonHref
      }
    }
  }
`

// Services
export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    title,
    slug,
    icon,
    shortDescription,
    image,
    category
  }
`

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    title,
    shortDescription,
    fullDescription,
    image,
    category
  }
`

// Projects
export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc) {
    title,
    slug,
    category,
    location,
    completionDate,
    coverImage,
    featured
  }
`

export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    title,
    slug,
    category,
    coverImage
  }
`

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    category,
    location,
    completionDate,
    description,
    coverImage,
    photoGallery[] {
      asset->,
      alt,
      caption
    },
    videoGallery[] {
      title,
      url,
      thumbnail
    },
    beforeAfter[] {
      beforeImage,
      afterImage,
      label
    },
    stats,
    testimonial-> {
      clientName,
      clientRole,
      review,
      rating
    }
  }
`

// Testimonials
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] {
    clientName,
    clientPhoto,
    clientRole,
    review,
    rating,
    project-> {
      title,
      slug
    }
  }
`

// Architectural Plans
export const PLANS_QUERY = groq`
  *[_type == "architecturalPlan"] {
    title,
    slug,
    category,
    previewImage,
    specs
  }
`

export const PLAN_BY_SLUG_QUERY = groq`
  *[_type == "architecturalPlan" && slug.current == $slug][0] {
    title,
    category,
    previewImage,
    gallery[] {
      asset->
    },
    description,
    specs,
    downloadablePdf
  }
`

// Team Members — for about page cards
export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    name,
    slug,
    role,
    photo {
      asset->{
        _id,
        url
      }
    },
    bio,
    email,
    phone,
    expertise,
    socialLinks,
    cv {
      asset->{
        _id,
        url
      }
    },
    order
  }
`

// Team Member Detail — for individual profile page
export const TEAM_MEMBER_BY_SLUG_QUERY = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    name,
    slug,
    role,
    photo {
      asset->{
        _id,
        url
      }
    },
    bio,
    fullBio,
    email,
    phone,
    expertise,
    socialLinks,
    cv {
      asset->{
        _id,
        url
      }
    },
    cvContent
  }
`

// Gallery
export const GALLERY_PHOTOS_QUERY = groq`
  *[_type == "galleryItem" && type == "photo"] | order(order asc) {
    title,
    image {
      asset->{
        _id,
        url
      }
    },
    category,
    featured
  }
`

export const GALLERY_VIDEOS_QUERY = groq`
  *[_type == "galleryItem" && type == "video"] | order(order asc) {
    title,
    videoSource,
    videoFile {
      asset->{
        _id,
        url
      }
    },
    videoUrl,
    thumbnail {
      asset->{
        _id,
        url
      }
    },
    category,
    featured
  }
`

export const FEATURED_GALLERY_QUERY = groq`
  *[_type == "galleryItem" && featured == true] | order(order asc) [0...6] {
    title,
    type,
    image {
      asset->{
        _id,
        url
      }
    },
    videoSource,
    videoFile {
      asset->{
        _id,
        url
      }
    },
    videoUrl,
    thumbnail {
      asset->{
        _id,
        url
      }
    },
    category
  }
`