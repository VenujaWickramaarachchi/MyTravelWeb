import Link from 'next/link'
import { searchContent } from '@/lib/wordpress'

import SearchResults from '@/components/Search/SearchResults'
import SearchForm from '@/components/Search/SearchForm'
import Breadcrumbs from '@/components/Shared/Breadcrumbs'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams

  const query = q?.trim() || ''
  const results = query ? await searchContent(query, 20) : []

  const initialResults = results.slice(0, 12)
  const total = results.length
  const totalPages = Math.ceil(total / 12)
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
  ]

  const suggestedSearches = [
    'Sigiriya',
    'Kandy',
    'Galle Fort',
    'Ella',
    'Wildlife Safari',
    'Tea Plantations',
    'Mirissa',
    'Honeymoon',
  ]

  return (
    <main className="min-h-screen bg-paper pb-24">
      {/* Search Header Banner */}
      <section className="bg-violet-deep text-ivory py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-3">
            Explore the Wonder of Sri Lanka
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ivory mb-6 tracking-tight">
            Search Island Journeys
          </h1>
          <SearchForm initialQuery={query} />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {query ? (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-6">
            <div>
              <p className="text-sm uppercase tracking-wider text-ink/50 font-semibold mb-1">
                Search Results
              </p>
              <h2 className="text-2xl font-serif font-bold text-ink">
                Results for &ldquo;<span className="text-violet">{query}</span>&rdquo;
              </h2>
            </div>
            <div className="flex items-center gap-4 self-start sm:self-auto">
              <span className="text-sm font-semibold text-ink/70 px-4 py-1.5 rounded-full bg-white border border-ink/8">
                {results.length === 1
                  ? '1 result found'
                  : `${results.length} results found`}
              </span>

              <Link
                href="/search"
                className="text-sm font-medium text-ink/60 hover:text-violet underline underline-offset-4 transition-colors"
              >
                Clear Search
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-serif font-bold text-ink">
              Popular Searches to Spark Your Inspiration
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 rounded-full bg-white border border-ink/10 text-sm font-medium text-ink hover:bg-violet-deep hover:text-ivory transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <SearchResults
            initialResults={initialResults}
            initialTotal={total}
            initialTotalPages={totalPages}
            query={query}
          />
        )}

        {query && results.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-ink/8 shadow-xs space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-ivory text-gold flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-2xl font-serif font-bold text-ink">
              No results found for &ldquo;{query}&rdquo;
            </h3>
            <p className="text-ink/70 leading-relaxed text-sm">
              We couldn&apos;t find anything matching your search. Try checking your spelling,
              using a broader term, or explore one of our popular searches below.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {suggestedSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3.5 py-1.5 rounded-full bg-paper border border-ink/10 text-xs font-semibold text-ink hover:bg-violet-deep hover:text-ivory transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
