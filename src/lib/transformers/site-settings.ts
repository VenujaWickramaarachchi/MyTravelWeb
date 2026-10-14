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

function getPostObjectIds(value: any): number[] {
  if (!value) {
    return []
  }

  const items = Array.isArray(value) ? value : [value]

  return items
    .map((item: any) =>
      typeof item === 'number' ? item : (item?.ID ?? item?.id ?? null),
    )
    .filter((id: number | null): id is number => id !== null)
}

export function transformSiteSettings(settings: any) {
  const acf = settings?.acf || {}
  return {
    siteLogo: normalizeImage(acf.site_logo),

    footerLogo: normalizeImage(acf.footer_logo),

    favicon: normalizeImage(acf.favicon),

    phone: acf.phone || '',

    whatsapp: acf.whatsapp || '',

    email: acf.email || '',

    businessAddress: acf.business_address || '',

    facebookUrl: acf.facebook_url || '',

    instagramUrl: acf.instagram_url || '',

    youtubeUrl: acf.youtube_url || '',

    tiktokUrl: acf.tiktok_url || '',

    globalCtaTitle: acf.global_cta_title || '',

    globalCtaDescription: acf.global_cta_description || '',

    globalCtaButton: acf.global_cta_button || '',

    globalCtaUrl: acf.global_cta_url || '',

    defaultSeoTitle: acf.default_seo_title || '',

    defaultMetaDescription: acf.default_meta_description || '',

    defaultSocialImage: normalizeImage(acf.default_social_image),

    footerHeading: acf.footer_heading || '',

    footerDescription: acf.footer_description || '',

    copyrightText: acf.copyright_text || '',

    googleAnalyticsId: acf.google_analytics_id || '',

    googleTagManagerId: acf.google_tag_manager_id || '',

    popularSearch1: acf.popular_search_1 || '',
    popularSearch2: acf.popular_search_2 || '',
    popularSearch3: acf.popular_search_3 || '',
    popularSearch4: acf.popular_search_4 || '',
    popularSearch5: acf.popular_search_5 || '',
    popularSearch6: acf.popular_search_6 || '',
    popularSearch7: acf.popular_search_7 || '',
    popularSearch8: acf.popular_search_8 || '',

    homepageHeroDestinations: getPostObjectIds(
      acf.homepage_hero_destinations,
    ),
  }
}
