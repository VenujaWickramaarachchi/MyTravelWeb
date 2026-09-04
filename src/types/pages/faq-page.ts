import { FAQ } from '../faq'
import { Tour } from '../tour'
import { Destination } from '../destination'
import { Experience } from '../experience'

export interface FAQPage extends FAQ {
  relationships: {
    relatedTour: Tour | null
    relatedDestination: Destination | null
    relatedExperience: Experience | null
  }
}
