import { Tour } from '@/types/tour'
import { CheckIcon } from '@/components/Shared/CardIcons'

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
    <section className={`space-y-5 pt-2 ${className}`}>
      <header>
        <span className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep block mb-1.5'>
          Memorable Moments
        </span>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Tour Highlights
        </h2>
      </header>

      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 pt-1'>
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className='flex items-start gap-3 text-[15px] sm:text-base text-ink/80 leading-relaxed font-light'
          >
            <span className='w-5 h-5 rounded-full bg-gold/15 text-gold-deep flex items-center justify-center flex-shrink-0 mt-0.5'>
              <CheckIcon className='w-3 h-3' />
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
