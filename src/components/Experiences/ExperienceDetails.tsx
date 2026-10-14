import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
  className?: string
}

export default function ExperienceDetails({
  experience,
  className = '',
}: Props) {
  const hasDetails =
    experience.typicalDuration ||
    experience.bestTime ||
    experience.location ||
    experience.activityLevel

  if (!hasDetails) return null

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 ${className}`}>
      <div className='bg-paper rounded border border-line p-5 sm:p-6 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 sm:divide-x divide-line/60'>
        {experience.typicalDuration && (
          <div className='sm:px-4 first:pl-0 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              ⏱ Duration
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {experience.typicalDuration}
            </strong>
          </div>
        )}

        {experience.bestTime && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              🗓 Best Season
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {experience.bestTime}
            </strong>
          </div>
        )}

        {experience.location && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              📍 Location
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {experience.location}
            </strong>
          </div>
        )}

        {experience.activityLevel && (
          <div className='sm:px-4 space-y-1'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 block'>
              ⚡ Activity Level
            </span>
            <strong className='text-sm sm:text-base font-semibold text-ink block'>
              {experience.activityLevel}
            </strong>
          </div>
        )}
      </div>
    </section>
  )
}
