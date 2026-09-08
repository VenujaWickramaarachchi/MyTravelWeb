import { Attraction } from '@/types/attraction'

interface Props {
  attraction: Attraction
  className?: string
}

export default function AttractionImportantInformation({
  attraction,
  className = '',
}: Props) {
  if (!attraction.importantInformation) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-1'>
            Visitor Essentials
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl font-normal text-ink'>
            Important Information
          </h2>
        </header>

        <div className='p-6 sm:p-7 rounded border border-line bg-paper text-sm sm:text-base text-ink/85 leading-relaxed'>
          <p>{attraction.importantInformation}</p>
        </div>
      </div>
    </section>
  )
}
