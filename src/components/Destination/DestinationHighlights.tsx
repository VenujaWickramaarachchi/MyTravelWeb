import type { Destination } from '@/types/destination'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

interface Props {
  destination: Destination
  className?: string
}

function parseHighlights(thingsToDo: string, destinationTitle: string): string[] {
  if (thingsToDo) {
    const plain = thingsToDo.replace(/<[^>]*>?/gm, '').trim()
    const lines = plain
      .split(/\n+/)
      .map((l) => l.trim().replace(/^[-•*]\s*/, ''))
      .filter((l) => l.length > 15)
    if (lines.length > 0) {
      return lines
    }
  }

  return [
    `Tour historic local landmarks and learn traditional production processes.`,
    `Enjoy scenic excursions and panoramic photo opportunities across the region.`,
    `Hike through misty nature reserves, cascading waterfalls, and cloud-covered trails.`,
    `Indulge in authentic regional cuisine and traditional dining experiences.`,
  ]
}

export default function DestinationHighlights({ destination, className = '' }: Props) {
  const highlights = parseHighlights(destination.thingsToDo || '', destination.title)

  if (highlights.length === 0) return null

  return (
    <section className={`space-y-4 sm:space-y-5 ${className}`}>
      {/* Section Header with Strict Global Typography */}
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Signature Highlights
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Signature Activities & Highlights in {destination.title}
        </h2>
        <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
          Curated sights, nature trails, and authentic experiences recommended by our local travel specialists.
        </p>
      </header>

      {/* Clean, Scannable Bulleted List */}
      <div className='rounded-2xl border border-line bg-paper/60 p-5 sm:p-7'>
        <ul className='space-y-3 sm:space-y-3.5 divide-y divide-line/60'>
          {highlights.map((highlight, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-2.5 sm:gap-3.5 group ${
                idx > 0 ? 'pt-3 sm:pt-3.5' : ''
              }`}
            >
              <div className='mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 group-hover:scale-125 transition-transform duration-200' />
              <p className='text-[15px] sm:text-base text-ink/80 leading-relaxed font-light'>
                {highlight}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
