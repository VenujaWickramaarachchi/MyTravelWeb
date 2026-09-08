import { TourPage } from '@/types/pages/tour-page'
import DestinationCard from '@/components/entities/Destination/DestinationCard'
import EntityGrid from '@/components/entities/EntityGrid'

interface TourDestinationsProps {
  tour: TourPage
  className?: string
}

export default function TourDestinations({
  tour,
  className = '',
}: TourDestinationsProps) {
  const destinations = tour.relationships.destinations

  if (!destinations || destinations.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Route Map & Stops
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Destinations Visited
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
