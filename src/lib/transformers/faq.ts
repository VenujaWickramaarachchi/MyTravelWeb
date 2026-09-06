export function transformFAQ(faq: any) {
  return {
    id: faq.id,
    title: faq.title?.rendered || '',
    slug: faq.slug || '',
    question: faq.acf?.question || '',
    answer: faq.acf?.answer || '',
    relatedTour: faq.acf?.related_tour || null,
    relatedDestination: faq.acf?.related_destination || null,
    relatedExperience: faq.acf?.related_experience || null,

    // SEO, Meta & Search Intent Data
    seoTitle: faq.acf?.seo_title || '',
    metaDescription: faq.acf?.meta_description || '',
    canonicalUrl: faq.acf?.canonical_url || '',
    noIndex: faq.acf?.no_index || false,
    ogTitle: faq.acf?.og_title || '',
    ogDescription: faq.acf?.og_description || '',
    socialImage: faq.acf?.social_image || null,
    primarySearchTopic: faq.acf?.primary_search_topic || '',
    secondarySearchTopics: faq.acf?.secondary_search_topics || '',
    searchIntent: faq.acf?.search_intent || '',

    // AEO (Answer Engine Optimization) Data
    aeoPrimaryQuestion: faq.acf?.aeo_primary_question || '',
    aeoDirectAnswer: faq.acf?.aeo_direct_answer || '',
    aeoSupportingQuestions: faq.acf?.aeo_supporting_questions || '',
    featuredAnswer: faq.acf?.featured_answer || '',

    // Breadcrumb
    breadcrumbLabel: faq.acf?.breadcrumb_label || '',
  }
}
