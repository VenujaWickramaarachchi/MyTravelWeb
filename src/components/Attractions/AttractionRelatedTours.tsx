import TourCard from '@/components/entities/Tour/TourCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'
import { Tour } from '@/types/tour'

interface Props {
  tours: Tour[]
  className?: string
  attractionTitle?: string
}

export default function AttractionRelatedTours({
  tours,
  className = '',
  attractionTitle = 'This Attraction',
}: Props) {
  if (!tours || tours.length === 0) {
    return null
  }

  return (
    <section
      id='featured-tours'
      className={`my-12 sm:my-20 lg:my-24 scroll-mt-24 ${className}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8'>
        <header className='space-y-1 sm:space-y-1.5'>
          <div className='flex items-center gap-2 text-violet'>
            <BespokeLotusIcon className='w-3.5 h-3.5 text-violet' />
            <p className='text-xs font-semibold uppercase tracking-widest text-violet'>
              Private Tailor-Made Holidays
            </p>
          </div>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            Private Journeys Featuring {attractionTitle}
          </h2>
          <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
            Immerse yourself in handpicked private itineraries designed with dedicated local chauffeurs and boutique accommodations.
          </p>
        </header>

        <EntityGrid columns={3}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
