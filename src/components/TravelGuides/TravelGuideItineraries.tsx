import { Itinerary } from '@/types/itinerary'
import ItineraryCard from '@/components/entities/Itinerary/ItineraryCard'

interface Props {
  itineraries: Itinerary[]
}

export default function TravelGuideItineraries({ itineraries }: Props) {
  if (itineraries.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Related Itineraries</h2>

      <div>
        {itineraries.map((itinerary) => (
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </section>
  )
}
