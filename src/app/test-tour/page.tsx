import { getTour } from '@/lib/wordpress'

export default async function TestTourPage() {
  const tour = await getTour('southern-sri-lanka-beach-and-heritage-tour')

  if (!tour) {
    return <div>Tour not found</div>
  }

  return <pre>{JSON.stringify(tour, null, 2)}</pre>
}
