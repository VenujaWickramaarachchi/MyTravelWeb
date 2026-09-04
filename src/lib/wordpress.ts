import { transformAccommodation } from './transformers/accommodation'
import { transformDestination } from './transformers/destination'
import { transformExperience } from './transformers/experience'
import { transformTour } from './transformers/tour'
import { transformAttraction } from './transformers/attraction'
import { transformItinerary } from './transformers/itinerary'
import { transformItineraryDay } from './transformers/itinerary-day'
import { transformTravelGuide } from './transformers/travel-guide'
import { transformFAQ } from './transformers/faq'
import { transformPartner } from './transformers/partner'
import { transformTeamMember } from './transformers/team-member'
import { transformTestimonial } from './transformers/testimonials'
import { transformTrustAward } from './transformers/trust-award'

import { ItineraryDay } from '@/types/itinerary-day'
import { Accommodation } from '@/types/accommodation'
import { Experience } from '@/types/experience'
import { Attraction } from '@/types/attraction'
import { TravelGuide } from '@/types/travel-guide'
import { FAQ } from '@/types/faq'
import { Partner } from '@/types/partner'
import { TeamMember } from '@/types/team-member'
import { Testimonial } from '@/types/testimonials'
import { TrustAward } from '@/types/trust-award'

import { DestinationPage } from '@/types/pages/destination-page'
import { TourPage } from '@/types/pages/tour-page'
import { AccommodationPage } from '@/types/pages/accommodation-page'
import { ExperiencePage } from '@/types/pages/experience-page'
import { AttractionPage } from '@/types/pages/attraction-page'
import { TravelGuidePage } from '@/types/pages/travel-guide-page'
import { FAQPage } from '@/types/pages/faq-page'

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

// Generic fetch function
async function fetchAPI(endpoint: string) {
  const res = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching ${endpoint}`)
  }

  return res.json()
}
async function fetchByIds(endpoint: string, ids: number[]) {
  if (!ids || ids.length === 0) {
    return []
  }

  return fetchAPI(`${endpoint}?include=${ids.join(',')}&_embed`)
}

// Fetching Components
// ----------------------------------------------------------------------------
// Destinations

export async function getDestinations() {
  return fetchAPI('destination?per_page=100&_embed')
}
// Single Destination

export async function getDestination(
  slug: string,
): Promise<DestinationPage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/destination?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  const data = await res.json()

  const destination = data[0]

  if (!destination) {
    return null
  }

  // Fetch relationships

  const accommodationIds = destination.acf?.featured_accommodations || []

  const nearbyIds = destination.acf?.nearby_destinations || []

  const tourIds = destination.acf?.related_tours || []

  const experienceIds = destination.acf?.experiences || []

  const mainAttractionsId = destination.acf?.main_attractions || []

  const [
    accommodations,
    nearbyDestinations,
    relatedTours,
    experiences,
    mainAttractions,
  ] = await Promise.all([
    fetchByIds('accommodation', accommodationIds).then((items) =>
      items.map(transformAccommodation),
    ),

    fetchByIds('destination', nearbyIds).then((destinations) =>
      destinations.map(transformDestination),
    ),

    fetchByIds('tour', tourIds).then((items) => items.map(transformTour)),

    fetchByIds('experience', experienceIds).then((items) =>
      items.map(transformExperience),
    ),
    fetchByIds('attraction', mainAttractionsId).then((items) =>
      items.map(transformAttraction),
    ),
  ])

  return {
    ...transformDestination(destination),

    relationships: {
      accommodations,

      nearbyDestinations,

      relatedTours,

      experiences,
      mainAttractions,
    },
  }
}
// -------------------------------------------------------------------
// Tours
// ================================================================
// Tours
export async function getTours() {
  return fetchAPI('tour?_embed')
}

export async function getTour(slug: string): Promise<TourPage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/tour?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching tour: ${slug}`)
  }

  const data = await res.json()
  const tour = data[0]

  if (!tour) {
    return null
  }

  // Get relationship IDs from ACF
  const destinationIds = tour.acf?.destinations || []
  const experienceIds = tour.acf?.experiences || []
  const accommodationIds = tour.acf?.accommodations || []

  const itineraryId = tour.acf?.itinerary || null
  const itineraryDayIds = tour.acf?.itinerary_days || []

  // Fetch all related content
  const [
    destinations,
    experiences,
    accommodations,
    itineraryItems,
    itineraryDays,
  ] = await Promise.all([
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

    fetchByIds('itinerary-days', itineraryDayIds).then((items) =>
      items
        .map(transformItineraryDay)
        .sort(
          (a: ItineraryDay, b: ItineraryDay) =>
            (a.dayNumber ?? Number.MAX_SAFE_INTEGER) -
            (b.dayNumber ?? Number.MAX_SAFE_INTEGER),
        ),
    ),
  ])

  return {
    ...transformTour(tour),

    relationships: {
      destinations,
      experiences,
      accommodations,
      itinerary: itineraryItems,
      itineraryDays,
    },
  }
}
// ----------------------------------------------------------------------
// Experiences
// ================================================================

export async function getExperiences(): Promise<Experience[]> {
  const experiences = await fetchAPI('experience?_embed')

  return experiences.map(transformExperience)
}

export async function getExperience(
  slug: string,
): Promise<ExperiencePage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/experience?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching experience: ${slug}`)
  }

  const data = await res.json()
  const experience = data[0]

  if (!experience) {
    return null
  }

  const experienceData = transformExperience(experience)

  const destinations = experienceData.destinations.length
    ? await fetchByIds('destination', experienceData.destinations).then(
        (items) => items.map(transformDestination),
      )
    : []

  const relatedTours = experienceData.relatedTours.length
    ? await fetchByIds('tour', experienceData.relatedTours).then((items) =>
        items.map(transformTour),
      )
    : []

  return {
    ...experienceData,
    relationships: {
      destinations,
      relatedTours,
    },
  }
}

// ---------------------------------------------------------
// Itineraries
// ================================================================
export async function getItineraries() {
  return fetchAPI('itinerary?_embed')
}
// ---------------------------------------------------------------
// Itinerary Days
// ================================================================
export async function getItineraryDays() {
  return fetchAPI('itinerary-days?_embed')
}
// ------------------------------------------------------------------
// FAQs
// ================================================================

export async function getFAQs(): Promise<FAQ[]> {
  const faqs = await fetchAPI('faq?_embed')

  return faqs.map(transformFAQ)
}

export async function getFAQ(slug: string): Promise<FAQPage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/faq?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching FAQ: ${slug}`)
  }

  const data = await res.json()
  const faq = data[0]

  if (!faq) {
    return null
  }

  const faqData = transformFAQ(faq)

  const relatedTour = faqData.relatedTour
    ? await fetchByIds('tour', [faqData.relatedTour]).then((items) =>
        items.length > 0 ? transformTour(items[0]) : null,
      )
    : null

  const relatedDestination = faqData.relatedDestination
    ? await fetchByIds('destination', [faqData.relatedDestination]).then(
        (items) => (items.length > 0 ? transformDestination(items[0]) : null),
      )
    : null

  const relatedExperience = faqData.relatedExperience
    ? await fetchByIds('experience', [faqData.relatedExperience]).then(
        (items) => (items.length > 0 ? transformExperience(items[0]) : null),
      )
    : null

  return {
    ...faqData,
    relationships: {
      relatedTour,
      relatedDestination,
      relatedExperience,
    },
  }
}
// -----------------------------------------------------------------
// Accommodations
// ================================================================

// Accommodations
export async function getAccommodations(): Promise<Accommodation[]> {
  const accommodations = await fetchAPI('accommodation?_embed')

  return accommodations.map(transformAccommodation)
}

export async function getAccommodation(
  slug: string,
): Promise<AccommodationPage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/accommodation?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching accommodation: ${slug}`)
  }

  const data = await res.json()
  const accommodation = data[0]

  if (!accommodation) {
    return null
  }

  const destinationId = accommodation.acf?.destination || null

  const destination = destinationId
    ? await fetchByIds('destination', [destinationId]).then((items) =>
        items.length > 0 ? transformDestination(items[0]) : null,
      )
    : null

  return {
    ...transformAccommodation(accommodation),

    relationships: {
      destination,
    },
  }
}

// --------------------------------------------------------------
// -----------------------------------------------------------------
// Attractions
// ================================================================
export async function getAttractions(): Promise<Attraction[]> {
  const attractions = await fetchAPI('attraction?_embed')

  return attractions.map(transformAttraction)
}

export async function getAttraction(
  slug: string,
): Promise<AttractionPage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/attraction?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching attraction: ${slug}`)
  }

  const data = await res.json()
  const attraction = data[0]

  if (!attraction) {
    return null
  }

  const attractionData = transformAttraction(attraction)

  // Destination
  const destinationId = Array.isArray(attractionData.destination)
    ? attractionData.destination[0]
    : null

  const destination = destinationId
    ? await fetchByIds('destination', [destinationId]).then((items) =>
        items.length > 0 ? transformDestination(items[0]) : null,
      )
    : null

  // Related Experiences
  const relatedExperiences = attractionData.relatedExperiences.length
    ? await fetchByIds('experience', attractionData.relatedExperiences).then(
        (items) => items.map(transformExperience),
      )
    : []

  // Nearby Attractions
  const nearbyAttractions = attractionData.nearbyAttractions.length
    ? await fetchByIds('attraction', attractionData.nearbyAttractions).then(
        (items) => items.map(transformAttraction),
      )
    : []

  // Related Tours
  const relatedTours = attractionData.relatedTours.length
    ? await fetchByIds('tour', attractionData.relatedTours).then((items) =>
        items.map(transformTour),
      )
    : []

  return {
    ...attractionData,
    relationships: {
      destination,
      relatedExperiences,
      nearbyAttractions,
      relatedTours,
    },
  }
}
// --------------------------------------------------------------

// -----------------------------------------------------------------
// Travel_GUide
// ================================================================
export async function getTravelGuides(): Promise<TravelGuide[]> {
  const travelGuides = await fetchAPI('travel-guide?_embed')

  return travelGuides.map(transformTravelGuide)
}

export async function getTravelGuide(
  slug: string,
): Promise<TravelGuidePage | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/travel-guide?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching travel guide: ${slug}`)
  }

  const data = await res.json()
  const travelGuide = data[0]

  if (!travelGuide) {
    return null
  }

  const travelGuideData = transformTravelGuide(travelGuide)

  // Related Destinations
  const relatedDestinations = travelGuideData.relatedDestinations.length
    ? await fetchByIds('destination', travelGuideData.relatedDestinations).then(
        (items) => items.map(transformDestination),
      )
    : []

  // Related Experiences
  const relatedExperiences = travelGuideData.relatedExperiences.length
    ? await fetchByIds('experience', travelGuideData.relatedExperiences).then(
        (items) => items.map(transformExperience),
      )
    : []

  // Related Tours
  const relatedTours = travelGuideData.relatedTours.length
    ? await fetchByIds('tour', travelGuideData.relatedTours).then((items) =>
        items.map(transformTour),
      )
    : []

  // Related Itineraries
  const relatedItineraries = travelGuideData.relatedItineraries.length
    ? await fetchByIds('itinerary', travelGuideData.relatedItineraries).then(
        (items) => items.map(transformItinerary),
      )
    : []

  return {
    ...travelGuideData,
    relationships: {
      relatedDestinations,
      relatedExperiences,
      relatedTours,
      relatedItineraries,
    },
  }
}
// --------------------------------------------------------------
// ---------------------------------------------------------
// Partner
// ================================================================
export async function getPartners(): Promise<Partner[]> {
  const partners = await fetchAPI('partner?_embed')

  return partners
    .map(transformPartner)
    .sort(
      (a: Partner, b: Partner) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}

export async function getPartner(slug: string): Promise<Partner | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/partner?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching partner: ${slug}`)
  }

  const data = await res.json()
  const partner = data[0]

  if (!partner) {
    return null
  }

  return transformPartner(partner)
}
// ---------------------------------------------------------------

// ---------------------------------------------------------
// TeamMember
// ================================================================
export async function getTeamMembers(): Promise<TeamMember[]> {
  const teamMembers = await fetchAPI('team-member?_embed')

  return teamMembers
    .map(transformTeamMember)
    .sort(
      (a: TeamMember, b: TeamMember) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}
export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/team-member?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching team member: ${slug}`)
  }

  const data = await res.json()
  const teamMember = data[0]

  if (!teamMember) {
    return null
  }

  return transformTeamMember(teamMember)
}
// ---------------------------------------------------------------

// ---------------------------------------------------------
// Testimonials
// ================================================================
export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await fetchAPI('testimonials?_embed')

  return testimonials.map(transformTestimonial)
}

export async function getTestimonialsForTour(
  tourId: number,
): Promise<Testimonial[]> {
  const testimonials = await getTestimonials()

  return testimonials.filter(
    (testimonial) => testimonial.relatedTour === tourId,
  )
}
// ---------------------------------------------------------------

// ---------------------------------------------------------
// Trust Awards

// ================================================================
export async function getTrustAwards(): Promise<TrustAward[]> {
  const trustAwards = await fetchAPI('trust_award?_embed')

  return trustAwards
    .map(transformTrustAward)
    .sort(
      (a: TrustAward, b: TrustAward) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}
// ---------------------------------------------------------------
