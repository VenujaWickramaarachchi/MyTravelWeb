import { getItinerary } from '@/lib/wordpress'

import ItineraryDayCard from '@/components/entities/ItineraryDay/ItineraryDayCard'

import ItineraryHero from '@/components/Itineraries/ItineraryHero'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params

  const itinerary = await getItinerary(slug)

  if (!itinerary) {
    return <div>Itinerary not found</div>
  }

  return (
    <main>
      <ItineraryHero itinerary={itinerary} />

      <h2>Route</h2>
      <p>{itinerary.route}</p>

      <h2>Starting Location</h2>
      <p>{itinerary.startingLocation}</p>

      <h2>Ending Location</h2>
      <p>{itinerary.endingLocation}</p>

      <hr />

      <h2>Destinations</h2>

      {itinerary.relationships.destinations.map((destination) => (
        <div key={destination.id}>
          <h3>{destination.title}</h3>
        </div>
      ))}

      <h2>Experiences</h2>

      {itinerary.relationships.experiences.map((experience) => (
        <div key={experience.id}>
          <h3>{experience.title}</h3>
        </div>
      ))}

      <h2>Related Tours</h2>

      {itinerary.relationships.relatedTours.map((tour) => (
        <div key={tour.id}>
          <h3>{tour.title}</h3>
        </div>
      ))}

      <h2>Accommodation Suggestions</h2>

      {itinerary.relationships.accommodationSuggestions.map((accommodation) => (
        <div key={accommodation.id}>
          <h3>{accommodation.title}</h3>
        </div>
      ))}
      <hr />

      <h2>Itinerary Days</h2>

      {itinerary.relationships.itineraryDays.map((day) => (
        <ItineraryDayCard key={day.id} day={day} />
      ))}
    </main>
  )
}
