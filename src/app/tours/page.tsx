import { getTours } from '@/lib/api/tour'
import EntityGrid from '@/components/entities/EntityGrid'
import TourCard from '@/components/entities/Tour/TourCard'

export default async function ToursPage() {
  const tours = await getTours()

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12'>
      <header className='max-w-3xl space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep'>
          Handcrafted Private Journeys
        </p>
        <h1 className='font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight'>
          Sri Lanka Tours & Tailor-Made Holidays
        </h1>
        <p className='text-base sm:text-lg text-ink/75 leading-relaxed pt-2'>
          Discover our collection of thoughtfully planned private tours, complete with
          dedicated chauffeur-guides, hand-picked boutique hotels, and authentic local
          experiences tailored entirely to your style.
        </p>
      </header>

      <section>
        {tours.length === 0 ? (
          <div className='p-12 text-center rounded border border-line bg-ivory/50 space-y-2'>
            <h2 className='font-serif text-xl font-medium text-ink'>No tours currently available</h2>
            <p className='text-sm text-ink/70'>We are preparing our latest handcrafted tour routes. Please contact our team for custom itineraries.</p>
          </div>
        ) : (
          <EntityGrid columns={3}>
            {tours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </EntityGrid>
        )}
      </section>
    </main>
  )
}
