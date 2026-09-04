export function transformPartner(partner: any) {
  const websiteUrl = Array.isArray(partner.acf?.website_url)
    ? partner.acf.website_url[0] || ''
    : partner.acf?.website_url || ''

  return {
    id: partner.id,
    title: partner.title?.rendered || '',
    slug: partner.slug || '',

    // Partner Information
    partnerName: partner.acf?.partner_name || '',
    partnerLogo: partner.acf?.partner_logo || null,
    partnerType: partner.acf?.partner_type || '',
    websiteUrl,
    shortDescription: partner.acf?.short_description || '',
    displayOrder: partner.acf?.display_order ?? null,
  }
}
