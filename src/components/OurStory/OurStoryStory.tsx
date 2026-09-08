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
  return (
    <section>
      <div>
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

        {image?.url ? <img src={image.url} alt={image.alt || title} /> : null}
      </div>
    </section>
  )
}
