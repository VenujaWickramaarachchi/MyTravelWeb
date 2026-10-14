import Image from 'next/image'
import type { MediaImage } from '@/types/media-image'

interface OurStoryStoryProps {
  title: string
  content: string
  image: MediaImage | null
}

export default function OurStoryStory({
  title,
  content,
  image,
}: OurStoryStoryProps) {
  const paragraphs = content ? content.split('\n').map(p => p.trim()).filter(Boolean) : []

  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`grid gap-12 lg:gap-16 items-center ${image?.url ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto'}`}>
          <div className={image?.url ? 'lg:col-span-7' : 'w-full'}>
            <span className="text-xs uppercase tracking-widest text-amethyst font-semibold block mb-3">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink mb-8 leading-tight">
              {title}
            </h2>

            <div className="space-y-5 text-ink/80 text-base sm:text-lg leading-relaxed font-sans">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'text-lg sm:text-xl text-ink font-medium leading-relaxed' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {image?.url && (
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-ink/10">
                <Image
                  src={image.url}
                  alt={image.alt || title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 border-2 border-gold/40 rounded-3xl -z-10 hidden sm:block" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
