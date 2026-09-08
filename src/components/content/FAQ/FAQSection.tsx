interface Props {
  content?: string | null
  title?: string
  className?: string
}

export default function FAQSection({
  content,
  title = 'Frequently Asked Questions',
  className = '',
}: Props) {
  if (!content) return null

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <header>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            Helpful Information
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            {title}
          </h2>
        </header>

        <div className='p-6 sm:p-8 rounded border border-line bg-paper'>
          <div
            className='prose-editorial text-sm sm:text-base leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </div>
    </section>
  )
}
