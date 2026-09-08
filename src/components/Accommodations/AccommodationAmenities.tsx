import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
  className?: string
}

export default function AccommodationAmenities({
  accommodation,
  className = '',
}: Props) {
  const amenities = accommodation.amenities || []

  if (amenities.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 bg-ivory/60 py-16 border-y border-line ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amethyst mb-2'>
            Property Features
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Amenities & Facilities
          </h2>
        </header>

        <ul className='grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4'>
          {amenities.map((amenity, index) => (
            <li
              key={index}
              className='p-3.5 sm:p-4 rounded border border-line bg-paper flex items-center gap-2.5 text-xs sm:text-sm font-medium text-ink'
            >
              <span className='text-gold text-base leading-none'>✓</span>
              <span>{amenity}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
