'use client'

import { useState } from 'react'
import type { Attraction } from '@/types/attraction'
import { BespokeLotusIcon } from '@/components/Shared/CardIcons'

interface Props {
  attraction: Attraction
  className?: string
}

interface OverviewSplit {
  visibleHtml: string
  hiddenHtml: string
  hasMore: boolean
}

/**
 * Splits attraction overview into a visible introductory paragraph
 * and a hidden container with the remaining detailed narrative sections
 * ('A Fortress in the Sky', 'Engineering and Artistry', 'The Climb to the Palace', etc.).
 *
 * - Never uses CSS text truncation (no line-clamp or text-overflow ellipsis).
 * - Clicking 'Read More +' reveals the detailed narrative flowing as standard paragraphs inline.
 */
function splitOverviewContent(
  overviewHtml: string,
  shortDescription: string,
): OverviewSplit {
  const cleanOverview = (overviewHtml || '').trim()
  const cleanDesc = (shortDescription || '').trim()

  if (!cleanOverview) {
    return {
      visibleHtml: cleanDesc ? `<p>${cleanDesc}</p>` : '',
      hiddenHtml: '',
      hasMore: false,
    }
  }

  // Look for the first <h2> or <h3> in the overview (e.g. <h2>A Fortress in the Sky</h2>)
  const firstHeadingMatch = cleanOverview.match(/<h[23][^>]*>/i)

  if (firstHeadingMatch && firstHeadingMatch.index !== undefined) {
    const firstHeadingIndex = firstHeadingMatch.index

    if (firstHeadingIndex > 30) {
      // There is an introductory paragraph before the first heading
      const leadContent = cleanOverview.slice(0, firstHeadingIndex).trim()
      const remainingSections = cleanOverview.slice(firstHeadingIndex).trim()
      return {
        visibleHtml: leadContent,
        hiddenHtml: remainingSections,
        hasMore: Boolean(remainingSections),
      }
    } else {
      // The overview starts directly with a heading
      // If a short description exists, use it as the visible introductory paragraph.
      // The detailed sections reside in hiddenHtml.
      if (cleanDesc) {
        return {
          visibleHtml: `<p>${cleanDesc}</p>`,
          hiddenHtml: cleanOverview,
          hasMore: true,
        }
      } else {
        // Fallback: If no short description exists, split at second heading if present
        const secondHeadingMatch = cleanOverview
          .slice(firstHeadingIndex + 4)
          .match(/<h[23][^>]*>/i)
        if (secondHeadingMatch && secondHeadingMatch.index !== undefined) {
          const splitPoint = firstHeadingIndex + 4 + secondHeadingMatch.index
          return {
            visibleHtml: cleanOverview.slice(0, splitPoint).trim(),
            hiddenHtml: cleanOverview.slice(splitPoint).trim(),
            hasMore: true,
          }
        }
      }
    }
  }

  // If no headings exist in overviewHtml, split after the first paragraph </p>
  const pCloseMatch = cleanOverview.match(/<\/p>/i)
  if (pCloseMatch && pCloseMatch.index !== undefined) {
    const splitPoint = pCloseMatch.index + 4
    const firstParagraph = cleanOverview.slice(0, splitPoint).trim()
    const remainingParagraphs = cleanOverview.slice(splitPoint).trim()
    if (remainingParagraphs) {
      return {
        visibleHtml: firstParagraph,
        hiddenHtml: remainingParagraphs,
        hasMore: true,
      }
    }
  }

  return {
    visibleHtml: cleanOverview,
    hiddenHtml: '',
    hasMore: false,
  }
}

export default function AttractionOverview({
  attraction,
  className = '',
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const { visibleHtml, hiddenHtml, hasMore } = splitOverviewContent(
    attraction.attractionOverview || '',
    attraction.shortDescription || '',
  )

  if (!visibleHtml && !hiddenHtml) return null

  return (
    <section className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header with Strict Global Typography */}
      <header className='space-y-1 sm:space-y-1.5'>
        <div className='flex items-center gap-2 text-gold-deep'>
          <BespokeLotusIcon className='w-3.5 h-3.5 text-gold' />
          <p className='text-xs font-semibold uppercase tracking-widest text-gold-deep'>
            Attraction Overview
          </p>
        </div>
        <h2 className='font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-ink tracking-tight leading-tight -ml-[2px]'>
          About {attraction.title}
        </h2>
      </header>

      {/* Visible Introductory Section (No CSS Truncation: 15px mobile, 16px tablet/desktop) */}
      {visibleHtml && (
        <div
          className='prose-editorial text-[15px] sm:text-base text-ink/80 leading-relaxed font-light [&>p]:mb-2.5 [&>p]:sm:mb-3 [&>p:last-child]:mb-0'
          dangerouslySetInnerHTML={{
            __html: visibleHtml,
          }}
        />
      )}

      {/* Hidden Container: Detailed Narrative Sections ('A Fortress in the Sky', 'Engineering and Artistry', 'The Climb to the Palace', etc.)
          Flows as standard paragraphs inline without accordions.
          H3 subheadings: 18-20px mobile, 20px tablet, 24px desktop with tight mobile margins */}
      {hasMore && hiddenHtml && (
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'block opacity-100 mt-3 sm:mt-4' : 'hidden opacity-0'
          }`}
          id='attraction-overview-detailed'
        >
          <div
            className='prose-editorial text-[15px] sm:text-base text-ink/80 leading-relaxed font-light space-y-3 sm:space-y-4 pt-0.5 sm:pt-1 [&>h2]:font-serif [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:md:text-xl [&>h2]:lg:text-2xl [&>h2]:font-medium [&>h2]:text-ink [&>h2]:mt-3.5 [&>h2]:sm:mt-5 [&>h2]:lg:mt-6 [&>h2]:mb-1.5 [&>h2]:sm:mb-2 [&>h3]:font-serif [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:md:text-xl [&>h3]:lg:text-2xl [&>h3]:font-medium [&>h3]:text-ink [&>h3]:mt-3.5 [&>h3]:sm:mt-5 [&>h3]:lg:mt-6 [&>h3]:mb-1.5 [&>h3]:sm:mb-2 [&>p]:mb-2.5 [&>p]:sm:mb-3 [&>p:last-child]:mb-0'
            dangerouslySetInnerHTML={{
              __html: hiddenHtml,
            }}
          />
        </div>
      )}

      {/* Read More / Read Less Toggle in signature Marigold Gold */}
      {hasMore && (
        <div className='pt-0.5 sm:pt-1'>
          <button
            type='button'
            onClick={() => setIsExpanded(!isExpanded)}
            className='inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide text-[#D9A62E] hover:text-[#B3811C] hover:underline underline-offset-4 decoration-[#D9A62E] transition-all duration-200 cursor-pointer py-1'
            aria-expanded={isExpanded}
            aria-controls='attraction-overview-detailed'
          >
            <span>{isExpanded ? 'Read Less −' : 'Read More +'}</span>
          </button>
        </div>
      )}
    </section>
  )
}
