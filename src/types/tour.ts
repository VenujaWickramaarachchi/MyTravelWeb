export interface Tour {
  id: number
  title: string
  slug: string

  // Taxonomies
  tourType: number[]
  region: number[]

  // Hero
  heroTitle: string
  heroSubtitle: string
  heroImage: any | null

  // Core Details
  shortDescription: string
  durationDays: number | null
  durationNights: number | null
  priceFrom: number | null
  currency: string
  priceDescription: string
  groupSize: string
  tourStyle: string
  bestTimeToTravel: string

  // Content
  tourOverview: string
  tourHighlights: string
  inclusions: string
  exclusions: string
  faqContent: string

  // Relationships
  destinations: number[]
  experiences: number[]
  itinerary: number | null
  itineraryDays: number[]
  accommodations: number[]

  featuredTour: boolean

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
