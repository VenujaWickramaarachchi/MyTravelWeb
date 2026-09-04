export interface TrustAward {
  id: number
  title: string
  slug: string

  // Award Information
  name: string
  awardType: string
  description: string
  logo: any | null
  websiteUrl: string
  displayOrder: number | null
  issuingOrganization: string
}
