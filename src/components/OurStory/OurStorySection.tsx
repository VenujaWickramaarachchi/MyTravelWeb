interface OurStorySectionProps {
  title: string
  content: string
}

export default function OurStorySection({
  title,
  content,
}: OurStorySectionProps) {
  return (
    <section>
      <div>
        <h2>{title}</h2>

        <div>
          {content
            .split('\n')
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </section>
  )
}
