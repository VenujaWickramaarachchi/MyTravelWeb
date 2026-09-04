export function transformItinerary(itinerary: any) {
  return {
    id: itinerary.id,
    title: itinerary.title?.rendered || '',
    slug: itinerary.slug || '',

    // Content
    shortDescription: itinerary.acf?.short_description || '',
    heroTitle: itinerary.acf?.hero_title || '',
    heroSubtitle: itinerary.acf?.hero_subtitle || '',
    heroImage: itinerary.acf?.hero_image || null,
    itineraryOverview: itinerary.acf?.itinerary_overview || '',

    // Route
    startingLocation: itinerary.acf?.starting_location || '',
    endingLocation: itinerary.acf?.ending_location || '',
    route: itinerary.acf?.route || '',

    // Relationships
    destinations: itinerary.acf?.destinations || [],
    experiences: itinerary.acf?.experiences || [],

    // Additional information
    bestFor: itinerary.acf?.best_for || '',
    accommodationStyle: itinerary.acf?.accommodation_style || '',
    transportation: itinerary.acf?.transportation || '',
    meals: itinerary.acf?.meals || '',

    // Relationships
    relatedTours: itinerary.acf?.related_tours || [],
    accommodationSuggestions: itinerary.acf?.accommodation_suggestions || [],
  }
}
