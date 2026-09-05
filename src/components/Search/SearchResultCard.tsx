import { SearchResult } from '@/types/search'

interface Props {
  result: SearchResult
}

export default function SearchResultCard({ result }: Props) {
  return (
    <article>
      {result.image && <img src={result.image} alt={result.title} />}

      <p>{result.type}</p>

      <h2>{result.title}</h2>

      {result.excerpt && (
        <div
          dangerouslySetInnerHTML={{
            __html: result.excerpt,
          }}
        />
      )}

      <a href={result.url}>View Details</a>
    </article>
  )
}
