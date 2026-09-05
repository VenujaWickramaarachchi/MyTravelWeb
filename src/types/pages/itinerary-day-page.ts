import { ItineraryDay } from '../itinerary-day'
import { Destination } from '../destination'
import { Experience } from '../experience'
import { Accommodation } from '../accommodation'

export interface ItineraryDayPage extends ItineraryDay {
  relationships: {
    placesVisited: Destination[]
    experiences: Experience[]
    accommodation: Accommodation | null
  }
}
