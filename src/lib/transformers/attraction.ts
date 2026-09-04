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

export function transformAttraction(attraction: any) {
  const galleryImages = [
    attraction.acf?.gallery_image_1,
    attraction.acf?.gallery_image_2,
    attraction.acf?.gallery_image_3,
    attraction.acf?.gallery_image_4,
    attraction.acf?.gallery_image_5,
    attraction.acf?.gallery_image_6,
  ]
    .map(normalizeGalleryImage)
    .filter((image): image is MediaImage => image !== null && image.url !== '')

  return {
    id: attraction.id,
    title: attraction.title?.rendered || '',
    slug: attraction.slug || '',

    // Taxonomies
    attractionType: attraction['attraction-type'] || [],
    region: attraction.region || [],

    // Attraction Information
    shortDescription: attraction.acf?.short_description || '',
    heroTitle: attraction.acf?.hero_title || '',
    heroSubtitle: attraction.acf?.hero_subtitle || '',
    heroImage: attraction.acf?.hero_image || null,
    galleryImages,
    attractionOverview: attraction.acf?.attraction_overview || '',
    location: attraction.acf?.location || '',
    whatToSee: attraction.acf?.what_to_see || '',
    attractionHighlights: attraction.acf?.attraction_highlights || '',
    typicalVisitDuration: attraction.acf?.typical_visit_duration || '',
    bestTime: attraction.acf?.best_time || '',

    // Relationships
    destination: attraction.acf?.destination || [],
    relatedExperiences: attraction.acf?.related_experiencs || [],
    nearbyAttractions: attraction.acf?.nearby_attractions || [],
    relatedTours: attraction.acf?.related_tours || [],

    // Additional information
    importantInformation: attraction.acf?.important_information || '',
    faqContent: attraction.acf?.faq_content || '',
  }
}
