import { Tour } from '@/types/tour'

interface TourInclusionsProps {
  tour: Tour
}

export default function TourInclusions({ tour }: TourInclusionsProps) {
  const inclusions = tour.inclusions
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

  const exclusions = tour.exclusions
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)

  if (inclusions.length === 0 && exclusions.length === 0) {
    return null
  }

  return (
    <section>
      <h2 style={{ color: 'red' }}>Inclusions & Exclusions</h2>

      <div>
        {inclusions.length > 0 && (
          <div>
            <h3>Included</h3>

            <ul>
              {inclusions.map((item, index) => (
                <li key={`inclusion-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {exclusions.length > 0 && (
          <div>
            <h3>Not Included</h3>

            <ul>
              {exclusions.map((item, index) => (
                <li key={`exclusion-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
