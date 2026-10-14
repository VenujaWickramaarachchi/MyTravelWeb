import { ItineraryPage } from '@/types/pages/itinerary-page'
import ItineraryDayCard from '@/components/entities/ItineraryDay/ItineraryDayCard'

interface Props {
  itinerary: ItineraryPage
  className?: string
}

export default function ItineraryDays({
  itinerary,
  className = '',
}: Props) {
  const days = itinerary.relationships.itineraryDays

  if (!days || days.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-24 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Timeline & Journey Details
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl lg:text-4.5xl font-normal text-ink'>
            Day-by-Day Itinerary
          </h2>
        </header>

        <div className='pt-4'>
          {days.map((day) => (
            <ItineraryDayCard key={day.id} day={day} />
          ))}
        </div>
      </div>
    </section>
  )
}
