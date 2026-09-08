import Link from 'next/link'
import { Itinerary } from '@/types/itinerary'

interface Props {
  itinerary: Itinerary
}

export default function ItineraryCard({ itinerary }: Props) {
  const cleanDescription =
    itinerary.shortDescription?.replace(/<[^>]*>?/gm, '') || ''

  const hasRoute = itinerary.startingLocation || itinerary.endingLocation

  return (
    <article className='group flex flex-col h-full bg-paper rounded border border-line overflow-hidden hover:border-violet/40 transition-colors duration-200'>
      <Link href={`/itineraries/${itinerary.slug}`} className='flex flex-col h-full'>
        <div className='relative aspect-[16/10] w-full overflow-hidden bg-ivory'>
          {itinerary.heroImage?.url ? (
            <img
              src={itinerary.heroImage.url}
              alt={itinerary.heroImage.alt || itinerary.title}
              className='w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300'
              loading='lazy'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-ivory text-ink/30 font-serif'>
              <span>{itinerary.title}</span>
            </div>
          )}

          {/* Route badge */}
          {hasRoute && (
            <span className='absolute bottom-3 left-3 bg-paper/90 backdrop-blur-xs text-ink/90 px-2.5 py-1 text-[11px] font-medium rounded border border-line'>
              {itinerary.startingLocation}
              {itinerary.startingLocation && itinerary.endingLocation && ' → '}
              {itinerary.endingLocation}
            </span>
          )}

          {itinerary.bestFor && (
            <span className='absolute top-3 right-3 bg-paper/90 backdrop-blur-xs text-ink px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded border border-line'>
              {itinerary.bestFor}
            </span>
          )}
        </div>

        <div className='p-5 sm:p-6 flex flex-col flex-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.18em] text-violet mb-2'>
            Curated Itinerary
          </span>

          <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink group-hover:text-violet transition-colors leading-snug mb-2.5'>
            {itinerary.title}
          </h3>

          {cleanDescription && (
            <p className='text-sm text-ink/75 leading-relaxed line-clamp-3 mb-5 flex-1'>
              {cleanDescription}
            </p>
          )}

          <div className='pt-2 mt-auto border-t border-line/60 flex items-center justify-between text-xs font-semibold text-violet group-hover:text-gold-deep transition-colors uppercase tracking-wider'>
            <span>View Full Journey</span>
            <svg
              className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}
