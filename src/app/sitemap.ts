import type { MetadataRoute } from 'next'

import {
  getTours,
  getDestinations,
  getExperiences,
  getAttractions,
  getAccommodations,
  getItineraries,
  getFAQs,
  getTravelGuides,
} from '@/lib/wordpress'

const SITE_URL = 'https://vioralanka.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    toursResult,
    destinations,
    experiences,
    attractions,
    accommodations,
    itineraries,
    faqs,
    travelGuides,
  ] = await Promise.all([
    getTours(),
    getDestinations(),
    getExperiences(),
    getAttractions(),
    getAccommodations(),
    getItineraries(),
    getFAQs(),
    getTravelGuides(),
  ])
  const tours = toursResult.tours

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
    },
    {
      url: `${SITE_URL}/tours`,
    },
    {
      url: `${SITE_URL}/destinations`,
    },
    {
      url: `${SITE_URL}/experiences`,
    },
    {
      url: `${SITE_URL}/attractions`,
    },
    {
      url: `${SITE_URL}/accommodations`,
    },
    {
      url: `${SITE_URL}/itineraries`,
    },
    {
      url: `${SITE_URL}/faqs`,
    },
    {
      url: `${SITE_URL}/travel-guides`,
    },
  ]

  const dynamicPages: MetadataRoute.Sitemap = [
    ...tours.map((item: { slug: string }) => ({
      url: `${SITE_URL}/tours/${item.slug}`,
    })),

    ...destinations.map((item: { slug: string }) => ({
      url: `${SITE_URL}/destinations/${item.slug}`,
    })),

    ...experiences.map((item) => ({
      url: `${SITE_URL}/experiences/${item.slug}`,
    })),

    ...attractions.map((item) => ({
      url: `${SITE_URL}/attractions/${item.slug}`,
    })),

    ...accommodations.map((item) => ({
      url: `${SITE_URL}/accommodations/${item.slug}`,
    })),

    ...itineraries.map((item) => ({
      url: `${SITE_URL}/itineraries/${item.slug}`,
    })),

    ...faqs.map((item) => ({
      url: `${SITE_URL}/faqs/${item.slug}`,
    })),

    ...travelGuides.map((item) => ({
      url: `${SITE_URL}/travel-guides/${item.slug}`,
    })),
  ]

  return [...staticPages, ...dynamicPages]
}
