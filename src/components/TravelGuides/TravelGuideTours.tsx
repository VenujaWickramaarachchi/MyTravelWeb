import TourCard from '@/components/entities/Tour/TourCard'
import { Tour } from '@/types/tour'

interface Props {
  tours: Tour[]
}

export default function TravelGuideTours({ tours }: Props) {
  if (!tours.length) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'red' }}>Related Tours</h2>

      <div>
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  )
}
