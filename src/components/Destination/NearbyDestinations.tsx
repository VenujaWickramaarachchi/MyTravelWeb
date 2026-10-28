import DestinationCard from '@/components/entities/Destination/DestinationCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'
import { Destination } from '@/types/destination'

interface Props {
  nearbyDestinations: Destination[]
  className?: string
  destinationTitle?: string
}

export default function NearbyDestinations({
  nearbyDestinations,
  className = '',
  destinationTitle,
}: Props) {
  if (!nearbyDestinations || nearbyDestinations.length === 0) return null

  return (
    <section className={`my-12 sm:my-20 lg:my-24 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8'>
        <header className='space-y-1 sm:space-y-1.5'>
          <div className='flex items-center gap-2 text-gold-deep'>
            <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
            <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
              Island Circuit Combinations
            </p>
          </div>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            {destinationTitle ? `Nearby Destinations to Pair with ${destinationTitle}` : 'Nearby Destinations to Explore'}
          </h2>
          <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
            Seamlessly combine your stay with neighbouring coastal bays, historic forts, and tea country hill stations.
          </p>
        </header>

        <EntityGrid columns={3}>
          {nearbyDestinations.map((destination: any) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
