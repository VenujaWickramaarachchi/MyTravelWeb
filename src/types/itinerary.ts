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

  // Relationships
  relatedTours: number[]
  accommodationSuggestions: number[]
}
