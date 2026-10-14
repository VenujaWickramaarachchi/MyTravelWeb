import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
  className?: string
}

export default function ExperienceHighlights({
  experience,
  className = '',
}: Props) {
  if (!experience.experienceHighlights) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-fern mb-1'>
            Notable Features
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
            Experience Highlights
          </h2>
        </header>

        <div
          className='prose-editorial p-6 sm:p-7 rounded border border-line bg-ivory/60'
          dangerouslySetInnerHTML={{
            __html: experience.experienceHighlights,
          }}
        />
      </div>
    </section>
  )
}
