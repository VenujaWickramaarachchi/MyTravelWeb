import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceHighlights({ experience }: Props) {
  if (!experience.experienceHighlights) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'orange' }}>Experience Highlights</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: experience.experienceHighlights,
        }}
      />
    </section>
  )
}
