import AttractionCard from '@/components/entities/Attraction/AttractionCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { Attraction } from '@/types/attraction'

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

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            In The Area
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Nearby Attractions
          </h2>
        </header>

        <EntityGrid columns={3}>
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
