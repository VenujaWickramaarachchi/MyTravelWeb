interface Props {
  initialQuery?: string
}

export default function SearchForm({ initialQuery = '' }: Props) {
  return (
    <form action='/search' method='get'>
      <label htmlFor='search'>Search Sri Lanka</label>

      <input
        id='search'
        name='q'
        type='search'
        defaultValue={initialQuery}
        placeholder='Search tours, destinations, experiences...'
      />

      <button type='submit'>Search</button>
    </form>
  )
}
