export interface ItineraryDay {
  id: number
  title: string
  slug: string

  // Relationship
  tour: number | null

  // Day information
  dayNumber: number | null
  dayTitle: string
  dayDescription: string

  // Journey
  startingLocation: string
  endingLocation: string
  distance: number | null
  distanceUnit: string
  drivingTime: string
  departureTime: string
  arrivalTime: string

  // Places & experiences
  placesVisited: number[]
  experiences: number[]

  // Activities & highlights
  activities: string
  dayHighlights: string

  // Cost
  dayCost: number | null
  currency: string

  // Meals & accommodation
  meals: string[]
  accommodation: number | null

  // Images
  dayImage1: any | null
  dayImage2: any | null
}
