import { MediaImage } from './media-image'

export type HeroItemType = 'destination' | 'attraction' | 'experience'

export interface HeroItem {
    id: number
    title: string
    slug: string
    heroTitle: string
    heroSubTitle: string
    heroImage: MediaImage | null
    galleryImages: MediaImage[]
    location: string
    type: HeroItemType
}

