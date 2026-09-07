import { MediaImage } from '@/types/media-image'

export interface OurStory {
  id: number
  title: string
  slug: string

  // Hero
  heroTitle: string
  heroSubtitle: string
  heroImage: MediaImage | null

  // Content
  introduction: string

  storyTitle: string
  storyContent: string
  storyImage: MediaImage | null

  philosophyTitle: string
  philosophyContent: string

  whyChooseUsTitle: string
  whyChooseUsContent: string

  approachTitle: string
  approachContent: string

  // CTA
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonUrl: string

  // SEO
  seoTitle: string
  metaDescription: string
  canonicalUrl: string
  noIndex: boolean
  ogTitle: string
  ogDescription: string
  socialImage: MediaImage | null

  // Search
  primarySearchTopic: string
  secondarySearchTopics: string
  searchIntent: string

  // AEO
  aeoPrimaryQuestion: string
  aeoDirectAnswer: string
  aeoSupportingQuestions: string
  featuredAnswer: string

  // Breadcrumb
  breadcrumbLabel: string
}
