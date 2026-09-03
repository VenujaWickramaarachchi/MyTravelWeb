export interface Destination {
  id: number

  title: string

  slug: string

  // Taxonomy

  region: number[]

  // Hero

  heroTitle: string

  heroSubTitle: string

  heroImage: any | null

  // Content

  description: string

  overview: string

  location: string

  bestTimetoVisit: string

  recommendedDuration: string

  destinationType: any[]

  mainAttractions: string

  thingsToDo: string

  travelTips: string

  faqContent: string

  howtoGetThere: string

  Weather: string

  // Map

  mapsEmbed: string

  mapsCoordinates: string

  locationAddress: string

  // Relationships

  experiences: number[]

  relatedTours: number[]

  featuredAccommodations: number[]

  nearbyDestinations: number[]

  featuredDestination: boolean

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
