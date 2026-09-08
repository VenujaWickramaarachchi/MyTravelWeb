import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
  className?: string
}

export default function AccommodationDetails({
  accommodation,
  className = '',
}: Props) {
  const hasDetails =
    accommodation.location ||
    accommodation.address ||
    accommodation.stars !== null ||
    accommodation.price

  if (!hasDetails) return null

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 ${className}`}>
      <div className='bg-paper rounded border border-line p-5 sm:p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:divide-x divide-line/60'>
        {accommodation.stars !== null && (
          <div className='sm:px-4 first:pl-0 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Rating
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink flex items-center gap-1'>
              <span className='text-gold'>★</span>
              <span>{accommodation.stars} Star Property</span>
            </strong>
          </div>
        )}

        {accommodation.location && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Region
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {accommodation.location}
            </strong>
          </div>
        )}

        {accommodation.price && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Tariff Guide
            </span>
            <strong className='text-sm sm:text-base font-bold text-gold-deep block font-sans'>
              {accommodation.price}
            </strong>
          </div>
        )}

        {accommodation.address && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              Address
            </span>
            <span className='text-xs text-ink/80 block line-clamp-2'>
              {accommodation.address}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
