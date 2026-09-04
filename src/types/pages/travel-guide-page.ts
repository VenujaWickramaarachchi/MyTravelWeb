import { TravelGuide } from '../travel-guide'
import { Destination } from '../destination'
import { Experience } from '../experience'
import { Tour } from '../tour'
import { Itinerary } from '../itinerary'

export interface TravelGuidePage extends TravelGuide {
  relationships: {
    relatedDestinations: Destination[]
    relatedExperiences: Experience[]
    relatedTours: Tour[]
    relatedItineraries: Itinerary[]
  }
}
