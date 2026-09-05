export interface FAQ {
  id: number
  title: string
  slug: string
  question: string
  answer: string
  relatedTour: number | null
  relatedDestination: number | null
  relatedExperience: number | null
}
