import Link from 'next/link'

import OurStoryHero from '@/components/OurStory/OurStoryHero'
import OurStoryIntroduction from '@/components/OurStory/OurStoryIntroduction'
import OurStoryStory from '@/components/OurStory/OurStoryStory'
import OurStorySection from '@/components/OurStory/OurStorySection'
import OurStoryCTA from '@/components/OurStory/OurStoryCTA'

import { getOurStory } from '@/lib/api/our-story'

import { generateSEO } from '@/lib/seo'

import AEOContent from '@/components/SEO/AEOContent'
import AEOAnswerSchema from '@/components/SEO/AEOAnswerSchema'

export async function generateMetadata() {
  const ourStory = await getOurStory()

  if (!ourStory) {
    return {}
  }

  return generateSEO({
    seoTitle: ourStory.seoTitle || ourStory.title,
    metaDescription: ourStory.metaDescription,
    canonicalUrl: ourStory.canonicalUrl,
    noIndex: ourStory.noIndex,
    ogTitle: ourStory.ogTitle,
    ogDescription: ourStory.ogDescription,
    socialImage: ourStory.socialImage,
  })
}

export default async function OurStoryPage() {
  const ourStory = await getOurStory()

  if (!ourStory) {
    return (
      <main>
        <section>
          <h1>Our Story</h1>
          <p>Our Story content is currently unavailable.</p>
        </section>
      </main>
    )
  }
  return (
    <main>
      <AEOAnswerSchema data={ourStory} />

      <OurStoryHero data={ourStory} />

      <OurStoryIntroduction content={ourStory.introduction} />

      <OurStoryStory
        title={ourStory.storyTitle}
        content={ourStory.storyContent}
        image={ourStory.storyImage}
      />

      <OurStorySection
        title={ourStory.philosophyTitle}
        content={ourStory.philosophyContent}
      />

      <OurStorySection
        title={ourStory.whyChooseUsTitle}
        content={ourStory.whyChooseUsContent}
      />

      <OurStorySection
        title={ourStory.approachTitle}
        content={ourStory.approachContent}
      />

      <AEOContent data={ourStory} />

      <OurStoryCTA data={ourStory} />
    </main>
  )
}
