import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'

import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodations: Accommodation[]
}

export default function AccommodationList({ accommodations }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>Featured Accommodations</h2>

      <div className='accommodation-grid'>
        {accommodations.map((hotel: any) => (
          <AccommodationCard key={hotel.id} accommodation={hotel} />
        ))}
      </div>
    </section>
  )
}
