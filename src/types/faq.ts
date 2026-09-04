export interface FAQ {
  id: number
  title: string
  slug: string

  // Taxonomy
  faqCategory: number[]

  // FAQ Information
  question: string
  answer: string

  // Relationships
  relatedTour: number | null
  relatedDestination: number | null
  relatedExperience: number | null
}
