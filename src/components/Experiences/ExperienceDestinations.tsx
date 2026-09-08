import DestinationCard from '@/components/entities/Destination/DestinationCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { Destination } from '@/types/destination'

interface Props {
  destinations: Destination[]
  className?: string
}

export default function ExperienceDestinations({
  destinations,
  className = '',
}: Props) {
  if (!destinations || destinations.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Location
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Where to Experience This
          </h2>
        </header>

        <EntityGrid columns={3}>
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
