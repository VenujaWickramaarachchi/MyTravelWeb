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
    <section className={`space-y-4 pt-2 ${className}`}>
      <header>
        <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block mb-1.5'>
          The Experience
        </span>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Tour Overview
        </h2>
      </header>

      <div
        className='prose-editorial text-[15px] sm:text-base leading-relaxed text-ink/80 font-light'
        dangerouslySetInnerHTML={{
          __html: tour.tourOverview,
        }}
      />
    </section>
  )
}
