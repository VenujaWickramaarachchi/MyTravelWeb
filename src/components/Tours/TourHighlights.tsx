import { Tour } from '@/types/tour'

interface TourHighlightsProps {
  tour: Tour
  className?: string
}

export default function TourHighlights({
  tour,
  className = '',
}: TourHighlightsProps) {
  const highlights = (tour.tourHighlights || '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

  if (highlights.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 bg-ivory/60 py-16 border-y border-line ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Memorable Moments
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Tour Highlights
          </h2>
        </header>

        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className='p-4 rounded border border-line bg-paper flex items-start gap-3 text-sm text-ink/85 leading-relaxed'
            >
              <span className='text-gold text-lg flex-shrink-0 leading-none mt-0.5'>✦</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
