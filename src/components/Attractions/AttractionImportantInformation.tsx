import type { Attraction } from '@/types/attraction'
import { BespokeLotusIcon, CheckIcon } from '@/components/Shared/CardIcons'

interface Props {
  attraction: Attraction
  className?: string
}

/**
 * Parses a heavy block of visitor text into practical, scannable checklist rules
 * (e.g. dress code, water, climbing steps, photography rules, timing).
 */
function parseImportantRules(textOrHtml: string): string[] {
  if (!textOrHtml) return []

  // Check if it already contains <li> tags
  const liMatches = textOrHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi)
  if (liMatches && liMatches.length > 0) {
    const parsed = liMatches
      .map((item) => item.replace(/<[^>]*>?/gm, '').trim())
      .filter((item) => item.length > 10)
    if (parsed.length > 0) return parsed
  }

  // Strip HTML
  const plain = textOrHtml
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>?/gm, '')
    .trim()

  // Check for lines separated by newlines or bullets
  const lines = plain
    .split(/\n+/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ''))
    .filter((l) => l.length > 15)

  if (lines.length > 1) {
    return lines
  }

  // Break dense paragraph into sentence rules
  const sentences = plain
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
    .filter((s) => s.length > 15)

  if (sentences.length > 0) {
    return sentences
  }

  return lines.length > 0 ? lines : [plain]
}

export default function AttractionImportantInformation({
  attraction,
  className = '',
}: Props) {
  if (!attraction.importantInformation) {
    return null
  }

  const rules = parseImportantRules(attraction.importantInformation)

  return (
    <section className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header with Strict Global Typography */}
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Visitor Essentials
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Important Visitor Information
        </h2>
        <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
          Essential guidelines, dress codes, and practical advice to ensure a seamless visit.
        </p>
      </header>

      {/* Easy-to-Read Bulleted Checklist */}
      <div className='rounded-2xl border border-line bg-paper/60 p-5 sm:p-7'>
        <ul className='space-y-3 sm:space-y-3.5 divide-y divide-line/60'>
          {rules.map((rule, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-3 sm:gap-3.5 group ${
                idx > 0 ? 'pt-3 sm:pt-3.5' : ''
              }`}
            >
              <div className='w-5 h-5 rounded-full bg-gold/15 border border-gold/30 text-gold-deep flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gold group-hover:text-ink transition-colors duration-200'>
                <CheckIcon className='w-3 h-3' />
              </div>
              <p className='text-[15px] sm:text-base text-ink/80 leading-relaxed font-light'>
                {rule}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
