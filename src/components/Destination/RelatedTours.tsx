import TourCard from '@/components/entities/Tour/TourCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { Tour } from '@/types/tour'

interface Props {
  tours: Tour[]
  className?: string
}

export default function RelatedTours({ tours, className = '' }: Props) {
  if (!tours || tours.length === 0) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-violet mb-2'>
            Private Holidays
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            Tours Featuring This Destination
          </h2>
        </header>

        <EntityGrid columns={3}>
          {tours.map((tour: any) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
