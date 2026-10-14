import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
  className?: string
}

export default function ExperienceWhoIsItFor({
  experience,
  className = '',
}: Props) {
  if (!experience.whoIsItFor) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amethyst mb-1'>
            Traveller Suitability
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
            Who Is It For?
          </h2>
        </header>

        <div
          className='prose-editorial p-6 rounded border border-line bg-paper'
          dangerouslySetInnerHTML={{
            __html: experience.whoIsItFor,
          }}
        />
      </div>
    </section>
  )
}
