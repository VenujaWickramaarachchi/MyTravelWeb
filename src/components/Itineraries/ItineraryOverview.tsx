import { ItineraryPage } from '@/types/pages/itinerary-page'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryOverview({
  itinerary,
  className = '',
}: Props) {
  if (!itinerary.itineraryOverview) {
    return null
  }

  return (
    <section className={`space-y-4 pt-2 ${className}`}>
      <header>
        <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block mb-1.5'>
          The Route Concept
        </span>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Itinerary Overview
        </h2>
      </header>

      <div
        className='prose-editorial text-[15px] sm:text-base leading-relaxed text-ink/80 font-light'
        dangerouslySetInnerHTML={{
          __html: itinerary.itineraryOverview,
        }}
      />
    </section>
  )
}
