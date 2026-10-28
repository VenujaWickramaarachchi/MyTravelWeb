import { ItineraryPage } from '@/types/pages/itinerary-page'
import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryAccommodations({
  itinerary,
  className = '',
}: Props) {
  const accommodations = itinerary.relationships.accommodationSuggestions

  if (!accommodations || accommodations.length === 0) {
    return null
  }

  return (
    <section className={`my-12 sm:my-20 lg:my-24 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8'>
        <header className='space-y-1 sm:space-y-1.5'>
          <div className='flex items-center gap-2 text-amethyst'>
            <BespokeLotusIcon className='w-3.5 h-3.5 text-amethyst' />
            <p className='text-xs font-semibold uppercase tracking-widest text-amethyst'>
              Boutique Hotels & Lodges
            </p>
          </div>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            Recommended Accommodations for This Route
          </h2>
          <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
            Handpicked heritage villas, colonial hill station retreats, and boutique beachfront escapes along the journey.
          </p>
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
