import { Attraction } from '../attraction'
import { Destination } from '../destination'
import { Experience } from '../experience'
import { Tour } from '../tour'

export interface AttractionPage extends Attraction {
  relationships: {
    destination: Destination | null
    relatedExperiences: Experience[]
    nearbyAttractions: Attraction[]
    relatedTours: Tour[]
  }
}
