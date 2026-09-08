import Breadcrumbs from '@/components/Shared/Breadcrumbs'
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
      <main className="min-h-screen bg-paper flex items-center justify-center py-24">
        <section className="text-center px-6">
          <h1 className="text-3xl font-serif font-bold text-ink mb-4">Our Story</h1>
          <p className="text-ink/70">Our Story content is currently unavailable.</p>
        </section>
      </main>
    )
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/our-story' },
  ]

  return (
    <main className="min-h-screen bg-paper">
      <AEOAnswerSchema data={ourStory} />

      <OurStoryHero data={ourStory} />

      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <OurStoryIntroduction content={ourStory.introduction} />

      <OurStoryStory
        title={ourStory.storyTitle}
        content={ourStory.storyContent}
        image={ourStory.storyImage}
      />

      <div className="divide-y divide-ink/8">
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
      </div>

      <AEOContent data={ourStory} />

      <OurStoryCTA data={ourStory} />
    </main>
  )
}
