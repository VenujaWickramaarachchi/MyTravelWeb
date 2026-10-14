interface Props {
  title: string
  description?: string
  eyebrow?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeading({
  title,
  description,
  eyebrow,
  centered = false,
  light = false,
  className = '',
}: Props) {
  return (
    <header
      className={`mb-10 sm:mb-12 ${
        centered ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'
      } ${className}`}
    >
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] mb-2.5 ${
            light ? 'text-gold' : 'text-gold-deep'
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-4.5xl font-normal leading-[1.2] tracking-tight ${
          light ? 'text-ivory' : 'text-ink'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? 'text-lilac' : 'text-ink/75'
          }`}
        >
          {description}
        </p>
      )}
    </header>
  )
}
