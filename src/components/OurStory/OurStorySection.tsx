interface OurStorySectionProps {
  title: string
  content: string
}

export default function OurStorySection({
  title,
  content,
}: OurStorySectionProps) {
  if (!title && !content) return null

  const paragraphs = content ? content.split('\n').map(p => p.trim()).filter(Boolean) : []

  return (
    <section className="py-16 md:py-20 border-t border-ink/8 first-of-type:border-t-0">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-ink leading-tight sticky top-28">
              {title}
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6 text-ink/80 text-base sm:text-lg leading-relaxed font-sans">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
