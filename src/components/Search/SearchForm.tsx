interface Props {
  initialQuery?: string
}

export default function SearchForm({ initialQuery = '' }: Props) {
  return (

    <form action="/search" method="get" className="relative max-w-3xl mx-auto">
      <label htmlFor="search" className="sr-only">
        Search Sri Lanka
      </label>

      <div className="relative flex items-center shadow-lg rounded-full bg-white border border-ink/12 overflow-hidden p-1.5 focus-within:ring-2 focus-within:ring-violet focus-within:border-transparent transition-all">
        <div className="pl-4 pr-2 text-ink/40 pointer-events-none">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          id="search"
          name="q"
          type="search"
          defaultValue={initialQuery}
          minLength={2}
          required
          autoComplete="off"
          placeholder="Search tours, destinations, tea estates, safaris..."
          className="w-full bg-transparent px-2 py-3 text-ink text-base md:text-lg placeholder:text-ink/40 focus:outline-none"
        />

        <button
          type="submit"
          className="shrink-0 px-6 sm:px-8 py-3 rounded-full bg-gold hover:bg-gold-deep text-ink font-semibold text-sm tracking-wide shadow-sm transition-colors duration-200"
        >
          Search
        </button>
      </div>
      <p className="mt-3 text-xs text-ivory/60">
        Try searching by destination, experience, tour, or travel topic.
      </p>
    </form>
  )
}
