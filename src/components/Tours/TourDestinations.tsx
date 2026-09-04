import { TourPage } from '@/types/pages/tour-page'

import DestinationCard from '@/components/entities/Destination/DestinationCard'

interface TourDestinationsProps {
  tour: TourPage
}

export default function TourDestinations({ tour }: TourDestinationsProps) {
  const destinations = tour.relationships.destinations

  if (destinations.length === 0) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'red' }}>Destinations</h2>

      <div>
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}
