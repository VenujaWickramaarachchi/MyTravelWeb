import type { Attraction } from '@/types/attraction'
import AttractionCard from '@/components/entities/Attraction/AttractionCard'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

interface Props {
  attractions: Attraction[]
  className?: string
}

export default function AttractionNearbyAttractions({
  attractions,
  className = '',
}: Props) {
  if (!attractions || attractions.length === 0) {
    return null
  }

  // Display up to 4 refined nearby landmarks
  const itemsToDisplay = attractions.slice(0, 4)

  return (
    <section className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header with Strict Global Typography */}
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            In The Area
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Nearby Attractions to Explore
        </h2>
        <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
          Complementary regional landmarks and cultural sites situated within easy reach.
        </p>
      </header>

      {/* Refined Row of Image-Based Cards for the Left Column (~70% width) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-1'>
        {itemsToDisplay.map((attraction) => (
          <div key={attraction.id} className='h-[280px] sm:h-[300px]'>
            <AttractionCard
              attraction={attraction}
              density='compact'
              aspectRatio='4/3'
            />
          </div>
        ))}
      </div>
    </section>
  )
}
