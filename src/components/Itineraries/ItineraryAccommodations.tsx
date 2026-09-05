import { ItineraryPage } from '@/types/pages/itinerary-page'
import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryAccommodations({ itinerary }: Props) {
  const accommodations = itinerary.relationships.accommodationSuggestions

  if (accommodations.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Accommodation Suggestions</h2>

      <div>
        {accommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
          />
        ))}
      </div>
    </section>
  )
}
