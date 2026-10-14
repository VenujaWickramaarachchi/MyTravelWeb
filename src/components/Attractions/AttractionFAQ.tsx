import { Attraction } from '@/types/attraction'
import FAQSection from '@/components/content/FAQ/FAQSection'

interface Props {
  attraction: Attraction
  className?: string
}

export default function AttractionFAQ({
  attraction,
  className = '',
}: Props) {
  if (!attraction.faqContent) {
    return null
  }

  return (
    <FAQSection
      content={attraction.faqContent}
      title={`Frequently Asked Questions about ${attraction.title}`}
      className={className}
    />
  )
}
