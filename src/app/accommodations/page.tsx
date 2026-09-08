import { getAccommodations } from '@/lib/api/accommodation'
import EntityGrid from '@/components/entities/EntityGrid'
import AccommodationCard from '@/components/entities/Accommodation/AccommodationCard'

export default async function AccommodationsPage() {
  const accommodations = await getAccommodations()

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <header className='max-w-3xl space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amethyst'>
          Curated Places to Stay
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Boutique Stays & Resorts in Sri Lanka
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2'>
          From colonial tea planter bungalows and beachfront boutique villas to luxury safari
          lodges and eco-resorts tucked inside rain forests.
        </p>
      </header>

      <section>
        {accommodations.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No accommodations currently available</h2>
            <p className='text-sm text-ink/70'>We are updating our curated hotel selections. Please check back soon.</p>
          </div>
        ) : (
          <EntityGrid columns={3}>
            {accommodations.map((accommodation: any) => (
              <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
              />
            ))}
          </EntityGrid>
        )}
      </section>
    </main>
  )
}
