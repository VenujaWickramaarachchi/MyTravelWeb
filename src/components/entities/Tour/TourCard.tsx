import Link from 'next/link'
import { Tour } from '@/types/tour'

interface Props {
  tour: Tour
}

export default function TourCard({ tour }: Props) {
  const cleanDescription =
    tour.shortDescription?.replace(/<[^>]*>?/gm, '') || ''

  return (
    <article className='group flex flex-col h-full bg-paper rounded border border-line overflow-hidden hover:border-violet/40 transition-colors duration-200'>
      <Link href={`/tours/${tour.slug}`} className='flex flex-col h-full'>
        {/* Image */}
        <div className='relative aspect-[16/10] w-full overflow-hidden bg-ivory'>
          {tour.heroImage?.url ? (
            <img
              src={tour.heroImage.url}
              alt={tour.heroImage.alt || tour.title}
              className='w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300'
              loading='lazy'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-ivory text-ink/30 font-serif'>
              <span>{tour.title}</span>
            </div>
          )}

          {/* Duration Badge */}
          {(tour.durationDays || tour.durationNights) && (
            <span className='absolute top-3 left-3 bg-paper/90 backdrop-blur-xs text-ink px-2.5 py-1 text-xs font-semibold rounded border border-line uppercase tracking-wider'>
              {tour.durationDays ? `${tour.durationDays} Days` : ''}
              {tour.durationNights ? ` / ${tour.durationNights} Nights` : ''}
            </span>
          )}

          {/* Style badge if present */}
          {tour.tourStyle && (
            <span className='absolute bottom-3 right-3 bg-violet/90 text-ivory px-2 py-0.5 text-[11px] font-medium rounded'>
              {tour.tourStyle}
            </span>
          )}
        </div>

        {/* Content */}
        <div className='p-5 sm:p-6 flex flex-col flex-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep mb-2'>
            Tailor-Made Tour
          </span>

          <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink group-hover:text-violet transition-colors leading-snug mb-2.5'>
            {tour.title}
          </h3>

          {cleanDescription && (
            <p className='text-sm text-ink/75 leading-relaxed line-clamp-3 mb-5 flex-1'>
              {cleanDescription}
            </p>
          )}

          {/* Price & Action */}
          <div className='pt-3 mt-auto border-t border-line/60 flex items-center justify-between'>
            {tour.priceFrom ? (
              <div className='flex flex-col'>
                <span className='text-[10px] uppercase tracking-wider text-ink/60 font-medium'>
                  From
                </span>
                <span className='text-base font-bold text-gold-deep font-sans'>
                  {tour.currency || '$'} {tour.priceFrom}
                </span>
              </div>
            ) : (
              <span className='text-xs text-ink/60 italic'>Custom pricing</span>
            )}

            <span className='inline-flex items-center text-xs font-semibold text-violet group-hover:text-gold-deep transition-colors uppercase tracking-wider'>
              <span>View Tour</span>
              <svg
                className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
