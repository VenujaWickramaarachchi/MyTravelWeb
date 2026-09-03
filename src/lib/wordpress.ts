const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

// Generic fetch function
async function fetchAPI(endpoint: string) {
  const res = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching ${endpoint}`)
  }

  return res.json()
}
async function fetchByIds(endpoint: string, ids: number[]) {
  if (!ids || ids.length === 0) {
    return []
  }

  return fetchAPI(`${endpoint}?include=${ids.join(',')}&_embed`)
}

// Fetching Components

// Destinations

export async function getDestinations() {
  return fetchAPI('destination?per_page=100&_embed')
}
// Single Destination

export async function getDestination(slug: string) {
  const url = `${WORDPRESS_URL}/wp-json/wp/v2/destination?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  const data = await res.json()

  const destination = data[0]

  if (!destination) {
    return null
  }

  // Fetch relationships

  const accommodationIds = destination.acf?.featured_accommodations || []

  const nearbyIds = destination.acf?.nearby_destinations || []

  const tourIds = destination.acf?.related_tours || []

  const experienceIds = destination.acf?.experiences || []

  const [accommodations, nearbyDestinations, relatedTours, experiences] =
    await Promise.all([
      fetchByIds('accommodation', accommodationIds),

      fetchByIds('destination', nearbyIds),

      fetchByIds('tour', tourIds),

      fetchByIds('experience', experienceIds),
    ])

  return {
    ...destination,

    relationships: {
      accommodations,

      nearbyDestinations,

      relatedTours,

      experiences,
    },
  }
}

// Tours

export async function getTours() {
  return fetchAPI('tour?_embed')
}

// Experiences

export async function getExperiences() {
  return fetchAPI('experience?_embed')
}

// FAQs

export async function getFAQs() {
  return fetchAPI('faq?_embed')
}

// Accommodations

export async function getAccommodations() {
  return fetchAPI('accommodation?_embed')
}
