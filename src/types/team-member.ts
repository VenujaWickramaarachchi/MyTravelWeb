export interface TeamMember {
  id: number
  title: string
  slug: string

  // Team Member Information
  fullName: string
  position: string
  shortBio: string
  profileImage: any | null
  socialUrl: string
  displayOrder: number | null
  fullBiography: string
  expertise: string[]
  languages: string[]
  experienceYears: string
}
