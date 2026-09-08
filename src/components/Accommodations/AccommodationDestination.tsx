import Link from 'next/link'
import { AccommodationPage } from '@/types/pages/accommodation-page'

interface Props {
  accommodation: AccommodationPage
  className?: string
}

export default function AccommodationDestination({
  accommodation,
  className = '',
}: Props) {
  const destination = accommodation.relationships.destination

  if (!destination) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Setting & Location
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            The Surrounding Destination
          </h2>
        </header>

        <div className='p-6 sm:p-8 rounded border border-line bg-paper space-y-4'>
          <h3 className='font-serif text-2xl font-medium text-ink'>
            {destination.title}
          </h3>

          {destination.description && (
            <p className='text-sm sm:text-base text-ink/75 leading-relaxed'>
              {destination.description}
            </p>
          )}

          <div className='pt-2'>
            <Link
              href={`/destinations/${destination.slug}`}
              className='inline-flex items-center text-xs font-semibold uppercase tracking-wider text-violet hover:text-gold-deep transition-colors'
            >
              <span>Explore Destination Guide</span>
              <svg
                className='w-4 h-4 ml-1.5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
