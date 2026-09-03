import DestinationCard from '@/components/entities/Destination/DestinationCard'

interface Props {
  nearbyDestinations: any
}
export default function NearbyDestinations({ nearbyDestinations }: Props) {
  return (
    <section>
      <h2>Nearby Destinations</h2>

      <div>
        {nearbyDestinations.map((destination: any) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}
