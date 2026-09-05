import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryDestinations({ itinerary }: Props) {
  const destinations = itinerary.relationships.destinations

  if (destinations.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Destinations</h2>

      <div>
        {destinations.map((destination) => (
          <article key={destination.id}>
            <h3>{destination.title}</h3>

            {destination.description && <p>{destination.description}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
