import { ItineraryPage } from '@/types/pages/itinerary-page'
import TourCard from '@/components/entities/Tour/TourCard'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryRelatedTours({ itinerary }: Props) {
  const tours = itinerary.relationships.relatedTours

  if (tours.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Related Tours</h2>

      <div>
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  )
}
