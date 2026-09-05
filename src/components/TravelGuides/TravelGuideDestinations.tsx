import DestinationCard from '@/components/entities/Destination/DestinationCard'
import { Destination } from '@/types/destination'

interface Props {
  destinations: Destination[]
}

export default function TravelGuideDestinations({ destinations }: Props) {
  if (!destinations.length) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'teal' }}>Related Destinations</h2>

      <div>
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}
