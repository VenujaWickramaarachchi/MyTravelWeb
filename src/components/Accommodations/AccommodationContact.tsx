import { Accommodation } from '@/types/accommodation'

interface Props {
  accommodation: Accommodation
  className?: string
}

export default function AccommodationContact({
  accommodation,
  className = '',
}: Props) {
  const hasContact =
    accommodation.contactPhone ||
    accommodation.email ||
    accommodation.officialWebsite ||
    accommodation.bookingUrl

  if (!hasContact) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amethyst mb-2'>
            Reservations & Enquiries
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Booking Information
          </h2>
        </header>

        <div className='p-6 sm:p-8 rounded border border-line bg-paper space-y-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
            {accommodation.contactPhone && (
              <div className='space-y-1'>
                <span className='text-xs uppercase tracking-wider text-ink/60 font-semibold block'>
                  Phone
                </span>
                <a
                  href={`tel:${accommodation.contactPhone}`}
                  className='text-ink hover:text-violet font-medium'
                >
                  {accommodation.contactPhone}
                </a>
              </div>
            )}

            {accommodation.email && (
              <div className='space-y-1'>
                <span className='text-xs uppercase tracking-wider text-ink/60 font-semibold block'>
                  Email
                </span>
                <a
                  href={`mailto:${accommodation.email}`}
                  className='text-ink hover:text-violet font-medium'
                >
                  {accommodation.email}
                </a>
              </div>
            )}
          </div>

          <div className='pt-4 border-t border-line/60 flex flex-wrap gap-4'>
            {accommodation.bookingUrl && (
              <a
                href={accommodation.bookingUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-6 py-2.5 text-sm font-semibold text-ivory bg-violet hover:bg-violet-deep rounded transition-colors'
              >
                Book Accommodation
              </a>
            )}

            {accommodation.officialWebsite && (
              <a
                href={accommodation.officialWebsite}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-ink border border-line hover:border-violet/40 rounded transition-colors'
              >
                Visit Official Website ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
