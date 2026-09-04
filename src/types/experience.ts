import { MediaImage } from './media-image'

export interface Experience {
  id: number
  title: string
  slug: string

  // Taxonomies
  experienceType: number[]
  region: number[]

  // Experience Information
  shortDescription: string
  heroTitle: string
  heroSubtitle: string
  heroImage: any | null
  galleryImages: MediaImage[]
  experienceOverview: string
  typicalDuration: string
  bestTime: string
  location: string
  whatToExpect: string
  whoIsItFor: string
  activityLevel: string
  experienceHighlights: string

  // Relationships
  destinations: number[]
  relatedTours: number[]

  // Additional information
  importantInformation: string
  faqContent: string
  featuredExperience: boolean

  // SEO / AEO
  seoTitle: string
  metaDescription: string
  canonicalUrl: string
  noIndex: boolean
  ogTitle: string
  ogDescription: string
  socialImage: any | null

  primarySearchTopic: string
  secondarySearchTopics: string
  searchIntent: string

  aeoPrimaryQuestion: string
  aeoDirectAnswer: string
  aeoSupportingQuestions: string
  featuredAnswer: string
  breadcrumbLabel: string
}
