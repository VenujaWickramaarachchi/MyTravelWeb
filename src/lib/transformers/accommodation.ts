export function transformAccommodation(accommodation: any) {
  return {
    id: accommodation.id,
    title: accommodation.title?.rendered,
    slug: accommodation.slug,

    accommodationType: accommodation['accommodation-type'] || [],
    region: accommodation.region || [],
    destination: accommodation.acf?.destination || null,

    heroTitle: accommodation.acf?.hero_title || '',
    heroSubTitle: accommodation.acf?.hero_subtitle || '',
    heroImage: accommodation.acf?.hero_image || null,

    description: accommodation.acf?.short_description || '',
    whyStayHere: accommodation.acf?.why_stay_here || '',
    gallery: accommodation.acf?.gallery || null,
    stars: accommodation.acf?.star_rating || null,
    amenities: accommodation.acf?.amenities || [],
    price: accommodation.acf?.price_range || '',

    overview: accommodation.acf?.destination_overview || '',

    location: accommodation.acf?.location || '',
    address: accommodation.acf?.address || '',
    latitude: accommodation.acf?.latitude || null,
    longitude: accommodation.acf?.longitude || null,
    googleMapsUrl: accommodation.acf?.google_maps_url || '',

    officialWebsite: accommodation.acf?.official_website || '',
    bookingUrl: accommodation.acf?.booking_url || '',
    contactPhone: accommodation.acf?.contact_phone || '',
    email: accommodation.acf?.email || '',

    seoTitle: accommodation.acf?.seo_title || '',
    seoDescription: accommodation.acf?.seo_description || '',
    seoKeywords: accommodation.acf?.seo_keywords || '',
    aeoQuestion: accommodation.acf?.aeo_question || '',
    aeoAnswer: accommodation.acf?.aeo_answer || '',
  }
}
