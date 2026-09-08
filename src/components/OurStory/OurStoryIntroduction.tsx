interface OurStoryIntroductionProps {
  content: string
}

export default function OurStoryIntroduction({
  content,
}: OurStoryIntroductionProps) {
  if (!content) return null

  return (
    <section className="py-16 md:py-20 bg-ivory border-b border-ink/8">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-4xl text-gold font-serif select-none block mb-4">“</span>
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-violet-deep leading-relaxed font-normal">
          {content}
        </blockquote>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-8" />
      </div>
    </section>
  )
}
