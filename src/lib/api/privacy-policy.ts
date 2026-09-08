import { fetchAPI } from './core/fetch-api'

export interface PrivacyPolicy {
  id: number
  title: string
  content: string
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicy | null> {
  const pages = await fetchAPI('pages/3')

  if (!pages) {
    return null
  }

  return {
    id: pages.id,
    title: pages.title?.rendered || 'Privacy Policy',
    content: pages.content?.rendered || '',
  }
}
