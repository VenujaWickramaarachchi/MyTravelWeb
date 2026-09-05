import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceHero({ experience }: Props) {
  return (
    <section>
      <h1 style={{ color: 'red' }}>{experience.heroTitle}</h1>

      <p>{experience.heroSubtitle}</p>

      {experience.shortDescription && <p>{experience.shortDescription}</p>}
    </section>
  )
}
