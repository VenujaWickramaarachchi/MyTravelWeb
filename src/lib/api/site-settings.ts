
import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformSiteSettings } from '../transformers/site-settings'
import { transformDestination } from '../transformers/destination'
import { transformAttraction } from '../transformers/attraction'
import { transformExperience } from '../transformers/experience'

import { SiteSettings } from '@/types/site-settings'
import { HeroItem } from '@/types/hero'

import type { Destination } from '@/types/destination'
import type { Attraction } from '@/types/attraction'
import type { Experience } from '@/types/experience'

export async function getSiteSettings(): Promise<SiteSettings> {
  const pages = await fetchAPI('pages?slug=site-settings&_embed')

  const settings = pages[0]

  if (!settings) {
    throw new Error('Site Settings page not found')
  }

  return transformSiteSettings(settings)
}

export async function getHomepageHeroDestinations(
  postIds: number[],
): Promise<HeroItem[]> {
  if (!postIds || postIds.length === 0) {
    return []
  }

  const [destinations, attractions, experiences] = await Promise.all([
    fetchByIds('destination', postIds),
    fetchByIds('attraction', postIds),
    fetchByIds('experience', postIds),
  ])
  console.log('HERO POST IDS:', postIds)
  console.log('HERO DESTINATIONS:', destinations.map((item: Destination) => item.id))
  console.log('HERO ATTRACTIONS:', attractions.map((item: Attraction) => item.id))
  console.log('HERO EXPERIENCES:', experiences.map((item: Experience) => item.id))

  const heroItems: HeroItem[] = [
    ...destinations.map((item: Destination) => {
      const destination = transformDestination(item)

      return {
        id: destination.id,
        title: destination.title,
        slug: destination.slug,
        heroTitle: destination.heroTitle || destination.title,
        heroSubTitle:
          destination.heroSubTitle || destination.description || '',
        heroImage: destination.heroImage || null,
        galleryImages: destination.galleryImages || [],
        location: destination.location || '',
        type: 'destination' as const,
      }
    }),

    ...attractions.map((item: Attraction) => {
      const attraction = transformAttraction(item)

      return {
        id: attraction.id,
        title: attraction.title,
        slug: attraction.slug,
        heroTitle: attraction.heroTitle || attraction.title,
        heroSubTitle:
          attraction.heroSubtitle || attraction.shortDescription || '',
        heroImage: attraction.heroImage || null,
        galleryImages: attraction.galleryImages || [],
        location: attraction.location || '',
        type: 'attraction' as const,
      }
    }),

    ...experiences.map((item: Experience) => {
      const experience = transformExperience(item)

      return {
        id: experience.id,
        title: experience.title,
        slug: experience.slug,
        heroTitle: experience.heroTitle || experience.title,
        heroSubTitle:
          experience.heroSubtitle || experience.shortDescription || '',
        heroImage: experience.heroImage || null,
        galleryImages: experience.galleryImages || [],
        location: experience.location || '',
        type: 'experience' as const,
      }
    }),
  ]

  // Preserve the exact order selected in WordPress.
  return postIds
    .map((id) => heroItems.find((item) => item.id === id))
    .filter((item): item is HeroItem => Boolean(item))
}

