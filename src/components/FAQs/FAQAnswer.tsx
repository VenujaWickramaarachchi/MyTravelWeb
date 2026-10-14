import { FAQ } from '@/types/faq'

interface Props {
  faq: FAQ
}

export default function FAQAnswer({ faq }: Props) {
  const quickAnswer = faq.featuredAnswer || faq.aeoDirectAnswer
  const supportingQuestions = faq.aeoSupportingQuestions
    ? faq.aeoSupportingQuestions
        .split('\n')
        .map((question) => question.trim())
        .filter(Boolean)
    : []

  return (
    <section className="space-y-8">
      {quickAnswer && (
        <div className="bg-ivory border-l-4 border-gold rounded-r-xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <span className="text-xs uppercase font-bold tracking-wider text-gold-deep">
              Quick Answer
            </span>
          </div>
          <p className="text-lg md:text-xl font-serif text-ink font-medium leading-relaxed">
            {quickAnswer}
          </p>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-amethyst mb-4">
          Detailed Guidance
        </h2>
        <div
          className="prose-editorial max-w-none text-ink/90 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{
            __html: faq.answer,
          }}
        />
      </div>

      {supportingQuestions.length > 0 && (
        <div className="pt-8 border-t border-ink/10">
          <h2 className="text-xl font-serif font-bold text-ink mb-4">
            Related Questions
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {supportingQuestions.map((question, index) => (
              <li
                key={index}
                className="flex items-start gap-3 bg-white p-4 rounded-xl border border-ink/8 text-sm text-ink/80 font-medium"
              >
                <span className="text-gold font-bold">•</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
