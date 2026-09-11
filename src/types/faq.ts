export interface FAQ {
  id: number
  title: string
  slug: string

  // Taxonomy
  faqCategory: number[]


  question: string
  answer: string
  relatedTour: number | null
  relatedDestination: number | null
  relatedExperience: number | null

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
