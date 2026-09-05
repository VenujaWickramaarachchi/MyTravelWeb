import { Itinerary } from '@/types/itinerary'

interface Props {
  itineraries: Itinerary[]
}

export default function TravelGuideItineraries({ itineraries }: Props) {
  if (!itineraries.length) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'brown' }}>Related Itineraries</h2>

      <div>
        {itineraries.map((itinerary) => (
          <article key={itinerary.id}>
            <h3>{itinerary.title}</h3>

            {itinerary.shortDescription && <p>{itinerary.shortDescription}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
