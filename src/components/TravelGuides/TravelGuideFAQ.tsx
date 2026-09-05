import { TravelGuide } from '@/types/travel-guide'
import FAQSection from '@/components/content/FAQ/FAQSection'

interface Props {
  travelGuide: TravelGuide
}

export default function TravelGuideFAQ({ travelGuide }: Props) {
  if (!travelGuide.faqContent) {
    return null
  }

  return <FAQSection content={travelGuide.faqContent} />
}
