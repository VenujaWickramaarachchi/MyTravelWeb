import TourCard from '@/components/entities/Tour/TourCard'

import { Tour } from '@/types/tour'

interface Props {
  tours: Tour[]
}

export default function RelatedTours({ tours }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>Related Tours</h2>

      <div>
        {tours.map((tour: any) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  )
}
