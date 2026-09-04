import { notFound } from 'next/navigation'
import { getTravelGuide } from '@/lib/wordpress'

interface TravelGuidePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TravelGuidePage({
  params,
}: TravelGuidePageProps) {
  const { slug } = await params

  const travelGuide = await getTravelGuide(slug)

  if (!travelGuide) {
    notFound()
  }

  return (
    <main>
      <h1>{travelGuide.title}</h1>

      <p>{travelGuide.shortDescription}</p>

      <h2>Hero</h2>

      <p>{travelGuide.heroTitle || 'No hero title'}</p>

      <p>{travelGuide.heroSubtitle || 'No hero subtitle'}</p>

      <h2>Quick Answer</h2>

      <p>{travelGuide.quickAnswer || 'No quick answer'}</p>

      <h2>Key Information</h2>

      <p>{travelGuide.keyInformation || 'No key information'}</p>

      <h2>Related Destinations</h2>

      {travelGuide.relationships.relatedDestinations.length > 0 ? (
        <ul>
          {travelGuide.relationships.relatedDestinations.map((destination) => (
            <li key={destination.id}>{destination.title}</li>
          ))}
        </ul>
      ) : (
        <p>No related destinations linked.</p>
      )}

      <h2>Related Experiences</h2>

      {travelGuide.relationships.relatedExperiences.length > 0 ? (
        <ul>
          {travelGuide.relationships.relatedExperiences.map((experience) => (
            <li key={experience.id}>{experience.title}</li>
          ))}
        </ul>
      ) : (
        <p>No related experiences linked.</p>
      )}

      <h2>Related Tours</h2>

      {travelGuide.relationships.relatedTours.length > 0 ? (
        <ul>
          {travelGuide.relationships.relatedTours.map((tour) => (
            <li key={tour.id}>{tour.title}</li>
          ))}
        </ul>
      ) : (
        <p>No related tours linked.</p>
      )}

      <h2>Related Itineraries</h2>

      {travelGuide.relationships.relatedItineraries.length > 0 ? (
        <ul>
          {travelGuide.relationships.relatedItineraries.map((itinerary) => (
            <li key={itinerary.id}>{itinerary.title}</li>
          ))}
        </ul>
      ) : (
        <p>No related itineraries linked.</p>
      )}

      <h2>Author / Expert</h2>

      <p>{travelGuide.authorExpert || 'Not available'}</p>

      <h2>Last Reviewed</h2>

      <p>{travelGuide.lastReviewed || 'Not available'}</p>
    </main>
  )
}
