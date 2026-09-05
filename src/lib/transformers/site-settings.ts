import { MediaImage } from '@/types/media-image'

function normalizeImage(image: any): MediaImage | null {
  if (!image || typeof image !== 'object') {
    return null
  }

  const id = Number(image.id ?? image.ID ?? 0)

  const url = image.url ?? ''

  if (!id || !url) {
    return null
  }

  return {
    id,
    url,
    alt: image.alt ?? '',
    width: image.width ? Number(image.width) : null,
    height: image.height ? Number(image.height) : null,
    title: image.title ?? '',
  }
}

export function transformSiteSettings(settings: any) {
  return {
    siteLogo: normalizeImage(settings.acf?.site_logo),

    footerLogo: normalizeImage(settings.acf?.footer_logo),

    favicon: normalizeImage(settings.acf?.favicon),

    phone: settings.acf?.phone || '',

    whatsapp: settings.acf?.whatsapp || '',

    email: settings.acf?.email || '',

    businessAddress: settings.acf?.business_address || '',

    facebookUrl: settings.acf?.facebook_url || '',

    instagramUrl: settings.acf?.instagram_url || '',

    youtubeUrl: settings.acf?.youtube_url || '',

    tiktokUrl: settings.acf?.tiktok_url || '',

    globalCtaTitle: settings.acf?.global_cta_title || '',

    globalCtaDescription: settings.acf?.global_cta_description || '',

    globalCtaButton: settings.acf?.global_cta_button || '',

    globalCtaUrl: settings.acf?.global_cta_url || '',

    defaultSeoTitle: settings.acf?.default_seo_title || '',

    defaultMetaDescription: settings.acf?.default_meta_description || '',

    defaultSocialImage: normalizeImage(settings.acf?.default_social_image),

    footerHeading: settings.acf?.footer_heading || '',

    footerDescription: settings.acf?.footer_description || '',

    copyrightText: settings.acf?.copyright_text || '',

    googleAnalyticsId: settings.acf?.google_analytics_id || '',

    googleTagManagerId: settings.acf?.google_tag_manager_id || '',
  }
}
