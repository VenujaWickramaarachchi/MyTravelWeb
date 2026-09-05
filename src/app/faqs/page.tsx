import { getFAQs } from '@/lib/wordpress'
import FAQItem from '@/components/content/FAQ/FAQItem'

export default async function FAQsPage() {
  const faqs = await getFAQs()

  return (
    <main>
      <h1>Frequently Asked Questions</h1>

      <section>
        {faqs.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </section>
    </main>
  )
}
