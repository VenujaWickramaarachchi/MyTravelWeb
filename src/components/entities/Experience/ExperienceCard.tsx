import Link from 'next/link'
import { Experience } from '@/types/experience'

interface Props {
  experience: Experience
}

export default function ExperienceCard({ experience }: Props) {
  const cleanDescription =
    experience.shortDescription?.replace(/<[^>]*>?/gm, '') || ''

  return (
    <article className='group flex flex-col h-full bg-paper rounded border border-line overflow-hidden hover:border-violet/40 transition-colors duration-200'>
      <Link href={`/experiences/${experience.slug}`} className='flex flex-col h-full'>
        <div className='relative aspect-[16/10] w-full overflow-hidden bg-ivory'>
          {experience.heroImage?.url ? (
            <img
              src={experience.heroImage.url}
              alt={experience.heroImage.alt || experience.title}
              className='w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300'
              loading='lazy'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-ivory text-ink/30 font-serif'>
              <span>{experience.title}</span>
            </div>
          )}

          {experience.typicalDuration && (
            <span className='absolute top-3 left-3 bg-paper/90 backdrop-blur-xs text-ink px-2.5 py-1 text-xs font-semibold rounded border border-line'>
              ⏱ {experience.typicalDuration}
            </span>
          )}

          {experience.location && (
            <span className='absolute bottom-3 left-3 bg-paper/90 backdrop-blur-xs text-ink px-2.5 py-1 text-xs font-medium rounded border border-line'>
              📍 {experience.location}
            </span>
          )}
        </div>

        <div className='p-5 sm:p-6 flex flex-col flex-1'>
          <span className='text-[11px] font-semibold uppercase tracking-[0.18em] text-fern mb-2'>
            Experience
          </span>

          <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink group-hover:text-violet transition-colors leading-snug mb-2.5'>
            {experience.title}
          </h3>

          {cleanDescription && (
            <p className='text-sm text-ink/75 leading-relaxed line-clamp-3 mb-5 flex-1'>
              {cleanDescription}
            </p>
          )}

          <div className='pt-2 mt-auto border-t border-line/60 flex items-center justify-between text-xs font-semibold text-violet group-hover:text-gold-deep transition-colors uppercase tracking-wider'>
            <span>Explore Experience</span>
            <svg
              className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  )
}
