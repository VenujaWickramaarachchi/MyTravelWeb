export interface Partner {
  id: number
  title: string
  slug: string

  // Partner Information
  partnerName: string
  partnerLogo: any | null
  partnerType: string
  websiteUrl: string
  shortDescription: string
  displayOrder: number | null
}
