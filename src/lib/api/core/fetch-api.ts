const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

interface FetchAPIOptions {
  returnResponse?: boolean
}

export async function fetchAPI(
  endpoint: string,
  options: FetchAPIOptions = {},
) {
  const res = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`,
    {
      next: {
        revalidate: 60,
      },
    },
  )

  if (!res.ok) {
    throw new Error(`Failed fetching ${endpoint}`)
  }

  const data = await res.json()

  if (options.returnResponse) {
    return {
      data,
      headers: res.headers,
    }
  }

  return data
}