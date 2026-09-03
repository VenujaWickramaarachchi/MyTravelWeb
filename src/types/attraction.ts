export interface Attraction {
  id: number
  title: string
  slug: string

  // Taxonomies (Arrays of term IDs)
  attractionType: number[]
  region: number[]

  // Hero Section
  heroTitle: string
  heroSubtitle: string
  heroImage: {
    id: number
    url: string
    alt: string
  } | null

  // Core Details
  shortDescription: string
  attractionOverview: string
  location: string
  whatToSee: string
  attractionHighlights: string
  typicalVisitDuration: string
  bestTime: string
  importantInformation: string
  faqContent: string

  // Relationships & Connections (Arrays of post IDs)
  destination: number[]
  relatedExperiences: number[]
  nearbyAttractions: number[]
  relatedTours: number[]
}
