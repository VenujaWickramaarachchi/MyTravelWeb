import { MediaImage } from '@/types/media-image'

interface Props {
  images: MediaImage[]
  title?: string
}

export default function GallerySection({ images, title = 'Gallery' }: Props) {
  if (!images.length) {
    return null
  }

  return (
    <section>
      <h2>{title}</h2>

      <div>
        {images.map((image, index) => (
          <div key={`${image.id}-${index}`}>
            <img src={image.url} alt={image.alt || image.title} />
          </div>
        ))}
      </div>
    </section>
  )
}
