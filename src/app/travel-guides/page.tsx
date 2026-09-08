import { getTravelGuides } from '@/lib/api/travel-guide'
import EntityCard from '@/components/entities/EntityCard'
import EntityGrid from '@/components/entities/EntityGrid'

export default async function TravelGuidesPage() {
  const travelGuides = await getTravelGuides()

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <header className='max-w-3xl space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep'>
          Island Knowledge & Perspectives
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Sri Lanka Travel Guides & Inspiration
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2'>
          In-depth guides, practical advice, regional recommendations, and insider travel
          notes to help you prepare for an unforgettable Sri Lankan adventure.
        </p>
      </header>

      <section>
        {travelGuides.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No travel guides currently available</h2>
            <p className='text-sm text-ink/70'>We are currently authoring new editorial travel guides. Please check back soon.</p>
          </div>
        ) : (
          <EntityGrid columns={3}>
            {travelGuides.map((guide: any) => (
              <EntityCard
                key={guide.id}
                title={guide.title}
                slug={guide.slug}
                href={`/travel-guides/${guide.slug}`}
                image={guide.heroImage}
                description={guide.shortDescription || guide.description}
                eyebrow='Editorial Guide'
              />
            ))}
          </EntityGrid>
        )}
      </section>
    </main>
  )
}
