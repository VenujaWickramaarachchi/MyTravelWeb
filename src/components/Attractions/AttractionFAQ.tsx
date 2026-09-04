import { Attraction } from '@/types/attraction'

import FAQSection from '@/components/content/FAQ/FAQSection'

interface Props {
  attraction: Attraction
}

export default function AttractionFAQ({ attraction }: Props) {
  return (
    <section>
      <h2 style={{ color: 'purple' }}>Frequently Asked Questions</h2>

      <FAQSection content={attraction.faqContent} />
    </section>
  )
}
