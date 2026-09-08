import Link from 'next/link'

interface Props {
  title: string
  description?: string
  buttonText: string
  buttonHref: string
  eyebrow?: string
  className?: string
}

export default function CTA({
  title,
  description,
  buttonText,
  buttonHref,
  eyebrow = 'Begin Your Journey',
  className = '',
}: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-violet-deep text-ivory rounded-md border border-white/10 px-6 py-16 sm:px-12 sm:py-20 text-center ${className}`}
    >
      {/* Decorative ambient background */}
      <div
        className='absolute inset-0 opacity-15 pointer-events-none'
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #5B1E96 0%, transparent 70%)',
        }}
        aria-hidden='true'
      />

      <div className='relative max-w-3xl mx-auto space-y-6'>
        {eyebrow && (
          <p className='text-xs uppercase tracking-[0.25em] text-gold font-semibold'>
            {eyebrow}
          </p>
        )}

        <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-ivory'>
          {title}
        </h2>

        {description && (
          <p className='text-base sm:text-lg text-lilac leading-relaxed max-w-2xl mx-auto'>
            {description}
          </p>
        )}

        <div className='pt-4'>
          <Link
            href={buttonHref}
            className='inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-ink bg-gold hover:bg-gold-deep rounded transition-colors duration-150 shadow-md'
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
