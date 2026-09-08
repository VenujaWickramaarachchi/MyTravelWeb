import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodations: Accommodation[]
  className?: string
}

export default function AccommodationList({
  accommodations,
  className = '',
}: Props) {
  if (!accommodations || accommodations.length === 0) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amethyst mb-2'>
            Handpicked Stays
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            Featured Accommodations
          </h2>
        </header>

        <EntityGrid columns={3}>
          {accommodations.map((hotel: any) => (
            <AccommodationCard key={hotel.id} accommodation={hotel} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
