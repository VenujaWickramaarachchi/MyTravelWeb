import { Tour } from '@/types/tour'

interface TourInfoProps {
  tour: Tour
  className?: string
}

export default function TourInfo({ tour, className = '' }: TourInfoProps) {
  if (!tour.bestTimeToTravel) return null

  return (
    <section className={`space-y-6 pt-2 ${className}`}>
      <div className='p-5 sm:p-6 rounded-xl border border-line bg-paper space-y-2 shadow-2xs'>
        <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block mb-1'>
          Seasonal Advice
        </span>
        <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink'>
          Best Time for This Tour
        </h3>
        <p className='text-[15px] sm:text-base text-ink/80 leading-relaxed font-light pt-1'>
          {tour.bestTimeToTravel}
        </p>
      </div>
    </section>
  )
}
