interface Props {
  content: string
}

export default function FAQSection({ content }: Props) {
  return (
    <section>
      <h2>Frequently Asked Questions</h2>

      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </section>
  )
}
