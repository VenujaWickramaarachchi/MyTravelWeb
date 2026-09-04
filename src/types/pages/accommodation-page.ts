import { Accommodation } from '../accommodation'
import { Destination } from '../destination'

export interface AccommodationPage extends Accommodation {
  relationships: {
    destination: Destination | null
  }
}
