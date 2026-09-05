import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQQuestion({ faq }: Props) {
  return (
    <section>
      <h1>{faq.question || faq.title}</h1>
    </section>
  )
}
