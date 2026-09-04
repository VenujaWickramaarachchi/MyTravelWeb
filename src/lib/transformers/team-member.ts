export function transformTeamMember(teamMember: any) {
  return {
    id: teamMember.id,
    title: teamMember.title?.rendered || '',
    slug: teamMember.slug || '',

    // Team Member Information
    fullName: teamMember.acf?.full_name || '',

    position: teamMember.acf?.position || '',

    shortBio: teamMember.acf?.short_bio || '',

    profileImage: teamMember.acf?.profile_image || null,

    socialUrl: teamMember.acf?.social_url || '',

    displayOrder: teamMember.acf?.display_order ?? null,

    fullBiography: teamMember.acf?.full_biography || '',

    expertise: teamMember.acf?.expertise || [],

    languages: teamMember.acf?.languages || [],

    experienceYears: teamMember.acf?.experience_yearas || '',
  }
}
