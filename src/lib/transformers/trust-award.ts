export function transformTrustAward(trustAward: any) {
  const websiteUrl = Array.isArray(trustAward.acf?.website_url)
    ? trustAward.acf.website_url[0] || ''
    : trustAward.acf?.website_url || ''

  return {
    id: trustAward.id,
    title: trustAward.title?.rendered || '',
    slug: trustAward.slug || '',

    // Award Information
    name: trustAward.acf?.name || '',
    awardType: trustAward.acf?.award_type || '',
    description: trustAward.acf?.description || '',
    logo: trustAward.acf?.logo || null,
    websiteUrl,
    displayOrder: trustAward.acf?.display_order ?? null,
    issuingOrganization: trustAward.acf?.issuingorganization || '',
  }
}
