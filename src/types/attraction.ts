import { MediaImage } from './media-image'

export interface Attraction {
  id: number
  title: string
  slug: string

  // Taxonomies
  attractionType: number[]
  region: number[]

  // Attraction Information
  shortDescription: string
  heroTitle: string
  heroSubtitle: string
  heroImage: any | null
  attractionOverview: string
  location: string
  whatToSee: string
  attractionHighlights: string
  typicalVisitDuration: string
  bestTime: string

  // Relationships
  destination: number | null
  relatedExperiences: number[]
  nearbyAttractions: number[]
  relatedTours: number[]
  galleryImages: MediaImage[]

  // Additional information
  importantInformation: string
  faqContent: string

  // SEO

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

  // AEO

  aeoPrimaryQuestion: string

  aeoDirectAnswer: string

  aeoSupportingQuestions: string

  featuredAnswer: string

  // Breadcrumb

  breadcrumbLabel: string
}
