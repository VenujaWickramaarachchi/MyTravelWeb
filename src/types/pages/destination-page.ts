import { Destination } from '../destination'
import { Accommodation } from '../accommodation'
import { Tour } from '../tour'
import { Experience } from '../experience'

export interface DestinationPage extends Destination {
  relationships: {
    accommodations: Accommodation[]

    nearbyDestinations: Destination[]

    relatedTours: Tour[]

    experiences: Experience[]
  }
}
