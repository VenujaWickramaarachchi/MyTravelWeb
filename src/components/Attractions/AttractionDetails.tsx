import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
  className?: string
}

export default function AttractionDetails({
  attraction,
  className = '',
}: Props) {
  const hasDetails =
    attraction.location ||
    attraction.typicalVisitDuration ||
    attraction.bestTime

  if (!hasDetails) return null

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 ${className}`}>
      <div className='bg-paper rounded border border-line p-5 sm:p-6 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 sm:divide-x divide-line/60'>
        {attraction.location && (
          <div className='sm:px-4 first:pl-0 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              📍 Location
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {attraction.location}
            </strong>
          </div>
        )}

        {attraction.typicalVisitDuration && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              ⏱ Typical Duration
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {attraction.typicalVisitDuration}
            </strong>
          </div>
        )}

        {attraction.bestTime && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              🗓 Best Time to Visit
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {attraction.bestTime}
            </strong>
          </div>
        )}
      </div>
    </section>
  )
}
