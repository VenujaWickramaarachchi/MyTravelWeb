import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQAnswer({ faq }: Props) {
  return (
    <section>
      <h2>Answer</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: faq.answer,
        }}
      />
    </section>
  )
}
