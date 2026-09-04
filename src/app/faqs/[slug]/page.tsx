import { notFound } from 'next/navigation'
import { getFAQ } from '@/lib/wordpress'

interface FAQPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { slug } = await params

  const faq = await getFAQ(slug)

  if (!faq) {
    notFound()
  }

  return (
    <main>
      <h1>{faq.title}</h1>

      <h2>Question</h2>

      <p>{faq.question || 'No question available'}</p>

      <h2>Answer</h2>

      <p>{faq.answer || 'No answer available'}</p>

      <h2>Related Tour</h2>

      <p>{faq.relationships.relatedTour?.title || 'No related tour linked'}</p>

      <h2>Related Destination</h2>

      <p>
        {faq.relationships.relatedDestination?.title ||
          'No related destination linked'}
      </p>

      <h2>Related Experience</h2>

      <p>
        {faq.relationships.relatedExperience?.title ||
          'No related experience linked'}
      </p>
    </main>
  )
}
