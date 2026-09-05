import { MediaImage } from './media-image'

export interface TravelGuide {
  id: number
  title: string
  slug: string

  // Taxonomy
  travelGuideTopic: number[]

  // Guide Information
  shortDescription: string
  heroTitle: string
  heroSubtitle: string
  heroImage: any | null
  galleryImages: MediaImage[]
  guideIntroduction: string
  quickAnswer: string
  keyInformation: string
  mainContent: string

  // Relationships
  relatedDestinations: number[]
  relatedExperiences: number[]
  relatedTours: number[]
  relatedItineraries: number[]

  // Additional Information
  faqContent: string
  authorExpert: string
  lastReviewed: string

  // SEO
  seoTitle: string
  metaDescription: string
  canonicalUrl: string
  noIndex: boolean
  ogTitle: string
  ogDescription: string
  socialImage: any | null

  // Search / AEO
  primarySearchTopic: string
  secondarySearchTopics: string
  searchIntent: string
  aeoPrimaryQuestion: string
  aeoDirectAnswer: string
  aeoSupportingQuestions: string
  featuredAnswer: string
  breadcrumbLabel: string
}
