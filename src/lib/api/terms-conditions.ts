import { fetchAPI } from './core/fetch-api'

export interface TermsConditions {
  id: number
  title: string
  content: string
}

export async function getTermsConditions(): Promise<TermsConditions | null> {
  const page = await fetchAPI('pages/542')

  if (!page) {
    return null
  }

  return {
    id: page.id,
    title: page.title?.rendered || 'Terms & Conditions',
    content: page.content?.rendered || '',
  }
}
