import { fetchAPI } from './core/fetch-api'

export interface CookiePolicy {
  id: number
  title: string
  content: string
}

export async function getCookiePolicy(): Promise<CookiePolicy | null> {
  const pages = await fetchAPI('pages?slug=cookie-policy')

  const page = pages[0]

  if (!page) {
    return null
  }

  return {
    id: page.id,
    title: page.title?.rendered || 'Cookie Policy',
    content: page.content?.rendered || '',
  }
}
