import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQAnswer({ faq }: Props) {
  return (
    <section>
      <h2 style={{ color: 'blue' }}>Answer</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: faq.answer,
        }}
      />
    </section>
  )
}
