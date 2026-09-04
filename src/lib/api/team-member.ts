import { fetchAPI } from './core/fetch-api'

import { transformTeamMember } from '../transformers/team-member'

import { TeamMember } from '@/types/team-member'

export async function getTeamMembers(): Promise<TeamMember[]> {
  const teamMembers = await fetchAPI('team-member?_embed')

  return teamMembers
    .map(transformTeamMember)
    .sort(
      (a: TeamMember, b: TeamMember) =>
        (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    )
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const url =
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}` +
    `/wp-json/wp/v2/team-member?slug=${slug}&_embed`

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed fetching team member: ${slug}`)
  }

  const data = await res.json()
  const teamMember = data[0]

  if (!teamMember) {
    return null
  }

  return transformTeamMember(teamMember)
}
