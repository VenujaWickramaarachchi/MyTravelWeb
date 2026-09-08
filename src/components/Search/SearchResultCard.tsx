import Link from 'next/link'
import Image from 'next/image'
import { SearchResult } from '@/types/search'

interface Props {
  result: SearchResult
}

const typeLabels: Record<string, { label: string; badgeClass: string }> = {
  tour: { label: 'Tour Package', badgeClass: 'bg-violet/10 text-violet' },
  destination: { label: 'Destination', badgeClass: 'bg-gold/15 text-gold-deep' },
  experience: { label: 'Curated Experience', badgeClass: 'bg-fern/10 text-fern' },
  attraction: { label: 'Attraction', badgeClass: 'bg-amethyst/15 text-amethyst' },
  accommodation: { label: 'Stay & Retreat', badgeClass: 'bg-gold-deep/10 text-gold-deep' },
  itinerary: { label: 'Itinerary Route', badgeClass: 'bg-violet-deep/10 text-violet-deep' },
  'travel-guide': { label: 'Travel Guide', badgeClass: 'bg-lilac/30 text-ink' },
  faq: { label: 'Travel Advisory', badgeClass: 'bg-ink/5 text-ink/70' },
}

export default function SearchResultCard({ result }: Props) {
  const typeInfo = typeLabels[result.type] || {
    label: result.type,
    badgeClass: 'bg-ink/5 text-ink/70',
  }

  return (
    <article className="group bg-white rounded-2xl border border-ink/8 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row">
      {result.image && (
        <div className="relative sm:w-60 md:w-72 shrink-0 aspect-[16/10] sm:aspect-auto min-h-[180px] bg-ivory overflow-hidden">
          <Image
            src={result.image}
            alt={result.title}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="mb-2">
            <span
              className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${typeInfo.badgeClass}`}
            >
              {typeInfo.label}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-ink group-hover:text-violet transition-colors mb-2 leading-snug">
            <Link href={result.url}>{result.title}</Link>
          </h2>

          {result.excerpt && (
            <div
              className="text-sm text-ink/75 line-clamp-2 leading-relaxed font-sans"
              dangerouslySetInnerHTML={{
                __html: result.excerpt,
              }}
            />
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-ink/6 flex items-center justify-between">
          <Link
            href={result.url}
            className="text-xs uppercase tracking-wider font-bold text-violet group-hover:text-violet-deep flex items-center gap-1.5 transition-colors"
          >
            <span>Explore Details</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
