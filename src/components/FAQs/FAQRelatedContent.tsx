import Link from 'next/link'
import Image from 'next/image'
import { FAQPage } from '@/types/pages/faq-page'

interface Props {
  faq: FAQPage
}

export default function FAQRelatedContent({ faq }: Props) {
  const { relatedTour, relatedDestination, relatedExperience } =
    faq.relationships

  if (!relatedTour && !relatedDestination && !relatedExperience) {
    return null
  }

  return (
    <section className="pt-10 border-t border-ink/10">
      <h2 className="text-2xl font-serif font-bold text-ink mb-6">
        Related Experiences & Journeys
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedTour && (
          <Link
            href={`/tours/${relatedTour.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden border border-ink/8 shadow-xs hover:shadow-md transition-shadow"
          >
            {relatedTour.heroImage?.url && (
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
                <Image
                  src={relatedTour.heroImage.url}
                  alt={relatedTour.heroImage.alt || relatedTour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5">
              <span className="text-[11px] uppercase font-bold tracking-wider text-amethyst block mb-1">
                Tour Package
              </span>
              <h3 className="font-serif font-bold text-ink group-hover:text-violet transition-colors line-clamp-2">
                {relatedTour.title}
              </h3>
            </div>
          </Link>
        )}

        {relatedDestination && (
          <Link
            href={`/destinations/${relatedDestination.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden border border-ink/8 shadow-xs hover:shadow-md transition-shadow"
          >
            {relatedDestination.heroImage?.url && (
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
                <Image
                  src={relatedDestination.heroImage.url}
                  alt={relatedDestination.heroImage.alt || relatedDestination.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5">
              <span className="text-[11px] uppercase font-bold tracking-wider text-gold-deep block mb-1">
                Destination
              </span>
              <h3 className="font-serif font-bold text-ink group-hover:text-violet transition-colors line-clamp-2">
                {relatedDestination.title}
              </h3>
            </div>
          </Link>
        )}

        {relatedExperience && (
          <Link
            href={`/experiences/${relatedExperience.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden border border-ink/8 shadow-xs hover:shadow-md transition-shadow"
          >
            {relatedExperience.heroImage?.url && (
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
                <Image
                  src={relatedExperience.heroImage.url}
                  alt={relatedExperience.heroImage.alt || relatedExperience.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5">
              <span className="text-[11px] uppercase font-bold tracking-wider text-fern block mb-1">
                Curated Experience
              </span>
              <h3 className="font-serif font-bold text-ink group-hover:text-violet transition-colors line-clamp-2">
                {relatedExperience.title}
              </h3>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}
