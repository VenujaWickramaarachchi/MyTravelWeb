import Image from 'next/image'
import type { OurStory } from '@/types/our-story'

interface OurStoryHeroProps {
  data: OurStory
}

export default function OurStoryHero({ data }: OurStoryHeroProps) {
  return (
    <section className="relative bg-violet-deep text-ivory overflow-hidden py-24 md:py-32">
      {data.heroImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage.url}
            alt={data.heroImage.alt || data.heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-deep via-violet-deep/80 to-transparent" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-ivory/10 backdrop-blur-xs border border-ivory/15 text-gold text-xs font-semibold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          The Viora Lanka Story
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-ivory tracking-tight mb-6 leading-[1.1]">
          {data.heroTitle}
        </h1>

        {data.heroSubtitle && (
          <p className="text-lg sm:text-xl md:text-2xl text-lilac/90 max-w-3xl mx-auto font-sans leading-relaxed">
            {data.heroSubtitle}
          </p>
        )}
      </div>
    </section>
  )
}
