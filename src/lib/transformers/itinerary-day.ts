import { MediaImage } from '@/types/media-image'

function normalizeDayImage(image: any): MediaImage | null {
  if (!image || typeof image !== 'object') {
    return null
  }

  const id = Number(image.id ?? image.ID ?? 0)
  const url = image.url ?? ''

  if (!id || !url) {
    return null
  }

  return {
    id,
    url,
    alt: image.alt ?? '',
    width: image.width ? Number(image.width) : null,
    height: image.height ? Number(image.height) : null,
    title: image.title ?? '',
  }
}

export function transformItineraryDay(day: any) {
  return {
    id: day.id,
    title: day.title?.rendered || '',
    slug: day.slug || '',

    // Relationship
    tour: day.acf?.tour || null,
    itinerary: day.acf?.itinerary || null,

    // Day information
    dayNumber: day.acf?.day_number || null,
    dayTitle: day.acf?.day_title || '',
    dayDescription: day.acf?.day_description || '',

    // Journey
    startingLocation: day.acf?.starting_location || '',
    endingLocation: day.acf?.ending_location || '',
    distance: day.acf?.distance || null,
    distanceUnit: day.acf?.distance_unit || '',
    drivingTime: day.acf?.driving_time || '',
    departureTime: day.acf?.departure_time || '',
    arrivalTime: day.acf?.arrival_time || '',

    // Places & experiences
    placesVisited: day.acf?.places_visited || [],
    experiences: day.acf?.experiences || [],

    // Activities & highlights
    activities: day.acf?.activities || '',
    dayHighlights: day.acf?.day_highlights || '',

    // Cost
    dayCost: day.acf?.day_cost || null,
    currency: day.acf?.currency || 'USD',

    // Meals & accommodation
    meals: day.acf?.meals || [],
    accommodation: day.acf?.accommodation || null,

    // Images
    dayImage1: normalizeDayImage(day.acf?.day_image_1),

    dayImage2: normalizeDayImage(day.acf?.day_image_2),
  }
}
