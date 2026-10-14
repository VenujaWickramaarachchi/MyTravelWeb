import { MediaImage } from '@/types/media-image'

interface Props {
  images: MediaImage[]
  title?: string
  eyebrow?: string
  className?: string
}

export default function GallerySection({
  images,
  title = 'Photo Gallery',
  eyebrow = 'Visual Journey',
  className = '',
}: Props) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <section className={`my-16 sm:my-20 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='mb-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep mb-2'>
            {eyebrow}
          </p>
          <h2 className='font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink'>
            {title}
          </h2>
        </header>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5'>
          {images.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className='relative aspect-[4/3] rounded overflow-hidden bg-ivory border border-line group'
            >
              <img
                src={image.url}
                alt={image.alt || image.title || title}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                loading='lazy'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
