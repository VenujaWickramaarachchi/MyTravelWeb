import AttractionCard from '@/components/entities/Attraction/AttractionCard'
import EntityGrid from '@/components/entities/EntityGrid'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'
import { Attraction } from '@/types/attraction'

interface Props {
  attractions: Attraction[]
  className?: string
  destinationTitle?: string
}

export default function AttractionList({
  attractions,
  className = '',
  destinationTitle,
}: Props) {
  if (!attractions || attractions.length === 0) return null

  return (
    <section className={`my-12 sm:my-20 lg:my-24 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8'>
        <header className='space-y-1 sm:space-y-1.5'>
          <div className='flex items-center gap-2 text-gold-deep'>
            <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
            <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
              Key Landmarks
            </p>
          </div>
          <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
            {destinationTitle ? `Top Attractions in ${destinationTitle}` : 'Top Attractions in this Region'}
          </h2>
          <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
            Notable heritage landmarks, natural viewpoints, and sacred sanctuaries to explore.
          </p>
        </header>

        <EntityGrid columns={3}>
          {attractions.map((attraction: any) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </EntityGrid>
      </div>
    </section>
  )
}
