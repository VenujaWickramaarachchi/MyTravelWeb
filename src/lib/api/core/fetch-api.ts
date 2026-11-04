import { decodeEntitiesDeep } from '@/lib/utils/decode'

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

  const maxRetries = 2
  let res: Response | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      res = await fetch(
        `${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`,
        {
          next: {
            revalidate: 60,
          },
        },
      )

      // If successful or client error (e.g., 404 Not Found), don't retry
      if (res.ok || (res.status >= 400 && res.status < 500 && res.status !== 429)) {
        break
      }

      // If server is overwhelmed (500, 502, 503, 504, 429), retry with backoff
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
      }
    } catch (error) {
      if (attempt === maxRetries) {
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
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
    }
  }

  if (!res || !res.ok) {
    console.warn(
      `[fetchAPI] Failed fetching ${endpoint}: status ${res?.status ?? 'unknown'} ${res?.statusText ?? ''}`,
    )
    return options.returnResponse
      ? { data: [], headers: res?.headers ?? new Headers() }
      : endpoint.startsWith('pages/') && !endpoint.includes('?')
        ? null
        : []
  }

  try {
    const rawData = await res.json()
    // Universally decode HTML entities (&#8211;, &amp;, etc.) across all ACF and WP fields
    const data = decodeEntitiesDeep(rawData)

    if (options.returnResponse) {
      return {
        data: Array.isArray(data) ? data : [],
        headers: res.headers,
      }
    }

    return data
  } catch (error) {
    console.warn(
      `[fetchAPI] JSON parsing error for ${endpoint}:`,
      error instanceof Error ? error.message : error,
    )
    return options.returnResponse
      ? { data: [], headers: res.headers }
      : endpoint.startsWith('pages/') && !endpoint.includes('?')
        ? null
        : []
  }
}
