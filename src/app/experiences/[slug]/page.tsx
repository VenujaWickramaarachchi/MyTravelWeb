import { notFound } from 'next/navigation'
import { getExperience } from '@/lib/wordpress'

import ExperienceHero from '@/components/Experiences/ExperienceHero'
import ExperienceOverview from '@/components/Experiences/ExperienceOverview'
import ExperienceDetails from '@/components/Experiences/ExperienceDetails'
import ExperienceWhatToExpect from '@/components/Experiences/ExperienceWhatToExpect'
import ExperienceWhoIsItFor from '@/components/Experiences/ExperienceWhoIsItFor'
import ExperienceHighlights from '@/components/Experiences/ExperienceHighlights'
import ExperienceDestinations from '@/components/Experiences/ExperienceDestinations'
import ExperienceRelatedTours from '@/components/Experiences/ExperienceRelatedTours'
import ExperienceImportantInformation from '@/components/Experiences/ExperienceImportantInformation'
import ExperienceFAQ from '@/components/Experiences/ExperienceFAQ'

import GallerySection from '@/components/content/Gallery/GallerySection'

import { generateSEO } from '@/lib/seo'

import AEOAnswerSchema from '@/components/SEO/AEOAnswerSchema'
import AEOContent from '@/components/SEO/AEOContent'
import BreadcrumbSchema from '@/components/SEO/BreadCrumbSchema'
import { createBreadcrumbs } from '@/lib/breadcrumbs'

interface ExperiencePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const experience = await getExperience(slug)

  if (!experience) {
    return {}
  }

  return generateSEO({
    seoTitle: experience.seoTitle || experience.title,
    metaDescription: experience.metaDescription,
    canonicalUrl: experience.canonicalUrl,
    noIndex: experience.noIndex,
    ogTitle: experience.ogTitle,
    ogDescription: experience.ogDescription,
    socialImage: experience.socialImage,
  })
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params

  const experience = await getExperience(slug)

  if (!experience) {
    notFound()
  }

  return (
    <main>
      <AEOAnswerSchema data={experience} />

      <BreadcrumbSchema
        items={createBreadcrumbs(
          'Experiences',
          'experiences',
          experience.breadcrumbLabel || experience.title,
        )}
      />
      <ExperienceHero experience={experience} />

      <ExperienceOverview experience={experience} />

      <ExperienceDetails experience={experience} />

      <ExperienceWhatToExpect experience={experience} />

      <ExperienceWhoIsItFor experience={experience} />

      <ExperienceHighlights experience={experience} />

      <GallerySection
        images={experience.galleryImages}
        title='Experience Gallery'
      />

      <ExperienceDestinations
        destinations={experience.relationships.destinations}
      />

      <ExperienceRelatedTours tours={experience.relationships.relatedTours} />

      <ExperienceImportantInformation experience={experience} />

      <AEOContent data={experience} />

      <ExperienceFAQ experience={experience} />
    </main>
  )
}
