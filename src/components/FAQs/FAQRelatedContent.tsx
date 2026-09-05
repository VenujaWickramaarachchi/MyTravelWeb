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
    <section>
      <h2 style={{ color: 'green' }}>Related Content</h2>

      {relatedTour && (
        <div>
          <h3>Related Tour</h3>
          <p>{relatedTour.title}</p>
        </div>
      )}

      {relatedDestination && (
        <div>
          <h3>Related Destination</h3>
          <p>{relatedDestination.title}</p>
        </div>
      )}

      {relatedExperience && (
        <div>
          <h3>Related Experience</h3>
          <p>{relatedExperience.title}</p>
        </div>
      )}
    </section>
  )
}
