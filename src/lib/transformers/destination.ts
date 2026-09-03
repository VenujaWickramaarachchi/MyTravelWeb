export function transformDestination(destination: any) {
  return {
    id: destination.id,
    title: destination.title?.rendered,
    slug: destination.slug,

    region: destination.region || [],

    heroTitle: destination.acf?.hero_title || '',
    heroSubTitle: destination.acf?.hero_subtitle || '',
    heroImage: destination.acf?.hero_image || null,

    description: destination.acf?.short_description || '',
    overview: destination.acf?.destination_overview || '',
    location: destination.acf?.location || '',
    bestTimetoVisit: destination.acf?.best_time_to_visit || '',
    recommendedDuration: destination.acf?.recommended_duration || '',
    destinationType: destination.acf?.destination_type || [],

    mainAttractions: destination.acf?.main_attractions || '',
    thingsToDo: destination.acf?.things_to_do || '',
    travelTips: destination.acf?.travel_tips || '',
    faqContent: destination.acf?.faq_content || '',
    howtoGetThere: destination.acf?.how_to_get_there || '',
    Weather: destination.acf?.weather_by_season || '',

    mapsEmbed: destination.acf?.google_maps_embed || '',
    mapsCoordinates: destination.acf?.map_coordinates || '',
    locationAddress: destination.acf?.locationaddress || '',

    experiences: destination.acf?.experiences || [],
    relatedTours: destination.acf?.related_tours || [],
    featuredAccommodations: destination.acf?.featured_accommodations || [],
    nearbyDestinations: destination.acf?.nearby_destinations || [],
    featuredDestination: destination.acf?.featured_destination || false,

    // SEO, Meta & Search Intent Data
    seoTitle: destination.acf?.seo_title || '',
    metaDescription: destination.acf?.meta_description || '',
    canonicalUrl: destination.acf?.canonical_url || '',
    noIndex: destination.acf?.no_index || false,
    ogTitle: destination.acf?.og_title || '',
    ogDescription: destination.acf?.og_description || '',
    socialImage: destination.acf?.social_image || null,
    primarySearchTopic: destination.acf?.primary_search_topic || '',
    secondarySearchTopics: destination.acf?.secondary_search_topics || '',
    searchIntent: destination.acf?.search_intent || '',

    // AEO (Answer Engine Optimization) Data
    aeoPrimaryQuestion: destination.acf?.aeo_primary_question || '',
    aeoDirectAnswer: destination.acf?.aeo_direct_answer || '',
    aeoSupportingQuestions: destination.acf?.aeo_supporting_questions || '',
    featuredAnswer: destination.acf?.featured_answer || '',

    // Breadcrumb
    breadcrumbLabel: destination.acf?.breadcrumb_label || '',
  }
}
