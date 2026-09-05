import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceWhoIsItFor({ experience }: Props) {
  if (!experience.whoIsItFor) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'purple' }}>Who Is It For?</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: experience.whoIsItFor,
        }}
      />
    </section>
  )
}
