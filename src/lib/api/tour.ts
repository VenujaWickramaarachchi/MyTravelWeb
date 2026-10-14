import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformAccommodation } from '../transformers/accommodation'
import { transformItinerary } from '../transformers/itinerary'
import { transformItineraryDay } from '../transformers/itinerary-day'
import { transformTour } from '../transformers/tour'
import { transformTestimonial } from '../transformers/testimonials'

import { ItineraryDay } from '@/types/itinerary-day'
import { Testimonial } from '@/types/testimonials'

import { TourItineraryDay } from '@/types/pages/tour-itinerary-day'
import { TourPage } from '@/types/pages/tour-page'


export interface GetToursParams {
  page?: number
  perPage?: number
  region?: string
  tourType?: string
}

export interface PaginatedTours {
  tours: ReturnType<typeof transformTour>[]
  total: number
  totalPages: number
  currentPage: number

}export async function getTours({
  page = 1,
  perPage = 12,
  region,
  tourType,
}: GetToursParams = {}): Promise<PaginatedTours> {
  const params = new URLSearchParams({
    _embed: '',
    page: String(page),
    per_page: String(perPage),
  })

  if (region) {
    params.set('region', region)
  }

  if (tourType) {
    params.set('tour-type', tourType)
  }

  const response = await fetchAPI(
    `tour?${params.toString()}`,
    {
      returnResponse: true,
    },
  )

  return {
    tours: Array.isArray(response?.data)
      ? response.data.map(transformTour)
      : [],
    total: Number(response?.headers?.get?.('X-WP-Total') || 0),
    totalPages: Number(
      response?.headers?.get?.('X-WP-TotalPages') || 0,
    ),
    currentPage: page,
  }
}

export async function getTour(slug: string): Promise<TourPage | null> {
  try {
    const data = await fetchAPI(`tour?slug=${slug}&_embed`)
    const tour = Array.isArray(data) ? data[0] : null

    if (!tour) {
      return null
    }

    const tourData = transformTour(tour)

  // Relationship IDs from ACF
  const destinationIds = tour.acf?.destinations || []

  const experienceIds = tour.acf?.experiences || []

  const accommodationIds = tour.acf?.accommodations || []

  const testimonialResponse = await fetchAPI('testimonials?_embed')

  const testimonials: Testimonial[] = testimonialResponse
    .map(transformTestimonial)
    .filter((testimonial: Testimonial) => testimonial.relatedTour === tour.id)

  const itineraryId = tour.acf?.itinerary || null

  const itineraryDayIds = tour.acf?.itinerary_days || []

  // Fetch related content
  const [destinations, experiences, accommodations, itinerary, itineraryDays] =
    await Promise.all([
      fetchByIds('destination', destinationIds).then((items) =>
        items.map(transformDestination),
      ),

      fetchByIds('experience', experienceIds).then((items) =>
        items.map(transformExperience),
      ),

      fetchByIds('accommodation', accommodationIds).then((items) =>
        items.map(transformAccommodation),
      ),

      itineraryId
        ? fetchByIds('itinerary', [itineraryId]).then((items) =>
          items.length > 0 ? transformItinerary(items[0]) : null,
        )
        : Promise.resolve(null),

      fetchByIds('itinerary-days', itineraryDayIds).then(async (items) => {
        const days: ItineraryDay[] = items
          .map(transformItineraryDay)
          .sort(
            (a: ItineraryDay, b: ItineraryDay) =>
              (a.dayNumber ?? Number.MAX_SAFE_INTEGER) -
              (b.dayNumber ?? Number.MAX_SAFE_INTEGER),
          )

        const connectedDays = await Promise.all(
          days.map(async (day) => {
            const placesVisited = await fetchByIds(
              'destination',
              day.placesVisited,
            )

            const experiences = await fetchByIds('experience', day.experiences)

            const accommodation = day.accommodation
              ? await fetchByIds('accommodation', [day.accommodation])
              : []

            return {
              ...day,

              relationships: {
                placesVisited: placesVisited.map(transformDestination),

                experiences: experiences.map(transformExperience),

                accommodation:
                  accommodation.length > 0
                    ? transformAccommodation(accommodation[0])
                    : null,
              },
            } satisfies TourItineraryDay
          }),
        )

        return connectedDays
      }),
    ])

  return {
    ...tourData,

    relationships: {
      destinations,
      experiences,
      accommodations,
      itinerary,
      itineraryDays,
      testimonials,
    },
  }
} catch (error) {
  console.warn(`[getTour] Error fetching tour ${slug}:`, error)
  return null
}
}
