import DestinationCard from '@/components/entities/Destination/DestinationCard'

import { Destination } from '@/types/destination'

interface Props {
  nearbyDestinations: Destination[]
}
export default function NearbyDestinations({ nearbyDestinations }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>Nearby Destinations</h2>

      <div>
        {nearbyDestinations.map((destination: any) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}
