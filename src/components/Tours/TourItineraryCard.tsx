import { TourPage } from '@/types/pages/tour-page'
import ItineraryCard from '@/components/entities/Itinerary/ItineraryCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

interface Props {
  tour: TourPage
  className?: string
}

export default function TourItineraryCard({ tour, className = '' }: Props) {
  const itinerary = tour.relationships.itinerary

  if (!itinerary) {
    return null
  }

  return (
    <section className={`my-12 sm:my-20 lg:my-24 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8'>
        <header className='space-y-1 sm:space-y-1.5'>
          <div className='flex items-center gap-2 text-violet'>
            <BespokeLotusIcon className='w-3.5 h-3.5 text-violet' />
            <p className='text-xs font-semibold uppercase tracking-widest text-violet'>
              Curated Circuit Route
            </p>
          </div>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            Featured Itinerary Route
          </h2>
          <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
            Explore the comprehensive route blueprint, transit logistics, and landmark circuit designed for this private tour.
          </p>
        </header>

        <EntityGrid columns={3}>
          <ItineraryCard itinerary={itinerary} />
        </EntityGrid>
      </div>
    </section>
  )
}
