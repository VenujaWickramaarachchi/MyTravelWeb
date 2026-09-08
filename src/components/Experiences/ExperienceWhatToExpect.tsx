import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
  className?: string
}

export default function ExperienceWhatToExpect({
  experience,
  className = '',
}: Props) {
  if (!experience.whatToExpect) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 bg-ivory/60 py-16 border-y border-line ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-fern mb-2'>
            The Encounter
          </p>
          <h2 className='font-serif text-3xl sm:text-4xl font-normal text-ink'>
            What to Expect
          </h2>
        </header>

        <div
          className='prose-editorial'
          dangerouslySetInnerHTML={{
            __html: experience.whatToExpect,
          }}
        />
      </div>
    </section>
  )
}
