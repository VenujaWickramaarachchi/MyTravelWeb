import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
  className?: string
}

export default function AccommodationPrice({
  accommodation,
  className = '',
}: Props) {
  if (!accommodation.price) {
    return null
  }

  return (
    <section className={`my-12 sm:my-16 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='p-6 sm:p-7 rounded border border-line bg-paper flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div>
            <span className='text-xs uppercase tracking-wider text-ink/60 font-semibold block mb-1'>
              Estimated Rates
            </span>
            <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink'>
              Tariff & Pricing
            </h3>
          </div>

          <div className='text-left sm:text-right'>
            <span className='text-xl sm:text-2xl font-bold text-gold-deep font-sans block'>
              {accommodation.price}
            </span>
            <span className='text-xs text-ink/60'>
              Subject to seasonal variation
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
