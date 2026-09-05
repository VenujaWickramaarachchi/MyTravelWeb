import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceDetails({ experience }: Props) {
  return (
    <section>
      <h2 style={{ color: 'green' }}>Experience Details</h2>

      {experience.typicalDuration && (
        <p>
          <strong>Typical Duration:</strong> {experience.typicalDuration}
        </p>
      )}

      {experience.bestTime && (
        <p>
          <strong>Best Time:</strong> {experience.bestTime}
        </p>
      )}

      {experience.location && (
        <p>
          <strong>Location:</strong> {experience.location}
        </p>
      )}

      {experience.activityLevel && (
        <p>
          <strong>Activity Level:</strong> {experience.activityLevel}
        </p>
      )}
    </section>
  )
}
