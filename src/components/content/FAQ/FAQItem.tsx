import Link from 'next/link'
import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQItem({ faq }: Props) {
  return (
    <article>
      <h2>
        <Link href={`/faqs/${faq.slug}`}>{faq.question || faq.title}</Link>
      </h2>

      {faq.featuredAnswer && <p>{faq.featuredAnswer}</p>}
    </article>
  )
}
