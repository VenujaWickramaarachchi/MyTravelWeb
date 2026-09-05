import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceOverview({ experience }: Props) {
  return (
    <section>
      <h2 style={{ color: 'red' }}>About {experience.title}</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: experience.experienceOverview,
        }}
      />
    </section>
  )
}
