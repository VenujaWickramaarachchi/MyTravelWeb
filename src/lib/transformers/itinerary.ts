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

    featuredItinerary: itinerary.acf?.featured_itinerary || false,

    // Relationships
    relatedTours: itinerary.acf?.related_tours || [],
    accommodationSuggestions: itinerary.acf?.accommodation_suggestions || [],

    // SEO, Meta & Search Intent Data
    seoTitle: itinerary.acf?.seo_title || '',
    metaDescription: itinerary.acf?.meta_description || '',
    canonicalUrl: itinerary.acf?.canonical_url || '',
    noIndex: itinerary.acf?.no_index || false,
    ogTitle: itinerary.acf?.og_title || '',
    ogDescription: itinerary.acf?.og_description || '',
    socialImage: itinerary.acf?.social_image || null,
    primarySearchTopic: itinerary.acf?.primary_search_topic || '',
    secondarySearchTopics: itinerary.acf?.secondary_search_topics || '',
    searchIntent: itinerary.acf?.search_intent || '',

    // AEO
    aeoPrimaryQuestion: itinerary.acf?.aeo_primary_question || '',
    aeoDirectAnswer: itinerary.acf?.aeo_direct_answer || '',
    aeoSupportingQuestions: itinerary.acf?.aeo_supporting_questions || '',
    featuredAnswer: itinerary.acf?.featured_answer || '',

    // Breadcrumb
    breadcrumbLabel: itinerary.acf?.breadcrumb_label || '',
  }
}
