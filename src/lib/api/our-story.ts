import { fetchAPI } from './core/fetch-api'
import { transformOurStory } from '../transformers/our-story'
import { OurStory } from '@/types/our-story'

export async function getOurStory(): Promise<OurStory | null> {
  try {
    const data = await fetchAPI('our-story?slug=our-story&_embed')
    const post = Array.isArray(data) ? data[0] : null

    if (!post) {
      return null
    }

    return transformOurStory(post)
  } catch (error) {
    console.warn('[getOurStory] Error fetching Our Story:', error)
    return null
  }
}

