import { transformOurStory } from '../transformers/our-story'
import { OurStory } from '@/types/our-story'

export async function getOurStory(): Promise<OurStory | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/our-story?slug=our-story&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error('Failed fetching Our Story')
  }

  const data = await res.json()
  const post = data[0]

  if (!post) {
    return null
  }

  return transformOurStory(post)
}
