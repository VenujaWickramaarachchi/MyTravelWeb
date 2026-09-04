import { TourPage } from '@/types/pages/tour-page'

import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'

interface TourAccommodationsProps {
  tour: TourPage
}

export default function TourAccommodations({ tour }: TourAccommodationsProps) {
  const accommodations = tour.relationships.accommodations

  if (accommodations.length === 0) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'red' }}>Accommodation</h2>

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
