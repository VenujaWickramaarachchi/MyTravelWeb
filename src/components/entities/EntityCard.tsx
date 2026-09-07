import Link from 'next/link'

interface EntityCardProps {
  title: string
  slug: string
  href: string
  image?: {
    url?: string
    alt?: string
  } | null
  description?: string
}

export default function EntityCard({
  title,
  href,
  image,
  description,
}: EntityCardProps) {
  return (
    <article>
      <Link href={href}>
        {image?.url ? <img src={image.url} alt={image.alt || title} /> : null}

        <div>
          <h2>{title}</h2>

          {description ? <p>{description}</p> : null}
        </div>
      </Link>
    </article>
  )
}
