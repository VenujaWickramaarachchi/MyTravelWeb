export function transformAttraction(attraction: any) {
  return {
    id: attraction.id,
    title: attraction.title?.rendered || '',
    slug: attraction.slug || '',

    // Taxonomies
    attractionType: attraction['attraction-type'] || [],
    region: attraction.region || [],

    // Hero Section
    heroTitle: attraction.acf?.hero_title || '',
    heroSubtitle: attraction.acf?.hero_subtitle || '',
    heroImage: attraction.acf?.hero_image || null,

    // Core Details
    shortDescription: attraction.acf?.short_description || '',
    attractionOverview: attraction.acf?.attraction_overview || '',
    location: attraction.acf?.location || '',
    whatToSee: attraction.acf?.what_to_see || '',
    attractionHighlights: attraction.acf?.attraction_highlights || '',
    typicalVisitDuration: attraction.acf?.typical_visit_duration || '',
    bestTime: attraction.acf?.best_time || '',
    importantInformation: attraction.acf?.important_information || '',
    faqContent: attraction.acf?.faq_content || '',

    // Relationships & Connections
    destination: attraction.acf?.destination || [],

    // Note: Mapped to the exact spelling from your ACF JSON ("related_experiencs")
    relatedExperiences: attraction.acf?.related_experiencs || [],

    nearbyAttractions: attraction.acf?.nearby_attractions || [],
    relatedTours: attraction.acf?.related_tours || [],
  }
}
