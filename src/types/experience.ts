export interface Experience {
  id: number

  title: string

  slug: string

  // Taxonomies

  experienceType: number[]

  region: number[]

  // Hero

  heroTitle: string

  heroSubtitle: string

  heroImage: any | null

  // Core Details

  shortDescription: string

  experienceOverview: string

  typicalDuration: string

  bestTime: string

  location: string

  activityLevel: string

  // Information

  whatToExpect: string

  whoIsItFor: string

  experienceHighlights: string

  importantInformation: string

  faqContent: string

  // Relationships

  destinations: number[]

  relatedTours: number[]

  featuredExperience: boolean

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

  breadcrumbLabel: string
}
