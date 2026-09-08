import { Tour } from '@/types/tour'

interface TourQuickDetailsProps {
  tour: Tour
}

export default function TourQuickDetails({ tour }: TourQuickDetailsProps) {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20'>
      <div className='bg-paper rounded border border-line p-5 sm:p-6 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x divide-line/60'>
        {/* Duration */}
        <div className='lg:px-4 first:pl-0 space-y-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
            Duration
          </span>
          <strong className='text-sm sm:text-base font-semibold text-ink block'>
            {tour.durationDays ? `${tour.durationDays} Days` : ''}
            {tour.durationNights ? ` / ${tour.durationNights} Nights` : ''}
          </strong>
        </div>

        {/* Price */}
        <div className='lg:px-4 space-y-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
            Price From
          </span>
          <strong className='text-sm sm:text-base font-bold text-gold-deep block font-sans'>
            {tour.priceFrom ? `${tour.currency || '$'} ${tour.priceFrom}` : 'Tailor-Made'}
          </strong>
        </div>

        {/* Tour Style */}
        <div className='lg:px-4 space-y-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
            Tour Style
          </span>
          <strong className='text-sm sm:text-base font-semibold text-ink block'>
            {tour.tourStyle || 'Private Guided'}
          </strong>
        </div>

        {/* Group Size */}
        <div className='lg:px-4 space-y-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
            Group Size
          </span>
          <strong className='text-sm sm:text-base font-semibold text-ink block'>
            {tour.groupSize || 'Tailor-Made'}
          </strong>
        </div>

        {/* Best Time */}
        <div className='lg:px-4 space-y-1 col-span-2 sm:col-span-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
            Best Time
          </span>
          <strong className='text-sm sm:text-base font-semibold text-ink block'>
            {tour.bestTimeToTravel || 'Year-round'}
          </strong>
        </div>
      </div>
    </section>
  )
}
