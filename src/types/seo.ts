import { MediaImage } from '@/types/media-image'

export interface SEOData {
  seoTitle?: string | null
  metaDescription?: string | null
  canonicalUrl?: string | null
  noIndex?: boolean
  ogTitle?: string | null
  ogDescription?: string | null
  socialImage?: MediaImage | null
}
