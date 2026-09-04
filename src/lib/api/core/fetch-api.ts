const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}`, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching ${endpoint}`)
  }

  return res.json()
}
