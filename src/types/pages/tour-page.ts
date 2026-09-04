import { Tour } from '../tour'
import { Destination } from '../destination'
import { Accommodation } from '../accommodation'
import { Experience } from '../experience'
import { Itinerary } from '../itinerary'
import { ItineraryDay } from '../itinerary-day'

export interface TourPage extends Tour {
  relationships: {
    destinations: Destination[]

    experiences: Experience[]

    accommodations: Accommodation[]

    itinerary: Itinerary | null

    itineraryDays: ItineraryDay[]
  }
}
