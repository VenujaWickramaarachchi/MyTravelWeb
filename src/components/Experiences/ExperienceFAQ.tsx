import { Experience } from '@/types/experience'
import FAQSection from '@/components/content/FAQ/FAQSection'

interface Props {
  experience: Experience
}

export default function ExperienceFAQ({ experience }: Props) {
  if (!experience.faqContent) {
    return null
  }

  return <FAQSection content={experience.faqContent} />
}
