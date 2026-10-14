import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceHero({ experience }: Props) {
  return (
    <section className='relative bg-violet-deep text-ivory overflow-hidden py-20 sm:py-28 border-b border-white/10'>
      {/* Background image overlay */}
      {experience.heroImage?.url && (
        <div className='absolute inset-0 z-0'>
          <img
            src={experience.heroImage.url}
            alt={experience.heroImage.alt || experience.title}
            className='w-full h-full object-cover opacity-35'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-violet-deep via-violet-deep/60 to-violet-deep/80' />
        </div>
      )}

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl space-y-4'>
          <div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-fern'>
            <span>Island Experience</span>
            {experience.location && (
              <>
                <span className='text-ivory/50'>•</span>
                <span>{experience.location}</span>
              </>
            )}
          </div>

          <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ivory tracking-tight leading-[1.12]'>
            {experience.heroTitle || experience.title}
          </h1>

          {experience.heroSubtitle && (
            <p className='text-lg sm:text-xl text-lilac leading-relaxed font-light'>
              {experience.heroSubtitle}
            </p>
          )}

          {experience.shortDescription && (
            <p className='text-base text-ivory/85 leading-relaxed pt-1'>
              {experience.shortDescription}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
