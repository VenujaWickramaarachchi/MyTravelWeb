import { fetchAPI } from './core/fetch-api'

import { transformTeamMember } from '../transformers/team-member'

import { TeamMember } from '@/types/team-member'

export async function getTeamMembers(): Promise<TeamMember[]> {
  const teamMembers = await fetchAPI('team-member?_embed')

  return (Array.isArray(teamMembers) ? teamMembers : [])
    .map(transformTeamMember)
    .sort(
      (a: TeamMember, b: TeamMember) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  try {
    const data = await fetchAPI(`team-member?slug=${slug}&_embed`)
    const teamMember = Array.isArray(data) ? data[0] : null

    if (!teamMember) {
      return null
    }

    return transformTeamMember(teamMember)
  } catch (error) {
    console.warn(`[getTeamMember] Error fetching team member ${slug}:`, error)
    return null
  }
}
