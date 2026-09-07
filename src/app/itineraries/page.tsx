import { getItineraries } from '@/lib/api/itinerary'
import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function ItinerariesPage() {
  const itineraries = await getItineraries()

  return (
    <main>
      <section>
        <div>
          <h1>Itineraries</h1>

          <p>
            Explore carefully planned Sri Lanka itineraries with inspiring
            routes, destinations, experiences, and day-by-day travel ideas.
          </p>
        </div>
      </section>

      <section>
        <div>
          {itineraries.length === 0 ? (
            <p>No itineraries available.</p>
          ) : (
            <EntityGrid>
              {itineraries.map((itinerary: any) => (
                <EntityCard
                  key={itinerary.id}
                  title={itinerary.title}
                  slug={itinerary.slug}
                  href={`/itineraries/${itinerary.slug}`}
                  image={itinerary.heroImage}
                  description={itinerary.description}
                />
              ))}
            </EntityGrid>
          )}
        </div>
      </section>
    </main>
  )
}
