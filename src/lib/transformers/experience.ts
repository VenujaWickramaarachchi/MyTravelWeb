export function transformExperience(experience: any) {
  return {
    id: experience.id,
    title: experience.title?.rendered || '',
    slug: experience.slug || '',

    // Taxonomies
    experienceType: experience['experience-type'] || [],
    region: experience.region || [],

    // Experience Information
    shortDescription: experience.acf?.short_description || '',
    heroTitle: experience.acf?.hero_title || '',
    heroSubtitle: experience.acf?.hero_subtitle || '',
    heroImage: experience.acf?.hero_image || null,
    experienceOverview: experience.acf?.experience_overview || '',
    typicalDuration: experience.acf?.typical_duration || '',
    bestTime: experience.acf?.best_time || '',
    location: experience.acf?.location || '',
    whatToExpect: experience.acf?.what_to_expect || '',
    whoIsItFor: experience.acf?.who_is_it_for || '',
    activityLevel: experience.acf?.activity_level || '',
    experienceHighlights: experience.acf?.experience_highlights || '',

    // Relationships
    destinations: experience.acf?.destinations || [],
    relatedTours: experience.acf?.related_tours || [],

    // Additional information
    importantInformation: experience.acf?.important_information || '',
    faqContent: experience.acf?.faq_content || '',
    featuredExperience: experience.acf?.featured_experience || false,

    // SEO / AEO
    seoTitle: experience.acf?.seo_title || '',
    metaDescription: experience.acf?.meta_description || '',
    canonicalUrl: experience.acf?.canonical_url || '',
    noIndex: experience.acf?.no_index || false,
    ogTitle: experience.acf?.og_title || '',
    ogDescription: experience.acf?.og_description || '',
    socialImage: experience.acf?.social_image || null,

    primarySearchTopic: experience.acf?.primary_search_topic || '',
    secondarySearchTopics: experience.acf?.secondary_search_topics || '',
    searchIntent: experience.acf?.search_intent || '',

    aeoPrimaryQuestion: experience.acf?.aeo_primary_question || '',
    aeoDirectAnswer: experience.acf?.aeo_direct_answer || '',
    aeoSupportingQuestions: experience.acf?.aeo_supporting_questions || '',
    featuredAnswer: experience.acf?.featured_answer || '',
    breadcrumbLabel: experience.acf?.breadcrumb_label || '',
  }
}
