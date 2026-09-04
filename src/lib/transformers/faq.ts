export function transformFAQ(faq: any) {
  return {
    id: faq.id,
    title: faq.title?.rendered || '',
    slug: faq.slug || '',

    // Taxonomy
    faqCategory: faq['faq-category'] || [],

    // FAQ Information
    question: faq.acf?.question || '',
    answer: faq.acf?.answer || '',

    // Relationships
    relatedTour: faq.acf?.related_tour || null,

    relatedDestination: faq.acf?.related_destination || null,

    relatedExperience: faq.acf?.related_experience || null,
  }
}
