import Link from 'next/link'

import { getDestinations } from '@/lib/api/destination'
import { getTours } from '@/lib/api/tour'
import { getExperiences } from '@/lib/api/experience'
import { getItineraries } from '@/lib/api/itinerary'
import { getTravelGuides } from '@/lib/api/travel-guide'

import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function HomePage() {
  const [destinations, tours, experiences, itineraries, travelGuides] =
    await Promise.all([
      getDestinations(),
      getTours(),
      getExperiences(),
      getItineraries(),
      getTravelGuides(),
    ])

  return (
    <main>
      {/* Hero */}
      <section>
        <div>
          <p>Welcome to Sri Lanka</p>

          <h1>Discover the beauty of Sri Lanka</h1>

          <p>
            Explore unforgettable destinations, authentic experiences, carefully
            designed tours, and inspiring journeys across the island.
          </p>

          <div>
            <Link href='/tours'>Explore Tours</Link>

            <Link href='/destinations'>Discover Destinations</Link>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section>
        <div>
          <p>Explore the island</p>

          <h2>Discover Sri Lanka's destinations</h2>

          <p>
            From tropical beaches and ancient cities to misty mountains and
            wildlife-rich landscapes, discover places worth experiencing.
          </p>

          {destinations.length > 0 ? (
            <EntityGrid>
              {destinations
                .filter((destination: any) => destination.featuredDestination)
                .slice(0, 6)
                .map((destination: any) => (
                  <EntityCard
                    key={destination.id}
                    title={destination.title}
                    slug={destination.slug}
                    href={`/destinations/${destination.slug}`}
                    image={destination.heroImage}
                    description={destination.description}
                  />
                ))}
            </EntityGrid>
          ) : (
            <p>No destinations available.</p>
          )}

          <Link href='/destinations'>View All Destinations</Link>
        </div>
      </section>

      {/* Tours */}
      <section>
        <div>
          <p>Travel your way</p>

          <h2>Explore our tours</h2>

          <p>
            Find thoughtfully planned journeys designed to help you experience
            the best of Sri Lanka.
          </p>

          {tours.length > 0 ? (
            <EntityGrid>
              {tours
                .filter((tour: any) => tour.featuredTour)
                .slice(0, 6)
                .map((tour: any) => (
                  <EntityCard
                    key={tour.id}
                    title={tour.title}
                    slug={tour.slug}
                    href={`/tours/${tour.slug}`}
                    image={tour.heroImage}
                    description={tour.shortDescription}
                  />
                ))}
            </EntityGrid>
          ) : (
            <p>No tours available.</p>
          )}

          <Link href='/tours'>View All Tours</Link>
        </div>
      </section>

      {/* Experiences */}
      <section>
        <div>
          <p>Experience Sri Lanka</p>

          <h2>Moments that make the journey</h2>

          <p>
            Discover authentic experiences that bring Sri Lanka's culture,
            nature, food, adventure, and people closer to you.
          </p>

          {experiences.length > 0 ? (
            <EntityGrid>
              {experiences
                .filter((experience: any) => experience.featuredExperience)
                .slice(0, 6)
                .map((experience: any) => (
                  <EntityCard
                    key={experience.id}
                    title={experience.title}
                    slug={experience.slug}
                    href={`/experiences/${experience.slug}`}
                    image={experience.heroImage}
                    description={experience.shortDescription}
                  />
                ))}
            </EntityGrid>
          ) : (
            <p>No experiences are available</p>
          )}
          <Link href='/experiences'>Explore Experiences</Link>
        </div>
      </section>

      {/* Itineraries */}
      <section>
        <div>
          <p>Plan your journey</p>

          <h2>Travel with an itinerary that fits you</h2>

          <p>
            Explore ready-made Sri Lanka itineraries created around
            destinations, experiences, and unforgettable moments.
          </p>

          {itineraries.length > 0 ? (
            <EntityGrid>
              {itineraries
                .filter((itinerary: any) => itinerary.featuredItinerary)
                .slice(0, 6)
                .map((itinerary: any) => (
                  <EntityCard
                    key={itinerary.id}
                    title={itinerary.title}
                    slug={itinerary.slug}
                    href={`/itineraries/${itinerary.slug}`}
                    image={itinerary.heroImage}
                    description={itinerary.shortDescription}
                  />
                ))}
            </EntityGrid>
          ) : (
            <p>No itineraries available</p>
          )}

          <Link href='/itineraries'>Explore Itineraries</Link>
        </div>
      </section>

      {/* Travel Guides */}
      <section>
        <div>
          <p>Travel inspiration</p>

          <h2>Travel guides & inspiration</h2>

          <p>
            Get useful ideas, travel tips, and inspiration for planning your Sri
            Lankan adventure.
          </p>

          {travelGuides.length > 0 ? (
            <EntityGrid>
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
                  />
                ))}
            </EntityGrid>
          ) : (
            <p>No travel guides are available</p>
          )}

          <Link href='/travel-guides'>Read Travel Guides</Link>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div>
          <h2>Ready to explore Sri Lanka?</h2>

          <p>
            Tell us what kind of journey you're dreaming of and start planning
            your Sri Lankan adventure.
          </p>

          <Link href='/contact'>Plan Your Trip</Link>
        </div>
      </section>
    </main>
  )
}
