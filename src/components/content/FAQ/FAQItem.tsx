import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQItem({ faq }: Props) {
  return (
    <article>
      <h3>{faq.question}</h3>

      {faq.answer && (
        <div
          dangerouslySetInnerHTML={{
            __html: faq.answer,
          }}
        />
      )}
    </article>
  )
}
