import { Itinerary } from '../itinerary'
import { Destination } from '../destination'
import { Experience } from '../experience'
import { Tour } from '../tour'
import { Accommodation } from '../accommodation'
import { TourItineraryDay } from './tour-itinerary-day'

export interface ItineraryPage extends Itinerary {
  relationships: {
    destinations: Destination[]
    experiences: Experience[]
    relatedTours: Tour[]
    accommodationSuggestions: Accommodation[]
    itineraryDays: TourItineraryDay[]
  }
}
