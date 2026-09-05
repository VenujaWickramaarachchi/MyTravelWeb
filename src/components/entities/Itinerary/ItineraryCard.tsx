import { Itinerary } from '@/types/itinerary'

interface Props {
  itinerary: Itinerary
}

export default function ItineraryCard({ itinerary }: Props) {
  return (
    <article>
      {itinerary.heroImage?.url && (
        <img
          src={itinerary.heroImage.url}
          alt={itinerary.heroImage.alt || itinerary.title}
        />
      )}

      <h3>{itinerary.title}</h3>

      {itinerary.shortDescription && <p>{itinerary.shortDescription}</p>}

      <a href={`/itineraries/${itinerary.slug}`}>Explore Itinerary</a>
    </article>
  )
}
