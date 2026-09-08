import Link from 'next/link'
import type { OurStory } from '@/types/our-story'

interface OurStoryCTAProps {
  data: OurStory
}

export default function OurStoryCTA({ data }: OurStoryCTAProps) {
  if (!data.ctaTitle) return null

  return (
    <section className="bg-violet-deep text-ivory py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62E_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ivory mb-6 leading-tight">
          {data.ctaTitle}
        </h2>

        {data.ctaDescription && (
          <p className="text-lg sm:text-xl text-lilac/90 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            {data.ctaDescription}
          </p>
        )}

        {data.ctaButtonText && (
          <Link
            href={data.ctaButtonUrl || '/contact'}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold hover:bg-gold-deep text-ink font-semibold tracking-wide shadow-lg transition-colors duration-200"
          >
            {data.ctaButtonText}
          </Link>
        )}
      </div>
    </section>
  )
}
