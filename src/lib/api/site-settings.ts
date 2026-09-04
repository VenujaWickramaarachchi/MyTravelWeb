import { fetchAPI } from './core/fetch-api'

import { transformSiteSettings } from '../transformers/site-settings'

import { SiteSettings } from '@/types/site-settings'

export async function getSiteSettings(): Promise<SiteSettings> {
  const pages = await fetchAPI('pages?slug=site-settings&_embed')

  const settings = pages[0]

  if (!settings) {
    throw new Error('Site Settings page not found')
  }

  return transformSiteSettings(settings)
}
