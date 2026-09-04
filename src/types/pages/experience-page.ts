import { Experience } from '../experience'
import { Destination } from '../destination'
import { Tour } from '../tour'

export interface ExperiencePage extends Experience {
  relationships: {
    destinations: Destination[]
    relatedTours: Tour[]
  }
}
