import type { Experience } from '@/types/experience'
import type { ExperienceFilterParams } from '@/types/filter-types'

export function filterExperiences(
    experiences: Experience[],
    filters: ExperienceFilterParams,
): Experience[] {
    return experiences
        .filter((experience) => {
            // Region
            if (
                filters.region &&
                !experience.region?.includes(Number(filters.region))
            ) {
                return false
            }

            // Experience Type
            if (filters.experienceType) {
                if (
                    !experience.experienceType?.includes(
                        Number(filters.experienceType),
                    )
                ) {
                    return false
                }
            }

            return true
        })
        .sort(
            (a, b) =>
                Number(b.featuredExperience) -
                Number(a.featuredExperience),
        )
}