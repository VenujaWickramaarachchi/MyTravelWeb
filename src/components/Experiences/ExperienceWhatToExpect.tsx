import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceWhatToExpect({ experience }: Props) {
  if (!experience.whatToExpect) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'blue' }}>What to Expect</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: experience.whatToExpect,
        }}
      />
    </section>
  )
}
