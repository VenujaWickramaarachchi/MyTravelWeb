import { Itinerary } from '@/types/itinerary'
import ItineraryCard from '@/components/entities/Itinerary/ItineraryCard'
import EntityGrid from '@/components/entities/EntityGrid'

interface Props {
  itineraries: Itinerary[]
  className?: string
}

export default function TravelGuideItineraries({
  itineraries,
  className = '',
}: Props) {
  if (!itineraries || itineraries.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-violet mb-2'>
            Curated Routes
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Related Itineraries
          </h2>
        </header>

        <EntityGrid columns={3}>
          {itineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
