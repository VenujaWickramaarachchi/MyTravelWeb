'use client'

import { useState } from 'react'
import { BespokeLotusIcon, ChevronDownIcon } from '@/components/Shared/CardIcons'

interface Props {
  content?: string | null
  destinationTitle?: string
  className?: string
}

interface ParsedFAQ {
  question: string
  answerHtml: string
}

function parseFaqContent(html: string): ParsedFAQ[] {
  if (!html) return []

  const faqs: ParsedFAQ[] = []

  // Pattern 1: <h3>Question</h3> followed by content up to next <h3> or end
  const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi
  let match: RegExpExecArray | null

  while ((match = h3Regex.exec(html)) !== null) {
    const question = match[1].replace(/<[^>]*>?/gm, '').trim()
    const answerHtml = match[2].trim()
    if (question && answerHtml) {
      faqs.push({ question, answerHtml })
    }
  }

  // Pattern 2: Fallback to <strong>Q: Question</strong> if no <h3> was matched
  if (faqs.length === 0) {
    const strongRegex = /<p[^>]*><strong>([\s\S]*?)<\/strong><\/p>([\s\S]*?)(?=<p[^>]*><strong>|$)/gi
    while ((match = strongRegex.exec(html)) !== null) {
      const question = match[1].replace(/<[^>]*>?/gm, '').trim()
      const answerHtml = match[2].trim()
      if (question && answerHtml) {
        faqs.push({ question, answerHtml })
      }
    }
  }

  return faqs
}

export default function DestinationAccordionFAQs({
  content,
  destinationTitle = 'this Destination',
  className = '',
}: Props) {
  if (!content) return null

  const faqs = parseFaqContent(content)
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]) // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header */}
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Traveler Guidance
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          Frequently Asked Questions About {destinationTitle}
        </h2>
        <p className='text-[15px] sm:text-base text-ink/75 leading-relaxed font-light max-w-2xl'>
          Everything you need to know about weather, local customs, excursions, and travel logistics.
        </p>
      </header>

      {/* Accordion Container */}
      {faqs.length > 0 ? (
        <div className='rounded-2xl border border-line bg-paper overflow-hidden shadow-xs divide-y divide-line'>
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index)

            return (
              <div key={index} className='transition-colors duration-200'>
                <button
                  type='button'
                  onClick={() => toggleFAQ(index)}
                  className='w-full min-h-[52px] sm:min-h-[56px] px-5 sm:px-6 py-3.5 sm:py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:bg-ivory/50 hover:bg-ivory/40 transition-colors cursor-pointer'
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className='font-serif text-[15px] sm:text-lg font-medium text-ink leading-snug'>
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-line flex items-center justify-center text-ink/70 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-violet/10 text-violet border-violet/30' : 'bg-paper'
                    }`}
                  >
                    <ChevronDownIcon className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    role='region'
                    aria-labelledby={`faq-btn-${index}`}
                    className='px-5 sm:px-6 pb-5 sm:pb-6 pt-0.5 sm:pt-1'
                  >
                    <div
                      className='prose-editorial text-[15px] sm:text-base text-ink/80 leading-relaxed font-light [&>p]:mb-2 [&>p:last-child]:mb-0'
                      dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* Fallback if unstructured HTML was provided */
        <div className='p-5 sm:p-8 rounded-2xl border border-line bg-paper'>
          <div
            className='prose-editorial text-[15px] sm:text-base leading-relaxed'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
    </section>
  )
}
