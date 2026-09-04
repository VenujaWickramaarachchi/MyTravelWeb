import { fetchAPI } from './core/fetch-api'
import { fetchByIds } from './core/fetch-by-ids'

import { transformDestination } from '../transformers/destination'
import { transformExperience } from '../transformers/experience'
import { transformTour } from '../transformers/tour'

import { Experience } from '@/types/experience'
import { ExperiencePage } from '@/types/pages/experience-page'

export async function getExperiences(): Promise<Experience[]> {
  const experiences = await fetchAPI('experience?_embed')

  return experiences.map(transformExperience)
}

export async function getExperience(
  slug: string,
): Promise<ExperiencePage | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/experience?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching experience: ${slug}`)
  }

  const data = await res.json()
  const experience = data[0]

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
}
