export function transformTour(tour: any) {
  return {
    id: tour.id,
    title: tour.title?.rendered || '',
    slug: tour.slug || '',

    // Taxonomies
    tourType: tour['tour-type'] || [],
    region: tour.region || [],

    // Hero Section
    heroTitle: tour.acf?.hero_title || '',
    heroSubtitle: tour.acf?.hero_subtitle || '',
    heroImage: tour.acf?.hero_image || null,

    // Core Tour Details
    shortDescription: tour.acf?.short_description || '',
    durationDays: tour.acf?.duration_days || null,
    durationNights: tour.acf?.duration_nights || null,
    priceFrom: tour.acf?.price_from || '',
    currency: tour.acf?.currency || 'USD',
    priceDescription: tour.acf?.price_description || '',
    groupSize: tour.acf?.group_size || '',
    tourStyle: tour.acf?.tour_style || '',
    bestTimeToTravel: tour.acf?.best_time_to_travel || '',

    // Rich Content & Information
    tourOverview: tour.acf?.tour_overview || '',
    tourHighlights: tour.acf?.tour_highlights || '',
    inclusions: tour.acf?.inclusions || '',
    exclusions: tour.acf?.exclusions || '',
    faqContent: tour.acf?.faq_content || '',

    // Relationships & Flags
    destinations: tour.acf?.destinations || [],
    experiences: tour.acf?.experiences || [],
    itinerary: tour.acf?.itinerary || [],
    featuredTour: tour.acf?.featured_tour || false,

    // SEO, Meta & Search Intent Data
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

    // AEO (Answer Engine Optimization) Data
    aeoPrimaryQuestion: tour.acf?.aeo_primary_question || '',
    aeoDirectAnswer: tour.acf?.aeo_direct_answer || '',
    aeoSupportingQuestions: tour.acf?.aeo_supporting_questions || '',
    featuredAnswer: tour.acf?.featured_answer || '',

    // Breadcrumb
    breadcrumbLabel: tour.acf?.breadcrumb_label || '',
  }
}
