import { getAttractions } from '@/lib/api/attraction'
import EntityGrid from '@/components/entities/EntityGrid'
import AttractionCard from '@/components/entities/Attraction/AttractionCard'

export default async function AttractionsPage() {
  const attractions = await getAttractions()

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <header className='max-w-3xl space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep'>
          Icons & Natural Wonders
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Attractions in Sri Lanka
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2'>
          From ancient sky-fortresses and sacred cave temples to hidden mountain
          waterfalls and golden coastal promontories, discover Sri Lanka’s most
          celebrated sights.
        </p>
      </header>

      <section>
        {attractions.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No attractions currently available</h2>
            <p className='text-sm text-ink/70'>We are updating our guide to Sri Lankan attractions. Please check back soon.</p>
          </div>
        ) : (
          <EntityGrid columns={3}>
            {attractions.map((attraction: any) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </EntityGrid>
        )}
      </section>
    </main>
  )
}
