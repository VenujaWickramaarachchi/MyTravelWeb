import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
  className?: string
}

export default function ExperienceOverview({
  experience,
  className = '',
}: Props) {
  if (!experience.experienceOverview) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-fern mb-2'>
            About The Experience
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            Overview
          </h2>
        </header>

        <div
          className='prose-editorial'
          dangerouslySetInnerHTML={{
            __html: experience.experienceOverview,
          }}
        />
      </div>
    </section>
  )
}
