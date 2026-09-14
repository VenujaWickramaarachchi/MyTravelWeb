import Link from 'next/link'

import { getDestinations } from '@/lib/api/destination'
import { getTours } from '@/lib/api/tour'
import { getExperiences } from '@/lib/api/experience'
import { getItineraries } from '@/lib/api/itinerary'
import { getTravelGuides } from '@/lib/api/travel-guide'
import { getTestimonials } from '@/lib/api/testimonials'
import { getPartners } from '@/lib/api/partner'
import { getTrustAwards } from '@/lib/api/trust-award'
import { getTeamMembers } from '@/lib/api/team-member'
import { getSiteSettings, getHomepageHeroDestinations } from '@/lib/wordpress'


import HomeTeam from '@/components/Home/HomeTeam'
import HomeTrustAwards from '@/components/Home/HomeTrustAwards'
import HomePartners from '@/components/Home/HomePartners'
import EntityGrid from '@/components/entities/EntityGrid'
import DestinationCard from '@/components/entities/Destination/DestinationCard'
import TourCard from '@/components/entities/Tour/TourCard'
import ExperienceCard from '@/components/entities/Experience/ExperienceCard'
import ItineraryCard from '@/components/entities/Itinerary/ItineraryCard'
import EntityCard from '@/components/entities/EntityCard'
import SectionHeading from '@/components/Shared/SectionHeading'
import CTA from '@/components/Shared/CTA'
import HomeTestimonials from '@/components/Home/HomeTestimonials'
import HomeHero from '@/components/Hero/HomeHero'

import type { Destination } from '@/types/destination'
import type { HeroItem } from '@/types/hero'

export default async function HomePage() {
  const [
    destinations,
    toursResult,
    experiences,
    itineraries,
    travelGuides,
    testimonials,
    partners,
    trustAwards,
    teamMembers,
    siteSettings,
  ] = await Promise.all([
    getDestinations(),
    getTours({
      page: 1,
      perPage: 100,
    }),
    getExperiences(),
    getItineraries(),
    getTravelGuides(),
    getTestimonials(),
    getPartners(),
    getTrustAwards(),
    getTeamMembers(),
    getSiteSettings()
  ])

  const tours = toursResult.tours

  const featuredDestinations = destinations
    .filter((destination: Destination) => destination.featuredDestination)
    .slice(0, 6)

  const featuredTours = tours
    .filter((tour) => tour.featuredTour)
    .slice(0, 6)

  const featuredExperiences = experiences
    .filter((experience) => experience.featuredExperience)
    .slice(0, 6)

  const featuredItineraries = itineraries
    .filter((itinerary) => itinerary.featuredItinerary)
    .slice(0, 6)

  const featuredTravelGuides = travelGuides
    .filter((guide) => guide.featuredTravelGuide)
    .slice(0, 6)

  // 1. Resolve manually selected hero destinations from Site Settings
  const selectedHeroIds = siteSettings?.homepageHeroDestinations || []
  const selectedDestinations =
    selectedHeroIds.length > 0
      ? await getHomepageHeroDestinations(selectedHeroIds)
      : []

  console.log(
    'HERO ITEMS:',
    selectedDestinations.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      heroImage: item.heroImage?.url,
      galleryImage: item.galleryImages?.[0]?.url,
    })),
  )

  const validSelectedHeroItems = selectedHeroIds.length > 0
    ? selectedDestinations.filter(
      (item) =>
        Boolean(
          item.heroImage?.url ||
          item.galleryImages?.[0]?.url,
        ),
    )
    : []

  let heroDestinations: HeroItem[] = []

  if (validSelectedHeroItems.length > 0) {
    // A. Use manually configured hero items in exact CMS order.
    heroDestinations = validSelectedHeroItems.slice(0, 6)
  } else {
    // B. Fallback remains Destination-only.
    const featuredWithImages = destinations
      .filter(
        (destination: Destination) =>
          destination.featuredDestination &&
          Boolean(
            destination.heroImage?.url ||
            destination.galleryImages?.[0]?.url,
          ),
      )
      .slice(0, 6)

    if (featuredWithImages.length > 0) {
      heroDestinations = featuredWithImages.map((destination: Destination) => ({
        id: destination.id,
        title: destination.title,
        slug: destination.slug,
        heroTitle: destination.heroTitle || destination.title,
        heroSubTitle:
          destination.heroSubTitle || destination.description || '',
        heroImage: destination.heroImage || null,
        galleryImages: destination.galleryImages || [],
        location: destination.location || '',
        type: 'destination',
      }))
    } else {
      heroDestinations = destinations
        .filter((destination: Destination) =>
          Boolean(
            destination.heroImage?.url ||
            destination.galleryImages?.[0]?.url,
          ),
        )
        .slice(0, 6)
        .map((destination: Destination) => ({
          id: destination.id,
          title: destination.title,
          slug: destination.slug,
          heroTitle: destination.heroTitle || destination.title,
          heroSubTitle:
            destination.heroSubTitle || destination.description || '',
          heroImage: destination.heroImage || null,
          galleryImages: destination.galleryImages || [],
          location: destination.location || '',
          type: 'destination',
        }))
    }
  }




  return (
    <main className='space-y-20 sm:space-y-28 pb-20'>
      {/* Dynamic Hero Section */}
      <HomeHero destinations={heroDestinations} />

      {/* Featured Destinations */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-10'>
          <SectionHeading
            eyebrow='Curated Island Regions'
            title="Sri Lanka's Defining Destinations"
            description='From sun-drenched southern coves and sacred ancient ruins to emerald tea estates in the central hills.'
            className='mb-0!'
          />
          <Link
            href='/destinations'
            className='hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-gold-deep uppercase tracking-wider transition-colors pt-4 md:pt-0'
          >
            <span>All Destinations</span>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </div>

        {featuredDestinations.length > 0 && (
          <EntityGrid columns={3}>
            {featuredDestinations.map((destination: Destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </EntityGrid>
        )}

        <div className='mt-8 text-center md:hidden'>
          <Link
            href='/destinations'
            className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-violet border border-violet/30 rounded'
          >
            View All Destinations
          </Link>
        </div>
      </section>

      {/* Featured Tours */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-10'>
          <SectionHeading
            eyebrow='Thoughtfully Designed Routes'
            title='Featured Sri Lanka Tours'
            description='Private, chauffeur-guided holidays balanced with authentic culture, boutique stays, and wildlife safaris.'
            className='mb-0!'
          />
          <Link
            href='/tours'
            className='hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-gold-deep uppercase tracking-wider transition-colors pt-4 md:pt-0'
          >
            <span>View All Tours</span>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </div>

        {featuredTours.length > 0 && (
          <EntityGrid columns={3}>
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </EntityGrid>
        )}

        <div className='mt-8 text-center md:hidden'>
          <Link
            href='/tours'
            className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-violet border border-violet/30 rounded'
          >
            View All Tours
          </Link>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className='bg-ivory/50 py-16 sm:py-20 border-y border-line'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row md:items-end justify-between mb-10'>
            <SectionHeading
              eyebrow='Unforgettable Encounters'
              title='Moments That Make the Journey'
              description='Immerse yourself in authentic island life with experiences that connect you with nature, heritage, and local communities.'
              className='mb-0!'
            />
            <Link
              href='/experiences'
              className='hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-gold-deep uppercase tracking-wider transition-colors pt-4 md:pt-0'
            >
              <span>Explore All Experiences</span>
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
            </Link>
          </div>

          {featuredExperiences.length > 0 && (
            <EntityGrid columns={3}>
              {featuredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </EntityGrid>
          )}

          <div className='mt-8 text-center md:hidden'>
            <Link
              href='/experiences'
              className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-violet border border-violet/30 rounded'
            >
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Itineraries */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-10'>
          <SectionHeading
            eyebrow='Plan Your Journey'
            title='Curated Travel Itineraries'
            description='Ready-to-book and customizable travel itineraries designed around Sri Lanka’s most inspiring destinations.'
            className='mb-0!'
          />
          <Link
            href='/itineraries'
            className='hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-gold-deep uppercase tracking-wider transition-colors pt-4 md:pt-0'
          >
            <span>All Itineraries</span>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </div>

        {featuredItineraries.length > 0 && (
          <EntityGrid columns={3}>
            {featuredItineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </EntityGrid>
        )}

        <div className='mt-8 text-center md:hidden'>
          <Link
            href='/itineraries'
            className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-violet border border-violet/30 rounded'
          >
            Explore Itineraries
          </Link>
        </div>
      </section>
      {/* Testimonials */}
      <HomeTestimonials testimonials={testimonials} />
      {/* Featured Travel Guides */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-10'>
          <SectionHeading
            eyebrow='Expert Island Insights'
            title='Travel Guides & Inspiration'
            description='Practical timing advice, regional secrets, and inspiring articles from our Sri Lankan destination specialists.'
            className='mb-0!'
          />
          <Link
            href='/travel-guides'
            className='hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-gold-deep uppercase tracking-wider transition-colors pt-4 md:pt-0'
          >
            <span>Read All Guides</span>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </Link>
        </div>

        {featuredTravelGuides.length > 0 && (
          <EntityGrid columns={3}>
            {featuredTravelGuides.map((guide) => (
              <EntityCard
                key={guide.id}
                title={guide.title}
                slug={guide.slug}
                href={`/travel-guides/${guide.slug}`}
                image={guide.heroImage}
                description={guide.shortDescription}
                eyebrow='Travel Guide'
              />
            ))}
          </EntityGrid>
        )}
        <div className='mt-8 text-center md:hidden'>
          <Link
            href='/travel-guides'
            className='inline-flex items-center px-6 py-2.5 text-sm font-medium text-violet border border-violet/30 rounded'
          >
            Read Travel Guides
          </Link>
        </div>
      </section>

      {/* Partners */}
      <HomePartners partners={partners} />

      {/* Trust Awards */}
      <HomeTrustAwards trustAwards={trustAwards} />

      {/* Team Members */}
      <HomeTeam teamMembers={teamMembers} />

      {/* Final Global CTA */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <CTA
          title={siteSettings.globalCtaTitle}
          description={siteSettings.globalCtaDescription}
          buttonText={siteSettings.globalCtaButton}
          buttonHref={siteSettings.globalCtaUrl}
        />
      </section>

    </main>
  )
}
