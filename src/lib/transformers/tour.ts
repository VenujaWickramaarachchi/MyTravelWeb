import { MediaImage } from '@/types/media-image'

function normalizeGalleryImage(image: any): MediaImage | null {
  if (!image || typeof image !== 'object') {
    return null
  }

  return {
    id: image.ID ?? image.id ?? 0,
    url: image.url ?? '',
    alt: image.alt ?? '',
    width: image.width ?? null,
    height: image.height ?? null,
    title: image.title ?? '',
  }
}
function normalizeSingleImage(image: any): MediaImage | null {
  if (Array.isArray(image)) {
    image = image[0]
  }

  if (!image || typeof image !== 'object') {
    return null
  }

  return {
    id: image.ID ?? image.id ?? 0,
    url: image.url ?? '',
    alt: image.alt ?? '',
    width: image.width ?? null,
    height: image.height ?? null,
    title: image.title ?? '',
  }
}

export function transformTour(tour: any) {
  const galleryImages = [
    tour.acf?.gallery_image_1,
    tour.acf?.gallery_image_2,
    tour.acf?.gallery_image_3,
    tour.acf?.gallery_image_4,
    tour.acf?.gallery_image_5,
    tour.acf?.gallery_image_6,
  ]
    .map(normalizeGalleryImage)
    .filter((image): image is MediaImage => image !== null && image.url !== '')
  return {
    id: tour.id,
    title: tour.title?.rendered || '',
    slug: tour.slug || '',

    // Taxonomies
    tourType: tour['tour-type'] || [],
    region: tour.region || [],

    // Hero
    heroTitle: tour.acf?.hero_title || '',
    heroSubtitle: tour.acf?.hero_subtitle || '',
    heroImage: normalizeSingleImage(tour.acf?.hero_image),
    galleryImages,

    // Core Details
    shortDescription: tour.acf?.short_description || '',
    durationDays: tour.acf?.duration_days || null,
    durationNights: tour.acf?.duration_nights || null,
    priceFrom: tour.acf?.price_from ?? null,
    currency: tour.acf?.currency || 'USD',
    priceDescription: tour.acf?.price_description || '',
    groupSize: tour.acf?.group_size || '',
    tourStyle: tour.acf?.tour_style || '',
    bestTimeToTravel: tour.acf?.best_time_to_travel || '',

    // Content
    tourOverview: tour.acf?.tour_overview || '',
    tourHighlights: tour.acf?.tour_highlights || '',
    inclusions: tour.acf?.inclusions || '',
    exclusions: tour.acf?.exclusions || '',

    faqContent: tour.acf?.faq_content || '',

    // Relationships
    destinations: tour.acf?.destinations || [],
    experiences: tour.acf?.experiences || [],
    itinerary: tour.acf?.itinerary || null,
    itineraryDays: tour.acf?.itinerary_days || [],
    accommodations: tour.acf?.accommodations || [],

    featuredTour: tour.acf?.featured_tour || false,

    // SEO
    seoTitle: tour.acf?.seo_title || '',
    metaDescription: tour.acf?.meta_description || '',
    canonicalUrl: tour.acf?.canonical_url || '',
    noIndex: tour.acf?.no_index || false,
    ogTitle: tour.acf?.og_title || '',
    ogDescription: tour.acf?.og_description || '',
    socialImage: tour.acf?.social_image || null,
    primarySearchTopic: tour.acf?.primary_search_topic || '',
    secondarySearchTopics: tour.acf?.secondary_search_topics || '',
    searchIntent: tour.acf?.search_intent || '',

    // AEO
    aeoPrimaryQuestion: tour.acf?.aeo_primary_question || '',
    aeoDirectAnswer: tour.acf?.aeo_direct_answer || '',
    aeoSupportingQuestions: tour.acf?.aeo_supporting_questions || '',
    featuredAnswer: tour.acf?.featured_answer || '',

    // Breadcrumb
    breadcrumbLabel: tour.acf?.breadcrumb_label || '',
  }
}
