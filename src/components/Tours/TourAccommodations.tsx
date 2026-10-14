import { TourPage } from '@/types/pages/tour-page'
import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'
import EntityGrid from '@/components/entities/EntityGrid'

interface TourAccommodationsProps {
  tour: TourPage
  className?: string
}

export default function TourAccommodations({
  tour,
  className = '',
}: TourAccommodationsProps) {
  const accommodations = tour.relationships.accommodations

  if (!accommodations || accommodations.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amethyst mb-2'>
            Handpicked Stays
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Accommodations on This Tour
          </h2>
        </header>

        <EntityGrid columns={3}>
          {accommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
            />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
