export interface Itinerary {
  id: number
  title: string
  slug: string

  // Content
  shortDescription: string
  heroTitle: string
  heroSubtitle: string
  heroImage: any | null
  itineraryOverview: string

  // Route
  startingLocation: string
  endingLocation: string
  route: string

  // Relationships
  destinations: number[]
  experiences: number[]

  // Additional information
  bestFor: string
  accommodationStyle: string
  transportation: string
  meals: string

  featuredItinerary: boolean

  // Relationships
  relatedTours: number[]
  accommodationSuggestions: number[]

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
