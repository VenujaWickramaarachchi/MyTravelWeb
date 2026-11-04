/**
 * HTML Entity Decoding Utility
 * Handles decimal entities (e.g. &#8211;, &#038;), hexadecimal entities (e.g. &#x2013;),
 * and standard named entities (e.g. &amp;, &quot;, &apos;, &mdash;, &ndash;).
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  hellip: '…',
  bull: '•',
  middot: '·',
  prime: '′',
  Prime: '″',
  trade: '™',
  copy: '©',
  reg: '®',
  euro: '€',
  pound: '£',
  yen: '¥',
  cent: '¢',
  deg: '°',
  plusmn: '±',
  times: '×',
  divide: '÷',
  permil: '‰',
  frac14: '¼',
  frac12: '½',
  frac34: '¾',
}

/**
 * Decodes all HTML entities in a given string.
 * High-performance early return if no '&' character is present.
 */
export function decodeHtmlEntities(input: string): string {
  if (!input || typeof input !== 'string' || !input.includes('&')) {
    return input
  }

  return input.replace(/&(#(?:x[0-9a-fA-F]+|[0-9]+)|[a-zA-Z]+);/g, (match, entity) => {
    // Hexadecimal numeric entities: &#x2013;
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const code = parseInt(entity.slice(2), 16)
      return !isNaN(code) && code > 0 ? String.fromCodePoint(code) : match
    }

    // Decimal numeric entities: &#8211;, &#038;, &#8217;
    if (entity.startsWith('#')) {
      const code = parseInt(entity.slice(1), 10)
      return !isNaN(code) && code > 0 ? String.fromCodePoint(code) : match
    }

    // Named entities: &amp;, &ndash;, etc.
    const lower = entity.toLowerCase()
    return NAMED_ENTITIES[lower] ?? match
  })
}

/**
 * Recursively decodes HTML entities across all string values in an object, array, or primitive.
 * Safe for deeply nested WordPress REST API / ACF response payloads.
 */
export function decodeEntitiesDeep<T>(data: T): T {
  if (data === null || data === undefined) {
    return data
  }

  if (typeof data === 'string') {
    return decodeHtmlEntities(data) as unknown as T
  }

  if (Array.isArray(data)) {
    return data.map((item) => decodeEntitiesDeep(item)) as unknown as T
  }

  if (typeof data === 'object') {
    const result: Record<string, any> = {}
    for (const [key, value] of Object.entries(data)) {
      result[key] = decodeEntitiesDeep(value)
    }
    return result as T
  }

  return data
}

/**
 * Optional React component wrapper to decode raw entity text in JSX
 * Usage: <DecodedText>{tour.heroSubtitle}</DecodedText>
 */
export function DecodedText({ children }: { children: React.ReactNode }) {
  if (typeof children === 'string') {
    return decodeHtmlEntities(children)
  }
  return children
}

