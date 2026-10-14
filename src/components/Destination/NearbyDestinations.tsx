import DestinationCard from '@/components/entities/Destination/DestinationCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { Destination } from '@/types/destination'

interface Props {
  nearbyDestinations: Destination[]
  className?: string
}

export default function NearbyDestinations({
  nearbyDestinations,
  className = '',
}: Props) {
  if (!nearbyDestinations || nearbyDestinations.length === 0) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Continue the Journey
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            Nearby Destinations to Explore
          </h2>
        </header>

        <EntityGrid columns={3}>
          {nearbyDestinations.map((destination: any) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
