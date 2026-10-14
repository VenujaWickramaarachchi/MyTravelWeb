const WORDPRESS_URL = (process.env.NEXT_PUBLIC_WORDPRESS_URL || '').replace(/\/$/, '')

interface FetchAPIOptions {
  returnResponse?: boolean
}

export async function fetchAPI(
  endpoint: string,
  options: FetchAPIOptions = {},
) {
  if (!WORDPRESS_URL) {
    console.warn(
      `[fetchAPI] NEXT_PUBLIC_WORDPRESS_URL is not set. Skipping fetch for: ${endpoint}`,
    )
    return options.returnResponse
      ? { data: [], headers: new Headers() }
      : endpoint.startsWith('pages/') && !endpoint.includes('?')
        ? null
        : []
  }

  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`,
      {
        next: {
          revalidate: 60,
        },
      },
    )

    if (!res.ok) {
      console.warn(
        `[fetchAPI] Failed fetching ${endpoint}: status ${res.status} ${res.statusText}`,
      )
      return options.returnResponse
        ? { data: [], headers: res.headers }
        : endpoint.startsWith('pages/') && !endpoint.includes('?')
          ? null
          : []
    }

    const data = await res.json()

    if (options.returnResponse) {
      return {
        data: Array.isArray(data) ? data : [],
        headers: res.headers,
      }
    }

    return data
  } catch (error) {
    console.warn(
      `[fetchAPI] Network or parsing error for ${endpoint}:`,
      error instanceof Error ? error.message : error,
    )
    return options.returnResponse
      ? { data: [], headers: new Headers() }
      : endpoint.startsWith('pages/') && !endpoint.includes('?')
        ? null
        : []
  }
}