import { getAccommodations } from '@/lib/api/accommodation'
import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function AccommodationsPage() {
  const accommodations = await getAccommodations()

  return (
    <main>
      <section>
        <div>
          <h1>Accommodations</h1>

          <p>
            Find places to stay across Sri Lanka, from luxury resorts and
            boutique hotels to comfortable stays close to the island's
            highlights.
          </p>
        </div>
      </section>

      <section>
        <div>
          {accommodations.length === 0 ? (
            <p>No accommodations available.</p>
          ) : (
            <EntityGrid>
              {accommodations.map((accommodation: any) => (
                <EntityCard
                  key={accommodation.id}
                  title={accommodation.title}
                  slug={accommodation.slug}
                  href={`/accommodations/${accommodation.slug}`}
                  image={accommodation.heroImage}
                  description={accommodation.description}
                />
              ))}
            </EntityGrid>
          )}
        </div>
      </section>
    </main>
  )
}
