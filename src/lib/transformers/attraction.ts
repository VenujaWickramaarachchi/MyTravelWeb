export function transformAttraction(attraction: any) {
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
