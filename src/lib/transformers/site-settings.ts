export function transformSiteSettings(settings: any) {
  const acf = settings.acf || settings

  return {
    siteLogo: acf.site_logo || null,
    footerLogo: acf.footer_logo || null,
    favicon: acf.favicon || null,

    phone: acf.phone || '',
    whatsapp: acf.whatsapp || '',
    email: acf.email || '',
    businessAddress: acf.business_address || '',

    facebookUrl: Array.isArray(acf.facebook_url)
      ? acf.facebook_url[0] || ''
      : acf.facebook_url || '',

    instagramUrl: Array.isArray(acf.instagram_url)
      ? acf.instagram_url[0] || ''
      : acf.instagram_url || '',

    youtubeUrl: Array.isArray(acf.youtube_url)
      ? acf.youtube_url[0] || ''
      : acf.youtube_url || '',

    tiktokUrl: Array.isArray(acf.tiktok_url)
      ? acf.tiktok_url[0] || ''
      : acf.tiktok_url || '',

    globalCtaTitle: acf.global_cta_title || '',
    globalCtaDescription: acf.global_cta_description || '',
    globalCtaButton: acf.global_cta_button || '',
    globalCtaUrl: Array.isArray(acf.global_cta_url)
      ? acf.global_cta_url[0] || ''
      : acf.global_cta_url || '',

    defaultSeoTitle: acf.default_seo_title || '',
    defaultMetaDescription: acf.default_meta_description || '',
    defaultSocialImage: acf.default_social_image || null,

    footerHeading: acf.footer_heading || '',
    footerDescription: acf.footer_description || '',
    copyrightText: acf.copyright_text || '',

    googleAnalyticsId: acf.google_analytics_id || '',
    googleTagManagerId: acf.google_tag_manager_id || '',
  }
}
