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
  }
}
