import Link from 'next/link'
import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQItem({ faq }: Props) {
  return (
    <article className='bg-paper rounded border border-line p-6 sm:p-7 space-y-3 hover:border-violet/30 transition-colors'>
      <h3 className='font-serif text-xl sm:text-2xl font-medium text-ink leading-snug'>
        <Link
          href={`/faqs/${faq.slug}`}
          className='hover:text-violet transition-colors inline-flex items-start gap-2'
        >
          <span className='text-gold font-serif'>Q.</span>
          <span>{faq.question || faq.title}</span>
        </Link>
      </h3>

      {faq.featuredAnswer && (
        <p className='text-sm sm:text-base text-ink/75 leading-relaxed pl-6'>
          {faq.featuredAnswer}
        </p>
      )}

      <div className='pl-6 pt-1'>
        <Link
          href={`/faqs/${faq.slug}`}
          className='inline-flex items-center text-xs font-semibold uppercase tracking-wider text-violet hover:text-gold-deep transition-colors'
        >
          <span>Read detailed answer</span>
          <svg
            className='w-3.5 h-3.5 ml-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
        </Link>
      </div>
    </article>
  )
}
