import { getTravelGuides } from '@/lib/api/travel-guide'
import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function TravelGuidesPage() {
  const travelGuides = await getTravelGuides()

  return (
    <main>
      <section>
        <div>
          <h1>Travel Guides</h1>

          <p>
            Get useful Sri Lanka travel guides, tips, ideas, and inspiration to
            help you plan a memorable journey around the island.
          </p>
        </div>
      </section>

      <section>
        <div>
          {travelGuides.length === 0 ? (
            <p>No travel guides available.</p>
          ) : (
            <EntityGrid>
              {travelGuides.map((guide: any) => (
                <EntityCard
                  key={guide.id}
                  title={guide.title}
                  slug={guide.slug}
                  href={`/travel-guides/${guide.slug}`}
                  image={guide.heroImage}
                  description={guide.description}
                />
              ))}
            </EntityGrid>
          )}
        </div>
      </section>
    </main>
  )
}
