import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformTour } from '../transformers/tour'

import { Experience } from '@/types/experience'
import { ExperiencePage } from '@/types/pages/experience-page'

export async function getExperiences(): Promise<Experience[]> {
  const experiences = await fetchAPI(
    'experience?per_page=100&_embed',
  )
  return (Array.isArray(experiences) ? experiences : []).map(
    transformExperience,
  )
}

export async function getExperience(
  slug: string,
): Promise<ExperiencePage | null> {
  try {
    const data = await fetchAPI(`experience?slug=${slug}&_embed`)
    const experience = Array.isArray(data) ? data[0] : null

    if (!experience) {
      return null
    }

    const experienceData = transformExperience(experience)

    // Related Destinations
    const destinations = experienceData.destinations.length
      ? await fetchByIds('destination', experienceData.destinations).then(
        (items) => items.map(transformDestination),
      )
      : []

    // Related Tours
    const relatedTours = experienceData.relatedTours.length
      ? await fetchByIds('tour', experienceData.relatedTours).then((items) =>
        items.map(transformTour),
      )
      : []

    return {
      ...experienceData,

      relationships: {
        destinations,
        relatedTours,
      },
    }
  } catch (error) {
    console.warn(`[getExperience] Error fetching experience ${slug}:`, error)
    return null
  }
}
