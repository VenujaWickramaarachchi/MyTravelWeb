import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceImportantInformation({ experience }: Props) {
  if (!experience.importantInformation) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'brown' }}>Important Information</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: experience.importantInformation,
        }}
      />
    </section>
  )
}
