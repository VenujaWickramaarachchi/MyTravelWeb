import { searchContent } from '@/lib/wordpress'
import SearchResultCard from '@/components/Search/SearchResultCard'
import SearchForm from '@/components/Search/SearchForm'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams

  const query = q?.trim() || ''
  const results = query ? await searchContent(query) : []

  return (
    <main>
      <h1>Search Sri Lanka</h1>
      <SearchForm initialQuery={query} />

      {query ? (
        <p>
          Search results for: <strong>{query}</strong>
        </p>
      ) : (
        <p>
          Enter a search term to find tours, destinations, experiences, and
          more.
        </p>
      )}

      {query && (
        <p>
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      )}

      {results.length > 0 && (
        <section>
          {results.map((result) => (
            <SearchResultCard
              key={`${result.type}-${result.id}`}
              result={result}
            />
          ))}
        </section>
      )}

      {query && results.length === 0 && <p>No results found.</p>}
    </main>
  )
}
