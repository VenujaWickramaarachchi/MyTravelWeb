import { Tour } from '@/types/tour'

interface TourOverviewProps {
  tour: Tour
  className?: string
}

export default function TourOverview({
  tour,
  className = '',
}: TourOverviewProps) {
  if (!tour.tourOverview) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            The Experience
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Tour Overview
          </h2>
        </header>

        <div
          className='prose-editorial'
          dangerouslySetInnerHTML={{
            __html: tour.tourOverview,
          }}
        />
      </div>
    </section>
  )
}
