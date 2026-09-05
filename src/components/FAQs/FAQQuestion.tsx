import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQQuestion({ faq }: Props) {
  return (
    <section>
      <h1 style={{ color: 'red' }}>{faq.question || faq.title}</h1>
    </section>
  )
}
