import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQQuestion({ faq }: Props) {
  return (
    <section className="border-b border-ink/10 pb-8">
      <span className="text-xs uppercase tracking-widest text-amethyst font-semibold block mb-3">
        Travel Advisory & FAQ
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-ink leading-tight">
        {faq.question || faq.title}
      </h1>
    </section>
  )
}
