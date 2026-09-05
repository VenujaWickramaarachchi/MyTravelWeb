import { MediaImage } from '@/types/media-image'

function normalizeGalleryImage(image: any): MediaImage | null {
  if (!image || typeof image !== 'object') {
    return null
  }

  const id = Number(image.ID ?? image.id ?? 0)
  const url = image.url ?? ''

  if (!id || !url) {
    return null
  }

  return {
    id,
    url,
    alt: image.alt ?? '',
    width: image.width ? Number(image.width) : null,
    height: image.height ? Number(image.height) : null,
    title: image.title ?? '',
  }
}

export function transformTravelGuide(travelGuide: any) {
  return {
    id: travelGuide.id,
    title: travelGuide.title?.rendered || '',
    slug: travelGuide.slug || '',

    // Taxonomy
    travelGuideTopic: travelGuide['travel-guide-topic'] || [],

    // Guide Information
    shortDescription: travelGuide.acf?.short_description || '',

    heroTitle: travelGuide.acf?.hero_title || '',

    heroSubtitle: travelGuide.acf?.hero_subtitle || '',

    heroImage: travelGuide.acf?.hero_image || null,

    galleryImages: [
      travelGuide.acf?.gallery_image_1,
      travelGuide.acf?.gallery_image_2,
      travelGuide.acf?.gallery_image_3,
      travelGuide.acf?.gallery_image_4,
      travelGuide.acf?.gallery_image_5,
      travelGuide.acf?.gallery_image_6,
    ]
      .map(normalizeGalleryImage)
      .filter(
        (image): image is MediaImage => image !== null && image.url !== '',
      ),

    guideIntroduction: travelGuide.acf?.guide_introduction || '',

    quickAnswer: travelGuide.acf?.quick_answer || '',

    keyInformation: travelGuide.acf?.key_information || '',

    mainContent: travelGuide.acf?.main_content || '',

    // Relationships
    relatedDestinations: Array.isArray(travelGuide.acf?.related_destinations)
      ? travelGuide.acf.related_destinations
      : travelGuide.acf?.related_destinations
        ? [travelGuide.acf.related_destinations]
        : [],

    relatedExperiences: travelGuide.acf?.related_experiences || [],

    relatedTours: travelGuide.acf?.related_tours || [],

    relatedItineraries: travelGuide.acf?.related_itineraries || [],

    // Additional Information
    faqContent: travelGuide.acf?.faq_content || '',

    authorExpert: travelGuide.acf?.author__expert || '',

    lastReviewed: travelGuide.acf?.last_reviewed || '',

    // SEO
    seoTitle: travelGuide.acf?.seo_title || '',

    metaDescription: travelGuide.acf?.meta_description || '',

    canonicalUrl: travelGuide.acf?.canonical_url || '',

    noIndex: travelGuide.acf?.no_index || false,

    ogTitle: travelGuide.acf?.og_title || '',

    ogDescription: travelGuide.acf?.og_description || '',

    socialImage: travelGuide.acf?.social_image || null,

    // Search / AEO
    primarySearchTopic: travelGuide.acf?.primary_search_topic || '',

    secondarySearchTopics: travelGuide.acf?.secondary_search_topics || '',

    searchIntent: travelGuide.acf?.search_intent || '',

    aeoPrimaryQuestion: travelGuide.acf?.aeo_primary_question || '',

    aeoDirectAnswer: travelGuide.acf?.aeo_direct_answer || '',

    aeoSupportingQuestions: travelGuide.acf?.aeo_supporting_questions || '',

    featuredAnswer: travelGuide.acf?.featured_answer || '',

    breadcrumbLabel: travelGuide.acf?.breadcrumb_label || '',
  }
}
