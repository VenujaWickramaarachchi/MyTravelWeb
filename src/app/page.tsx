import Link from 'next/link'

import { getDestinations } from '@/lib/api/destination'
import { getTours } from '@/lib/api/tour'
import { getExperiences } from '@/lib/api/experience'
import { getItineraries } from '@/lib/api/itinerary'
import { getTravelGuides } from '@/lib/api/travel-guide'

import EntityGrid from '@/components/entities/EntityGrid'
import DestinationCard from '@/components/entities/Destination/DestinationCard'
import TourCard from '@/components/entities/Tour/TourCard'
import ExperienceCard from '@/components/entities/Experience/ExperienceCard'
import ItineraryCard from '@/components/entities/Itinerary/ItineraryCard'
import EntityCard from '@/components/entities/EntityCard'
import SectionHeading from '@/components/Shared/SectionHeading'
import CTA from '@/components/Shared/CTA'

export default async function HomePage() {
  const [destinations, toursResult, experiences, itineraries, travelGuides] =
    await Promise.all([
      getDestinations(),
      getTours(),
      getExperiences(),
      getItineraries(),
      getTravelGuides(),
    ])

  const tours = toursResult.tours

  return (
    <main className='space-y-20 sm:space-y-28 pb-20'>
      {/* Hero Section */}
      <section className='relative bg-violet-deep text-ivory overflow-hidden py-24 sm:py-32 lg:py-36 border-b border-white/10'>
        {/* Subtle background glow */}
        <div
          className='absolute inset-0 opacity-20 pointer-events-none'
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top center, #8B5FBF 0%, transparent 70%)',
          }}
          aria-hidden='true'
        />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='max-w-3.5xl mx-auto space-y-6'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs tracking-[0.2em] uppercase font-semibold text-gold'>
              <span>Ayubowan</span>
              <span className='text-ivory/60'>•</span>
              <span>Sri Lanka Tailor-Made</span>
            </div>

            <h1 className='font-serif text-4xl sm:text-5xl lg:text-6.5xl font-normal leading-[1.12] tracking-tight text-ivory'>
              Discover the Soul & Splendour of Sri Lanka
            </h1>

            <p className='text-lg sm:text-xl text-lilac leading-relaxed max-w-2xl mx-auto font-light'>
              Experience an island of ancient kingdoms, misty tea highlands, wild
              leopard sanctuaries, and tranquil tropical shores through thoughtfully
              curated private journeys.
            </p>

            <div className='pt-4 flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link
                href='/tours'
                className='w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-ink bg-gold hover:bg-gold-deep rounded transition-colors duration-150 shadow-md text-center'
              >
                Explore Handcrafted Tours
              </Link>

              <Link
                href='/destinations'
                className='w-full sm:w-auto px-8 py-3.5 text-base font-medium text-ivory border border-white/25 hover:border-gold hover:text-gold rounded transition-colors duration-150 text-center'
              >
                Discover Destinations
              </Link>
            </div>
          </div>

          {/* Key island attributes bar */}
          <div className='mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto'>
            <div>
              <span className='block text-gold text-lg font-serif font-medium'>8 UNESCO</span>
              <span className='text-xs text-lilac'>World Heritage Sites</span>
            </div>
            <div>
              <span className='block text-gold text-lg font-serif font-medium'>1,340 km</span>
              <span className='text-xs text-lilac'>Tropical Coastlines</span>
            </div>
            <div>
              <span className='block text-gold text-lg font-serif font-medium'>26 Parks</span>
              <span className='text-xs text-lilac'>National Wildlife Reserves</span>
            </div>
            <div>
              <span className='block text-gold text-lg font-serif font-medium'>100% Private</span>
              <span className='text-xs text-lilac'>Chauffeur-Guided Travel</span>
            </div>
          </div>
        </div>
      </section>

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

        {destinations.length > 0 ? (
          <EntityGrid columns={3}>
            {destinations
              .filter((destination: any) => destination.featuredDestination)
              .slice(0, 6)
              .map((destination: any) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
          </EntityGrid>
        ) : (
          <div className='p-8 rounded border border-line bg-paper text-center text-ink/70'>
            <p>No featured destinations available.</p>
          </div>
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

        {tours.length > 0 ? (
          <EntityGrid columns={3}>
            {tours
              .filter((tour: any) => tour.featuredTour)
              .slice(0, 6)
              .map((tour: any) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
          </EntityGrid>
        ) : (
          <div className='p-8 rounded border border-line bg-paper text-center text-ink/70'>
            <p>No featured tours available.</p>
          </div>
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

          {experiences.length > 0 ? (
            <EntityGrid columns={3}>
              {experiences
                .filter((experience: any) => experience.featuredExperience)
                .slice(0, 6)
                .map((experience: any) => (
                  <ExperienceCard key={experience.id} experience={experience} />
                ))}
            </EntityGrid>
          ) : (
            <div className='p-8 rounded border border-line bg-paper text-center text-ink/70'>
              <p>No featured experiences available.</p>
            </div>
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

        {itineraries.length > 0 ? (
          <EntityGrid columns={3}>
            {itineraries
              .filter((itinerary: any) => itinerary.featuredItinerary)
              .slice(0, 6)
              .map((itinerary: any) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
          </EntityGrid>
        ) : (
          <div className='p-8 rounded border border-line bg-paper text-center text-ink/70'>
            <p>No featured itineraries available.</p>
          </div>
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

        {travelGuides.length > 0 ? (
          <EntityGrid columns={3}>
            {travelGuides
              .filter((guide: any) => guide.featuredTravelGuide)
              .slice(0, 6)
              .map((guide: any) => (
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
        ) : (
          <div className='p-8 rounded border border-line bg-paper text-center text-ink/70'>
            <p>No featured travel guides available.</p>
          </div>
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

      {/* Final Global CTA */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <CTA
          eyebrow='Begin Your Adventure'
          title='Ready to Explore Sri Lanka?'
          description="Tell us what kind of journey you're dreaming of — whether a relaxed coastal escape, wildlife exploration, or grand cultural tour — and let us design your tailor-made holiday."
          buttonText='Plan Your Trip'
          buttonHref='/contact'
        />
      </section>
    </main>
  )
}
