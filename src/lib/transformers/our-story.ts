import { MediaImage } from '@/types/media-image'

function normalizeSingleImage(image: any): MediaImage | null {
  if (Array.isArray(image)) {
    image = image[0]
  }

  if (!image || typeof image !== 'object') {
    return null
  }

  return {
    id: image.ID ?? image.id ?? 0,
    url: image.url ?? '',
    alt: image.alt ?? '',
    width: image.width ?? null,
    height: image.height ?? null,
    title: image.title ?? '',
  }
}

export function transformOurStory(post: any) {
  return {
    id: post.id,
    title: post.title?.rendered || '',
    slug: post.slug || '',

    // Hero
    heroTitle: post.acf?.hero_title || '',
    heroSubtitle: post.acf?.hero_subtitle || '',
    heroImage: normalizeSingleImage(post.acf?.hero_image),

    // Content
    introduction: post.acf?.introduction || '',

    storyTitle: post.acf?.story_title || '',
    storyContent: post.acf?.story_content || '',
    storyImage: normalizeSingleImage(post.acf?.story_image),

    philosophyTitle: post.acf?.philosophy_title || '',
    philosophyContent: post.acf?.philosophy_content || '',

    whyChooseUsTitle: post.acf?.why_choose_us_title || '',
    whyChooseUsContent: post.acf?.why_choose_us_content || '',

    approachTitle: post.acf?.approach_title || '',
    approachContent: post.acf?.approach_content || '',

    // CTA
    ctaTitle: post.acf?.cta_title || '',
    ctaDescription: post.acf?.cta_description || '',
    ctaButtonText: post.acf?.cta_button_text || '',
    ctaButtonUrl: post.acf?.cta_button_url || '',

    // SEO
    seoTitle: post.acf?.seo_title || '',
    metaDescription: post.acf?.meta_description || '',
    canonicalUrl: post.acf?.canonical_url || '',
    noIndex: post.acf?.no_index || false,
    ogTitle: post.acf?.og_title || '',
    ogDescription: post.acf?.og_description || '',
    socialImage: normalizeSingleImage(post.acf?.social_image),

    // Search
    primarySearchTopic: post.acf?.primary_search_topic || '',
    secondarySearchTopics: post.acf?.secondary_search_topics || '',
    searchIntent: post.acf?.search_intent || '',

    // AEO
    aeoPrimaryQuestion: post.acf?.aeo_primary_question || '',
    aeoDirectAnswer: post.acf?.aeo_direct_answer || '',
    aeoSupportingQuestions: post.acf?.aeo_supporting_questions || '',
    featuredAnswer: post.acf?.featured_answer || '',

    // Breadcrumb
    breadcrumbLabel: post.acf?.breadcrumb_label || '',
  }
}
