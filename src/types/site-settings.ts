import { MediaImage } from './media-image'

export interface SiteSettings {
  siteLogo: MediaImage | null
  footerLogo: MediaImage | null
  favicon: MediaImage | null

  phone: string
  whatsapp: string
  email: string
  businessAddress: string

  facebookUrl: string
  instagramUrl: string
  youtubeUrl: string
  tiktokUrl: string

  globalCtaTitle: string
  globalCtaDescription: string
  globalCtaButton: string
  globalCtaUrl: string

  defaultSeoTitle: string
  defaultMetaDescription: string
  defaultSocialImage: MediaImage | null

  footerHeading: string
  footerDescription: string
  copyrightText: string

  googleAnalyticsId: string
  googleTagManagerId: string
}
