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
}
