import { ItineraryPage } from '@/types/pages/itinerary-page'
import ItineraryDayCard from '@/components/entities/ItineraryDay/ItineraryDayCard'

interface Props {
  itinerary: ItineraryPage
}

export default function ItineraryDays({ itinerary }: Props) {
  const days = itinerary.relationships.itineraryDays

  if (days.length === 0) {
    return null
  }

  return (
    <section>
      <h2>Day-by-Day Itinerary</h2>

      <div>
        {days.map((day) => (
          <ItineraryDayCard key={day.id} day={day} />
        ))}
      </div>
    </section>
  )
}
