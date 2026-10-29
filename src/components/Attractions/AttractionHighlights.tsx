import type { Attraction } from '@/types/attraction'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

interface Props {
  attraction: Attraction
  className?: string
}

/**
 * Parses dense highlight paragraphs into a clean, bulleted list.
 * Breaks down sentences or existing lists into scannable editorial items.
 */
function parseHighlights(textOrHtml: string): string[] {
  if (!textOrHtml) return []

  // Check if it already contains <li> tags
  const liMatches = textOrHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi)
  if (liMatches && liMatches.length > 0) {
    const parsed = liMatches
      .map((item) => item.replace(/<[^>]*>?/gm, '').trim())
      .filter((item) => item.length > 10)
    if (parsed.length > 0) return parsed
  }

  // Strip HTML tags to get clean plain text
  const plain = textOrHtml
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>?/gm, '')
    .trim()

  // Check for lines separated by newlines or bullet symbols
  const rawLines = plain
    .split(/\n+/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ''))
    .filter((l) => l.length > 15)

  if (rawLines.length > 1) {
    return rawLines
  }

  // If written as dense paragraphs, break them down into sentence bullets
  const sentences = plain
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
    .filter((s) => s.length > 15)

  if (sentences.length > 0) {
    return sentences
  }

  return rawLines.length > 0 ? rawLines : [plain]
}

export default function AttractionHighlights({
  attraction,
  className = '',
}: Props) {
  if (!attraction.whatToSee && !attraction.attractionHighlights) {
    return null
  }

  const highlightBullets = parseHighlights(attraction.attractionHighlights || '')

  return (
    <section className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header with Strict Global Typography */}
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Sightseeing Focus
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          What to See at {attraction.title}
        </h2>
      </header>

      {/* What to See Narrative */}
      {attraction.whatToSee && (
        <div
          className='prose-editorial text-[15px] sm:text-base text-ink/80 leading-relaxed font-light [&>p]:mb-2.5 [&>p:last-child]:mb-0'
          dangerouslySetInnerHTML={{
            __html: attraction.whatToSee,
          }}
        />
      )}

      {/* Key Highlights: Converted from dense paragraphs to clean bulleted list */}
      {highlightBullets.length > 0 && (
        <div className='space-y-3 pt-2 sm:pt-4'>
          <h3 className='font-serif text-lg sm:text-xl lg:text-2xl font-medium text-ink'>
            Key Highlights
          </h3>

          <div className='rounded-2xl border border-line bg-paper/60 p-5 sm:p-7'>
            <ul className='space-y-3 sm:space-y-3.5 divide-y divide-line/60'>
              {highlightBullets.map((highlight, idx) => (
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
        </div>
      )}
    </section>
  )
}
